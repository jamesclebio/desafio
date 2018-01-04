const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const compass = require('gulp-compass');
const concat = require('gulp-concat');
const del = require('del');
const filter = require('gulp-filter');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const taskListing = require('gulp-task-listing');
const uglify = require('gulp-uglify');

// Default
gulp.task('default', taskListing);

// Dev
gulp.task('dev', () => {
  browserSync.init({
    server: {
      baseDir: '.',
    },
    open: false,
    notify: false
  });

  gulp
    .watch('index.html')
    .on('change', browserSync.reload);

  gulp
    .watch('scripts/**/*', ['scripts'])
    .on('change', browserSync.reload);

  gulp
    .watch('styles/**/*', ['styles'])
    .on('change', browserSync.reload);
});

// Fonts
gulp.task('fonts', () => {
  return gulp
    .src('bower_components/font-awesome/fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('assets/fonts'));
});

// Scripts
gulp.task('scripts', () => {
  gulp
    .src([
      'scripts/main.*.js',
      'scripts/main.js'
    ])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/scripts'))
    .pipe(browserSync.stream());
});

// Styles
gulp.task('styles', () => {
  let styles = filter('styles/**/*.sass', {restore: true});

  gulp
    .src([
      'styles/**/*.sass',
      'bower_components/font-awesome/css/font-awesome.css'
    ])
    .pipe(plumber())
    .pipe(styles)
    .pipe(compass({
      style: 'expanded',
      sass: 'styles',
      css: 'assets/styles',
      font: 'assets/fonts',
      image: 'assets/images'
    }))
    .pipe(styles.restore)
    .pipe(concat('main.css'))
    .pipe(gulp.dest('assets/styles'))
    .pipe(browserSync.stream());
});

// Build
gulp.task('build', () => {
  runSequence('build:clean', ['build:fonts', 'build:images'], 'build:mount');
});

gulp.task('build:clean', () => {
  return del.sync('dist');
});

gulp.task('build:fonts', () => {
  return gulp
    .src('assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('build:images', () => {
  return gulp
    .src('assets/images/**/*')
    .pipe(plumber())
    .pipe(imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('build:mount', () => {
  let scripts = filter('assets/**/*.js', {restore: true});
  let styles = filter('assets/**/*.css', {restore: true});

  gulp
    .src([
      '*assets/scripts/**/*',
      '*assets/styles/**/*',
      'index.html'
    ])
    .pipe(plumber())

    .pipe(scripts)
    .pipe(uglify())
    .pipe(scripts.restore)

    .pipe(styles)
    .pipe(cleanCSS())
    .pipe(styles.restore)

    .pipe(gulp.dest('dist'));
});
