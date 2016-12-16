var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var jsonminify = require('gulp-jsonminify');
var gulp = require('gulp');
var fontmin = require('gulp-fontmin');
var copy = require('gulp-copy');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var ghPages = require('gulp-gh-pages');
gulp.task('fontmn', function () {
    return gulp.src('app/fonts/*.ttf')
        .pipe(fontmin({
            text: '天地玄黄 宇宙洪荒',
        }))
        .pipe(gulp.dest('dist/fonts'));
});
gulp.task('fontmn1', function () {
    return gulp.src('app/fonts/*.woff2')
        .pipe(fontmin({
            text: '天地玄黄 宇宙洪荒',
        }))
        .pipe(gulp.dest('dist/fonts'));
});
gulp.task('serve', [], function(){
	browserSync.init({
		server: "./app"
	});
	browserSync.stream();
});

gulp.task('default',['useref', 'compcss', 'comphtm', 'compimg', 'jsonmin', 'serve', 'copy', 'fontmn', 'fontmn1'], function() {
	gulp.watch('app/scripts/**/*.js', ['lint']);
});

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['app/scripts/**/*.js'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});
gulp.task('compcss', function () {
	gulp.src('app/styles/**/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/styles'));
});
gulp.task('comphtm', function(){
	return gulp.src('app/views/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist/views'))
});
gulp.task('compimg', function(){
	gulp.src('app/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
});
gulp.task('jsonmin', function () {
    return gulp.src(['app/data/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('dist/data'));
});
gulp.task('copy', function(){
	gulp.src('app/data/*.csv')
  .pipe(gulp.dest('dist/data'));
});
gulp.task('serve:dist', function(){
	browserSync.init({
		server: "dist"
	});
	browserSync.stream();
});
gulp.task('deploy', function() {
	return gulp.src('./dist/**/*')
	.pipe(ghPages());
});