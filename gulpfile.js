const fs = require('fs');
const packageJSON  = require('./package');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const del = require('del');


// Empty dist directory
gulp.task('clean', function() {
  return del([
    './dist/*'
  ]);
});

// Compile sass
gulp.task('sass', function() {
  return gulp.src('./css/sass/stylesheets/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('./css'));
});

// Watch for compiling sass
gulp.task('sass:watch', [
  'sass'
  ], function() {
  gulp.watch('./src/sass/**/*.scss', [
    'sass'
  ]);
});

// Task groups
gulp.task('default', [
  'sass:watch'
]);