const fs = require('fs');
const packageJSON  = require('./package');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const del = require('del');
const nodemon = require('gulp-nodemon');

const isFlexview = function(file) {
  return file.path.includes('flexview.css');
};

// Empty dist directory
gulp.task('clean', function() {
  return del([
    './dist/*'
  ]);
});

// Compile sass
gulp.task('sass', function() {
  return gulp.src('./css/sass/stylesheets/*.scss')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(gulpif(isFlexview, gulp.dest('../')))
    .pipe(gulp.dest('./css'));
});

// Watch for compiling sass
gulp.task('sass:watch', [
  'sass'
  ], function() {
    gulp.watch('./css/sass/**/*.scss', [
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
