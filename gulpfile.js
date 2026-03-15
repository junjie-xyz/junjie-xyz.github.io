const gulp = require('gulp')
const fs = require('fs')
const htmlmin = require('gulp-htmlmin')
const path = require('path')
const { Transform } = require('stream')
const browserSync = require('browser-sync').create()
const jsonminify = require('gulp-jsonminify')

function getMimeType(filePath) {
  switch (path.extname(filePath).toLowerCase()) {
    case '.avif':
      return 'image/avif'
    case '.gif':
      return 'image/gif'
    case '.ico':
      return 'image/x-icon'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.png':
      return 'image/png'
    case '.svg':
      return 'image/svg+xml'
    case '.webp':
      return 'image/webp'
    default:
      return null
  }
}

function inlineLocalImages() {
  return new Transform({
    objectMode: true,
    transform(file, _enc, callback) {
      if (file.isNull()) {
        callback(null, file)
        return
      }

      if (file.isStream()) {
        callback(new Error('Streaming not supported'))
        return
      }

      const html = file.contents.toString()
      const output = html.replace(
        /(<img\b[^>]*\bsrc=)(['"])([^'"]+)\2/gi,
        (match, prefix, quote, src) => {
          if (/^(?:https?:)?\/\//i.test(src) || src.startsWith('data:')) {
            return match
          }

          const imagePath = path.resolve(file.base, src)
          const mimeType = getMimeType(imagePath)

          if (!mimeType || !fs.existsSync(imagePath)) {
            return match
          }

          const content = fs.readFileSync(imagePath).toString('base64')
          return `${prefix}${quote}data:${mimeType};base64,${content}${quote}`
        }
      )

      file.contents = Buffer.from(output)
      callback(null, file)
    }
  })
}

function html() {
  return gulp
    .src('src/*.html')
    .pipe(inlineLocalImages())
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
  return gulp
    .src('./src/assets/**', { encoding: false })
    .pipe(gulp.dest('assets'))
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
