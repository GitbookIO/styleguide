var path = require('path');
var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var connect = require('gulp-connect');
var runSequence = require('gulp-run-sequence');
var rename = require('gulp-rename');
var exec = require('child_process').exec;

var srcDocs = path.join(__dirname, 'docs');
var destDocs = path.join(srcDocs, '_site')

// Create website
gulp.task('jekyll', function (cb) {
    exec('jekyll build', {
        cwd: srcDocs
    }, function(err) {
        console.log(err, arguments);
        if (err) return cb(err);
        cb();
    });
});

// Less to css
gulp.task('styles', function() {
    return gulp.src('./docs/less/main.less')
    .pipe(less())
    .pipe(rename('docs.css'))
    .pipe(gulp.dest(destDocs));
});

// Clean output
gulp.task('clean', function(cb) {
    del([
        'build/**'
    ], cb);
});

// HTTP server
gulp.task('connect', function() {
    connect.server({
        root: destDocs
    });
});

gulp.task('build', function(cb) {
    runSequence('jekyll', 'styles',cb);
});


gulp.task('default', function(cb) {
    gulp.watch([
        'less/**/*.less',
        'docs/less/**/*.less'
    ], ['styles']);
    gulp.watch([
        'docs/**/*.md',
        'docs/_layouts/*.html',
        'docs/_includes/*.html'
    ], ['build']);
    runSequence('build', 'connect', cb);
});
