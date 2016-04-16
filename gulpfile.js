'use strict';

let gulp = require('gulp'),
  cache = require('gulp-cache'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  minifycss = require('gulp-minify-css'),
  notify = require('gulp-notify'),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  beautify = require('gulp-beautify'),
  ngAnnotate = require('gulp-ng-annotate'),
  minifyHTML = require('gulp-minify-html'),
  livereload  = require("gulp-livereload");



gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('styles', function() {
  return sass('./src/sass/**/*', {
      style: 'expanded'
    })
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify({
      message: "SCSS Compiled"
    }));
});

gulp.task('scripts', function() {
  return gulp.src("./src/javascript/**/*.js")
    .pipe(concat('jsBundle.js'))
    .pipe(beautify({
      indentSize: 4,
      indentChar: ' '
    }))
    .pipe(gulp.dest("./dist/js/"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(notify({
      message: "Minified JS, And Bundled."
    }));
});

gulp.task('minify-html', function() {
  let opts = {
    conditionals: true
  };
  return gulp.src("./src/templates/**/*.html")
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/views'))
    .pipe(notify({
      message: "Minified HTML files."
    }));
});

gulp.task('watch', function(){
	livereload.listen({ start: true});
	gulp.watch(['./dist/**/*.html', './dist/**/*.js']).on('change', livereload.changed);
	gulp.watch('./src/templates/**/*.html', ['minify-html']);
	gulp.watch('./src/sass/**/*.scss', ['styles']);
	gulp.watch('./src/javascript/**/*.js', ['scripts']);
});



gulp.task('default', ['images', 'styles', 'scripts', 'minify-html']);
