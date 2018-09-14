'use strict';

import gulp from 'gulp'
import panini from 'panini'
import browser from 'browser-sync'
import babel from 'gulp-babel'


function server(done) {
  browser.init({
    server: 'dist',
    port: 3000
  })
  done()
}

function watch() {
  gulp.watch('./src/assets/img/*', copy)
  gulp.watch('./src/pages/*.html').on('all', gulp.series(pages, browser.reload))
  gulp.watch('./src/{partials,layouts}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload))
  gulp.watch('./src/assets/css/**/*.css').on('all', css)
  gulp.watch('./src/assets/js/**/*.js').on('all', gulp.series(JavaScript, browser.reload))
}

function copy() {
  return gulp.src('./src/assets/img/*')
             .pipe(gulp.dest('./dist/img'))
}

function pages() {
  return gulp.src('./src/pages/*')
             .pipe(panini({
               root: 'src/pages/',
               layouts: 'src/layouts/',
               partials: 'src/partials/',
               data: 'src/data/',
               helpers: 'src/helpers/'
             }))
             .pipe(gulp.dest('./dist'))
}

function resetPages(done) {
  panini.refresh()
  done()
}

function css() {
  return gulp.src('./src/assets/css/*.css')
              .pipe(gulp.dest('./dist/css'))
              .pipe(browser.reload({ stream: true }))
}

function JavaScript() {
  return gulp.src('./src/assets/js/*.js')
             .pipe(gulp.dest('./dist/js'))
}

gulp.task('build',
  gulp.parallel(pages, JavaScript, css, copy))

gulp.task('default',
  gulp.series('build', server, watch))
