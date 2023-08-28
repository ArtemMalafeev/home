import gulp from 'gulp';
import uglify from 'gulp-uglify-es';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import { deleteAsync } from 'del';


const { src, dest, watch, parallel, series } = gulp;
const browser = browserSync.create();

/* HTML */

export const minifyHTML = () => {
    return src([
        'app/index.html',
        '!app/assets/index.min.html'
    ])
        .pipe(concat('index.min.html'))
        .pipe(htmlmin({ collapseWhitespace: true, }))
        .pipe(dest('app'))
        .pipe(browser.stream());
};

/* Styles */

export const minifyCSS = () => {
    return src([
        'app/assets/css/index.css',
        '!app/assets/css/index.min.css',
    ])
        .pipe(concat('index.min.css'))
        .pipe(cleanCSS({ compatibility: 'ie10' }))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version']}))
        .pipe(dest('app/assets/css'))
        .pipe(browser.stream());
};

/* Scripts */

export const minifyJS = () => {
    return src([
        'node_modules/swiper/swiper-bundle.js',
        'app/assets/js/**/*.js',
        '!app/assets/js/index.min.js',
    ])
        .pipe(concat('index.min.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify.default())
        .pipe(dest('app/assets/js'))
        .pipe(browser.stream());
};

/* Clean build */

export const cleanBuild = () => {
    return deleteAsync('build');
};

export const watching = () => {
    watch(['app/assets/css/**/*.css', '!app/assets/css/index.min.css'], minifyCSS);
    watch(['app/assets/js/**/*.js', '!app/assets/js/index.min.js'], minifyJS);
    watch(['app/index.html'], minifyHTML);
    watch(['app/index.html']).on('change', browser.reload);
};


export const server = () => {
    browser.init({
        server: {
            baseDir: 'app',
            index: 'index.min.html',
        },
        cors: true,
        notify: false,
        ui: false,
    });
};

export default series(
    cleanBuild,
    parallel(
        minifyCSS,
        minifyJS,
        minifyHTML,
        server,
        watching,
    ),
);
