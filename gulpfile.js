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

gulp.task('jekyll', function (cb) {
    exec('jekyll build', {
        cwd: srcDocs
    }, function(err) {
        console.log(err, arguments);
        if (err) return cb(err);
        cb();
    });
});

gulp.task('styles', function() {
    return gulp.src('./docs/less/main.less')
    .pipe(less())
    .pipe(rename('docs.css'))
    .pipe(gulp.dest(destDocs));
});

gulp.task('clean', function(cb) {
    del([
        path.join(destDocs, '**')
    ], cb);
});

gulp.task('connect', function() {
    connect.server({
        root: destDocs
    });
});

gulp.task('assets', function() {
    return gulp.src([
            'assets/**/*.*'
        ], {
            base: 'assets'
        })
        .pipe(gulp.dest(path.join(destDocs, 'static')));
});


gulp.task('build', function(cb) {
    runSequence('jekyll', 'styles', 'assets', cb);
});

gulp.task('deploy', ['build'], function() {
    return gulp.src('./docs/_site/**/*')
    .pipe(ghPages());
});

gulp.task('default', function(cb) {
    gulp.watch([
        'less/**/*.less',
        'docs/less/**/*.less'
    ], ['styles']);
    var watcher = gulp.watch([
        'docs/*.md',
        'docs/_layouts/*.html',
        'docs/_includes/*.html',
        'docs/_includes/*.md'
    ], ['build']);

    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    runSequence('build', 'connect', cb);
});
