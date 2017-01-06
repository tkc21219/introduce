// sudo npm install gulp-ejs gulp-sass gulp-pleeease gulp-uglify gulp-rename browser-sync gulp-plumber gulp-notify       -save-dev   or   -D

var gulp = require('gulp');
var ejs = require('gulp-ejs');
var fs = require('fs');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

var dirs = {
  'src': './_dev/',
  'dest': './docs/'
};

var config = {
  'ejs': {
    'src': dirs.src + 'ejs/**/!(_)*.ejs',
    'dest': dirs.dest + 'myprofile/'
  },
  'sass': {
    'src': dirs.src + 'styles/**/!(_)*.scss',
    'dest': dirs.dest + 'styles/'
  },
  'js': {
    'src': dirs.src + 'scripts/**/*.js',
    'dest': dirs.dest + 'scripts/'
  },
  'json': {
    'src': dirs.src + 'json/**/*',
    'dest': dirs.dest + 'json/'
  },
  'image': {
    'src': dirs.src + 'images/**/*',
    'dest': dirs.dest + 'images/'
  }
};

gulp.task('ejs', function(){
  var json = JSON.parse(fs.readFileSync("./package.json"));
  return gulp.src(config.ejs.src)
    .pipe(ejs(json, {"ext": ".html"}))
    .pipe(gulp.dest(config.ejs.dest))
    .pipe(browserSync.stream());
});

gulp.task('sass', function(){
  return gulp.src(config.sass.src)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass())
    .pipe(pleeease())
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src(config.js.src)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.stream());
});

gulp.task('imageCopy', function(){
  return gulp.src(config.image.src)
    .pipe(gulp.dest(config.image.dest))
    .pipe(browserSync.stream());
});

gulp.task('jsonCopy', function(){
  return gulp.src(config.json.src)
    .pipe(gulp.dest(config.json.dest))
    .pipe(browserSync.stream());
});

gulp.task('browserSync', function(){
  browserSync({
    browser: 'Google Chrome',
    server: {
      baseDir: dirs.dest,
      index: 'myprofile/index.html'
    }
  });
});

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('watch', function(){
  gulp.watch(config.ejs.src, ['ejs']);
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.js.src, ['js']);
  gulp.watch(config.image.src, ['imgCopy']);
  gulp.watch(config.json.src, ['jsonCopy']);
});

gulp.task('default', ['ejs', 'sass', 'imageCopy', 'jsonCopy', 'browserSync', 'watch']);
