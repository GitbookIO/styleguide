var path = require('path');
var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var connect = require('gulp-connect');
var runSequence = require('gulp-run-sequence');
var rename = require('gulp-rename');
var exec = require('child_process').exec;
var ghPages = require('gulp-gh-pages');

var srcDocs = path.join(__dirname, 'docs');
var destDocs = path.join(srcDocs, '_site')

gulp.task('docs-jekyll', function (cb) {
    exec('jekyll build', {
        cwd: srcDocs
    }, function(err) {
        console.log(err, arguments);
        if (err) return cb(err);
        cb();
    });
});

gulp.task('docs-styles', function() {
    return gulp.src('./docs/less/main.less')
    .pipe(less())
    .pipe(rename('docs.css'))
    .pipe(gulp.dest(destDocs));
});

gulp.task('docs-clean', function(cb) {
    del([
        path.join(destDocs, '**')
    ], cb);
});

gulp.task('docs-server', function() {
    connect.server({
        root: destDocs
    });
});

gulp.task('docs-assets', function() {
    return gulp.src([
            'assets/**/*.*'
        ], {
            base: 'assets'
        })
        .pipe(gulp.dest(path.join(destDocs, 'static')));
});


gulp.task('docs-build', function(cb) {
    runSequence('docs-jekyll', 'docs-styles', 'docs-assets', cb);
});

gulp.task('deploy', ['docs-build'], function() {
    return gulp.src('./docs/_site/**/*')
    .pipe(ghPages());
});

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
