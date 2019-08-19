var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var babel = require('babel/register');



gulp.task('mocha', function() {

    return gulp.src([ '**/*.test.js' ], {
        read: false,
    })
    .pipe(mocha({
        reporter: 'spec',
        compilers: {
            js: babel
        }
    }))
    .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch([ '**', '**.test.js' ], [ 'mocha' ]);
});
