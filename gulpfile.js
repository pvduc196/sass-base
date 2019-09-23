const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

function compileSass() {
  return gulp.src('src/sass/**/*.+(sass|scss)')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}

function startServe() {
  browserSync.create();
  browserSync.init({
    server: 'src',
    port: 8080
  });
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/sass/**/*.+(sass|scss)', compileSass);
  gulp.watch('src/js/*.js').on('change', browserSync.reload);
}

exports.default = gulp.series(
  gulp.parallel(compileSass),
  startServe
);
