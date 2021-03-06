const gulp = require("gulp");
const sass = require('gulp-sass');
const clean = require("gulp-clean");
const rigger = require("gulp-rigger");

const src = './src/';
const scssPath = src + 'scss/';
const fontsPath = src + 'fonts/';
const imgPath = src + 'img/';
const htmlPath = src + 'layout/'
const distPath = src + 'dist/';

function scss() {
    return gulp.src(scssPath + 'common.scss')
        .pipe(sass())
        .pipe(gulp.dest(distPath + 'css/'));
}

function fonts() {
    return gulp.src(fontsPath + '*.+(woff|woff2)')
        .pipe(gulp.dest(distPath + 'fonts/'));
}

function images() {
    return gulp.src(imgPath + '*.png')
        .pipe(gulp.dest(distPath + 'img/'));
}

function fontsClean() {
    return gulp.src(distPath + 'fonts/')
        .pipe(clean({force: true}));
}

function mainPage() {
    return gulp.src(scssPath + 'main-page/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(distPath + 'css/main-page/'));
}

function htmlMainPage() {
    return gulp.src(htmlPath + 'main-page/*.html')
        .pipe(rigger())
        .pipe(gulp.dest(distPath + 'html/main-page/'));
}

function watch () {
    gulp.watch(scssPath + '*.scss', scss);
    gulp.watch(scssPath + 'main-page/*.scss', mainPage);
    gulp.watch(htmlPath + 'main-page/*.html', htmlMainPage);
    gulp.watch(htmlPath + '*.html', htmlMainPage);
}

exports.default = gulp.series(fonts, images, scss, mainPage, htmlMainPage, watch);