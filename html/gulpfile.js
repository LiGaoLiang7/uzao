var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

/*  .pipe(connect.reload());  */

gulp.task('server', function() {
    connect.server({
        root: '../htmlL/',
        livereload: true
    });
});



gulp.task('copy-index', function() {
    return gulp.src('./home/index.html').pipe(gulp.dest('dist'));
});

// 指定文件
gulp.task('copy-image', function() {
    return gulp.src('./home/images/*.jpg').pipe(gulp.dest('./dist/images/'));
});

// 多个格式
gulp.task('copy-images', function() {
    return gulp.src('./home/images/*.{jpg,png,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-all', function() {
    return gulp.src('./home/images/**/*').pipe(gulp.dest('./dist/'));
});

gulp.task('data', function() {
    return gulp.src(['xml/*.xml', 'json/*.json']).pipe(gulp.dest('dist/data'));
});

// 排除
gulp.task('data-some', function() {
    return gulp.src(['xml/*.xml', 'json/*.json', '!json/secrit-*.json']).pipe(gulp.dest('dist/data'));
});

// 主任务
gulp.task('build', ['copy-image', 'data-some'], function() {
    console.log('编译成功');
});

// 编译sass
gulp.task('sass', function() {
    return gulp.src('./public/sass/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
});

gulp.task('sass-home', function() {
    return gulp.src('./home/sass/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./home/css'))
        .pipe(connect.reload());
});

// 合并js
gulp.task('scripts', function() {
    return gulp.src('./public/js/*.min.js')
        .pipe(concat('uzao.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('uzao.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('html-home', function() {
    return gulp.src('./home/*.html')
        .pipe(connect.reload());
});

gulp.task('html-front', function() {
    return gulp.src('./front/*.html')
        .pipe(connect.reload());
});

// watch
gulp.task('watch', function() {
    gulp.watch('./public/sass/*.scss', ['sass']);
    gulp.watch('./home/sass/*.scss', ['sass-home']);
    gulp.watch('./home/*.html', ['html-home']);

});

gulp.task('default', ['watch']); //创建默认任务
