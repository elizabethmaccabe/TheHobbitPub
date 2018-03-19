var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function()
{
    return gulp.src('site/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('site/css'))
});

//Watch task
gulp.task('watch', function()
{
    gulp.watch('site/scss/**/*.scss', ['sass']);
});