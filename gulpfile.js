//Require Plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// === DEVELOPMENT TASKS === //
//Task to compile SCSS to CSS
gulp.task('sass', function()
{
    return gulp.src('site/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
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

//Task to watch scss, html and js files
gulp.task('watch', ['browserSync', 'sass'], function()
{
    gulp.watch('site/scss/**/*.scss', ['sass']);
    gulp.watch('site/*.html', browserSync.reload);
    gulp.watch('site/**/*.js', browserSync.reload);
});

gulp.task('default', function(callback)
{
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});

// === OPTIMISATION TASKS === //
//Task to concatenate all js files into 'main.min.js'
gulp.task('useref', function()
{
    return gulp.src('site/*.html')
    .pipe(useref())
    //Minifies only if it's a JS file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

//Task to minify images
gulp.task('images', function()
{
    return gulp.src('site/**/*.+(png|jpg|gif|svg)')
    //Cache images that ran through imagemin
    .pipe(cache(imagemin(
    {
        interlace: true
    })))
    .pipe(gulp.dest('dist/images'))
});

//Task to clear cache
gulp.task('cache:clear', function(callback)
{
    return cache.clearAll(callback)
});

//Task to copy fonts to 'dist' folder
gulp.task('fonts', function()
{
    return gulp.src('site/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

//Task to clean up files no longer in use
gulp.task('clean:dist', function()
{
    return del.sync('dist');
});

gulp.task('build', function(callback)
{
    runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'],
        callback
    )
});