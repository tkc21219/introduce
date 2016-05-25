// sudo npm install gulp-ejs gulp-sass gulp-pleeease gulp-uglify gulp-rename browser-sync gulp-plumber gulp-notify       -save-dev   or   -D

var gulp = require('gulp');
var ejs = require('gulp-ejs');
var fs = require('fs');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

// gulp.path: ({
//     dev: './_dev/',
//     pre: './_pre/'
// });

gulp.task('ejs', function(){
    var json = JSON.parse(fs.readFileSync("./package.json"));
    gulp.src(['_dev/ejs/*.ejs', '!' + '_dev/ejs/common/_*.ejs'])
        .pipe(ejs(json, {"ext": ".html"}))
        .pipe(gulp.dest('docs/myprofile/'))
});

gulp.task('sass', function(){
    gulp.src('_dev/scss/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass())
        .pipe(gulp.dest('_dev/css/'))
});

gulp.task('minify', function(){
    gulp.src('_dev/css/*.css')
        .pipe(pleeease())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('docs/css/'))
});

gulp.task('uglify', function(){
    gulp.src('_dev/js/*.js')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(uglify())
        .pipe(gulp.dest('docs/js/'))
});

gulp.task('imgCopy', function(){
    gulp.src('_dev/img/**/*')
        .pipe(gulp.dest('docs/img/'))
});

gulp.task('jsonCopy', function(){
    gulp.src('_dev/json/data.json')
        .pipe(gulp.dest('docs/json/'))
});

gulp.task('browser-sync', function(){
    browserSync({
        browser: 'Google Chrome',
        server: {
            baseDir: 'docs/',
            index: 'myprofile/index.html'
        }
    });
});

gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('watch', function(){
    gulp.watch('_dev/ejs/*.ejs', ['ejs']);
    gulp.watch('_dev/scss/style.scss', ['sass']);
    gulp.watch('_dev/css/style.css', ['minify']);
    gulp.watch('_dev/js/*.js', ['uglify']);
    gulp.watch('_dev/img/**/*', ['imgCopy']);
    gulp.watch('_dev/json/data.json', ['jsonCopy']);
    gulp.watch('docs/myprofile/**/*.html', ['reload']);
    gulp.watch('docs/css/*.css', ['reload']);
    gulp.watch('docs/js/*.js', ['reload']);
    gulp.watch('docs/img/*', ['reload']);
    gulp.watch('docs/json/data.json', ['reload']);
});

gulp.task('default', ['ejs', 'sass', 'minify', 'uglify', 'imgCopy', 'jsonCopy', 'browser-sync', 'watch']);
