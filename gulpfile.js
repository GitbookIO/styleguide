var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var connect = require('gulp-connect');
var runSequence = require('gulp-run-sequence');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var minifyCSS = require('gulp-minify-css');
var exec = require('child_process').exec;
var ghPages = require('gulp-gh-pages');

var pkg = require('./package.json');

var srcDocs = path.join(__dirname, 'docs');
var destDocs = path.join(srcDocs, '_site');
var releaseOutput = path.join(__dirname, '.release');
var cssRelease = path.join(releaseOutput, 'css');

// Build the doc website
gulp.task('docs-jekyll', function (cb) {
    fs.writeFileSync(path.join(srcDocs, '_data/package.json'), JSON.stringify(pkg));

    exec('jekyll build', {
        cwd: srcDocs
    }, function(err) {
        if (err) return cb(err);
        cb();
    });
});

// Build the docs css
gulp.task('docs-styles', function() {
    return gulp.src('./docs/less/main.less')
    .pipe(less())
    .pipe(rename('docs.css'))
    .pipe(gulp.dest(destDocs));
});

// Clean documentation utput
gulp.task('docs-clean', function(cb) {
    del([
        path.join(destDocs, '**')
    ], cb);
});

// Serve documentation in a webserver
gulp.task('docs-server', function() {
    connect.server({
        port: 8888,
        root: destDocs
    });
});

// Copy documentation assets
gulp.task('docs-assets', function() {
    return gulp.src([
        'assets/**/*.*'
    ], {
        base: 'assets'
    })
    .pipe(gulp.dest(path.join(destDocs, 'assets')));
});

// Build all the documentation
gulp.task('docs-build', function(cb) {
    runSequence('docs-jekyll', 'docs-styles', 'docs-assets', cb);
});

// Deploy the documentation
gulp.task('docs-deploy', ['docs-build'], function() {
    return gulp.src('./docs/_site/**/*')
    .pipe(ghPages());
});

// Test the documentation in a webserver
gulp.task('docs-test', function(cb) {
    gulp.watch([
        'less/**/*.less',
        'docs/less/**/*.less'
    ], ['docs-styles']);
    var watcher = gulp.watch([
        'docs/*.md',
        'docs/_layouts/*.html',
        'docs/_includes/*.html',
        'docs/_includes/*.md'
    ], ['docs-build']);

    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    runSequence('docs-build', 'docs-server', cb);
});

// Clean release folder
gulp.task('release-clean', function(cb) {
    del([
        path.join(releaseOutput, '**')
    ], cb);
});

// Build css for release
gulp.task('release-css', function() {
    var s = function() {
        return gulp.src('./less/main.less').pipe(less());
    };

    return merge(
        s().pipe(rename('gitbook.css')).pipe(gulp.dest(cssRelease)),
        s().pipe(minifyCSS()).pipe(rename('gitbook.min.css')).pipe(gulp.dest(cssRelease))
    );
});

// Create a folder ready to be released on NPM
gulp.task('release-folder', ['release-clean'], function() {
    return gulp.src([
        '**/*.*',
        '!docs/**/*',
        '!node_modules/**/*',
        '!gulpfile.js',
        '!package.json'
    ])
    .pipe(gulp.dest(releaseOutput));
});

// Write release-ready package.json
gulp.task('release-packagejson', function(cb) {
    var _pkg = _.omit(pkg,
        'devDependencies',
        'scripts'
    );

    fs.writeFile(path.resolve(releaseOutput, 'package.json'), JSON.stringify(_pkg, null, 4), cb);
});

// Build a release
gulp.task('release-build', function(cb) {
    runSequence('release-folder', ['release-css', 'release-packagejson'], cb);
});

// Release a new version
gulp.task('release', ['release-build', 'docs-deploy'], function(cb) {
    exec('npm publish', {
        cwd: releaseOutput
    }, function(err) {
        if (err) return cb(err);
        cb();
    });
});

gulp.task('default', ['docs-test']);
