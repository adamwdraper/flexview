const fs = require('fs');
const packageJSON  = require('./package');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const del = require('del');
const nodemon = require('gulp-nodemon');


// Empty dist directory
gulp.task('clean', function() {
  return del([
    './dist/*'
  ]);
});

// Compile sass
gulp.task('sass', function() {
  return gulp.src('./docs/css/sass/stylesheets/*.scss')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('./docs/css'))
    .pipe(gulp.dest('./'));
});

// Watch for compiling sass
gulp.task('sass:watch', [
  'sass'
  ], function() {
    gulp.watch('./docs/css/sass/**/*.scss', [
      'sass'
    ]);
});

// Start Server
gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    watch: [
      'server.js'
    ]
  });
});


// Task groups
gulp.task('default', [
  'sass',
  'server'
]);

gulp.task('watch', [
  'sass:watch'
]);
