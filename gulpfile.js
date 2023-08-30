import gulp from 'gulp';
import uglify from 'gulp-uglify-es';
import browser from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import avif from 'gulp-avif';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import { deleteAsync } from 'del';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';


/* HTML */

export const minifyHTML = () => {
    return gulp.src([
        'app/index.html',
    ])
        .pipe(concat('index.min.html'))
        .pipe(htmlmin({ collapseWhitespace: true, }))
        .pipe(gulp.dest('build'))
        .pipe(browser.stream());
};

/* Styles */

export const minifyCSS = () => {
    return gulp.src([
        'app/assets/css/index.css',
    ])
        .pipe(concat('index.min.css'))
        .pipe(cleanCSS({ compatibility: 'ie10' }))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(browser.stream());
};

/* Scripts */

export const minifyJS = () => {
    return gulp.src([
        'node_modules/swiper/swiper-bundle.js',
        'app/assets/js/**/*.js',
    ])
        .pipe(concat('index.min.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify.default())
        .pipe(gulp.dest('build/assets/js'))
        .pipe(browser.stream());
};

/* Images */

export const minifyImages = () => {
    return gulp.src([
        'app/assets/images/**/*.{jpg,png}',
        '!app/assets/images/favicons/*.*',
    ])
        .pipe(imagemin())
        .pipe(gulp.dest('build/assets/images'))
};

/* WebP */

export const createWebP = () => {
    return gulp.src([
        'app/assets/images/**/*.{jpg,png}',
        '!app/assets/images/favicons/*.*', 
    ])
        .pipe(webp({ quality: 50 }))
        .pipe(gulp.dest('build/assets/images'))
};

/* Avif */

export const createAvif = () => {
    return gulp.src([
        'app/assets/images/**/*.{jpg,png}',
        '!app/assets/images/favicons/*.*',
    ])
        .pipe(avif())
        .pipe(gulp.dest('build/assets/images'))
};


/* Fonts */

export const optimizeFonts = () => {
    return gulp.src('app/assets/fonts/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf'],
        }))
        .pipe(gulp.src('build/assets/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(gulp.dest('build/assets/fonts'))
};

/* Copy */

export const copy = () => {
    return gulp.src([
        'app/assets/images/icons.svg',
        'app/assets/fonts/*.{woff2, woff, ttf}',
        'app/*.ico',
        'app/*.webmanifest',
        'app/assets/images/favicons/*.*',
    ], {
        base: 'app'
    })
        .pipe(gulp.dest('build'))
};

/* Watching */

export const watching = () => {
    browser.init({
        server: {
            baseDir: 'build',
            index: 'index.min.html',
        },
        cors: true,
        notify: false,
        ui: false,
    });
    gulp.watch(['app/assets/css/**/*.css'], minifyCSS);
    gulp.watch(['app/assets/js/**/*.js'], minifyJS);
    gulp.watch(['app/index.html']).on('change', browser.reload);
};

/* Clean build */

export const cleanBuild = () => {
    return deleteAsync('build');
};

export const build = gulp.series(
    cleanBuild,
    copy,
    minifyImages,
    gulp.parallel(
        minifyCSS,
        minifyJS,
        minifyHTML,
        createAvif,
        createWebP,
    ),
);

export default gulp.series(
    cleanBuild,
    copy,
    minifyImages,
    gulp.parallel(
        minifyCSS,
        minifyJS,
        minifyHTML,
        createAvif,
        createWebP,
        watching,
    ),
);
