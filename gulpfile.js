var gulp = require('gulp')
var browserSync = require('browser-sync').create();
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        files: ['./index.html', './css/*.css', './js/*.js']
    });
});