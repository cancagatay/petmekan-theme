var gulp = require('gulp'),
    path = require('path'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    imagemin = require("gulp-imagemin"),
    browsersync = require("browser-sync"),
    autoprefixer = require('autoprefixer');

gulp.task('watch', function () {
    browsersync({
        server: {
            baseDir: './'
        },
        open: false,
        online: false,
        notify: false
    });
    gulp.watch('./assets/scss/*', gulp.series(['scss']));
    gulp.watch('./assets/images/*', gulp.series(['image']));
});

gulp.task('scss', function () {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'], cascade: false } ) ]))
        .pipe(gulp.dest('./assets/css'))
        .pipe(browsersync.reload({stream: true}))
});

gulp.task("image", function() {
    return gulp.src("./assets/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./assets/img"))
});
