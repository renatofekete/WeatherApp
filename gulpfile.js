const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const html = done => {
  gulp.src('src/index.html')
    .pipe(gulp.dest('docs'))
  done()
}
const css = done => {
  gulp.src('src/scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(gulp.dest('docs/css'))
  done()
}
const js = done => {
  gulp.src('src/js/app.js').pipe(babel({
    presets: ['@babel/env']
  }))
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'))
  done()
}

gulp.task('html', html)
gulp.task('sass', css)
gulp.task('js', js)
gulp.task('default', gulp.parallel(html, css, js))
gulp.task('watch', () => {
  gulp.watch('src/index.html', gulp.parallel(html))
  gulp.watch('src/scss/**/*', gulp.parallel(css))
  gulp.watch('src/js/**/*', gulp.parallel(js))
})
