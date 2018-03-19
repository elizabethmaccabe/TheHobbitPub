var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//Task to compile SCSS to CSS
gulp.task('sass', function()
{
    return gulp.src('site/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('site/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

//Task to run a server with Browser Sync
gulp.task('browserSync', function()
{
    browserSync.init({
        server: {
            baseDir: 'site'
        },
    })
});

//Watch task
gulp.task('watch', ['browserSync', 'sass'], function()
{
    gulp.watch('site/scss/**/*.scss', ['sass']);
    gulp.watch('site/*.html', browserSync.reload);
    gulp.watch('site/**/*.js', browserSync.reload);
});