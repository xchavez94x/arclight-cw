const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const gulpBabel = require('gulp-babel');
const gulpCopy = require('gulp-copy');

gulp.task('run_html', () => {
    return gulp.src('src/html/*.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest('dist'))
});

gulp.task('run_sass', () => {
    return gulp.src(['src/scss/style.scss', 'src/scss/**/*.scss'])
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('run_js', async () => {
    await gulp.src('src/js/*.js')
        .pipe(gulpBabel({
            presets: ["@babel/env"]
        }))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('copy-assets', async () => {
    await gulp.src('*/src/assets/**/*')
        .pipe(gulpCopy('assets/'))
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', async () => {
    await gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], gulp.series('run_sass'));
    await gulp.watch('src/html/*.html', gulp.series('run_html'));
    await gulp.watch('src/js/*.js', gulp.series('run_js'));
});