const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()
const jsonminify = require('gulp-jsonminify')
const img64Html = require('gulp-img64-html')



function html() {
  return gulp
    .src('src/*.html')
    .pipe(
      img64Html({
        ignoreExternal: true // will skip http & https
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: { compress: true }
      })
    )
    .pipe(gulp.dest('.', { overwrite: true }))
    .pipe(browserSync.stream())
}

function json() {
  return gulp
    .src('./src/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('.'))
    .pipe(browserSync.stream())
}

function assets() {
  return gulp.src('./src/assets/**').pipe(gulp.dest('assets'))
}


exports.html = html
exports.json = json
exports.assets = assets
exports.dev = gulp.series(html, json, assets, function () {
  browserSync.init({
    server: './'
  })
  gulp.watch('src/*.html', html)
  gulp.watch('src/*.json', json)
})

exports.default = exports.build = gulp.parallel(html, json, assets)

