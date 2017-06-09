
var gulp       	 = require('gulp'),
		sass         = require('gulp-sass'),
		browserSync  = require('browser-sync'),
		concat  		 = require('gulp-concat'),
		uglify    	 = require('gulp-uglifyjs');
		cssnano    	 = require('gulp-cssnano'),
		rename    	 = require('gulp-rename'),
		del    	     = require('del'),
		imagemin     = require('gulp-imagemin'),
		cache        = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer'),
		plumber      = require('gulp-plumber'),
		notify       = require( 'gulp-notify' ),
		spritesmith  = require('gulp.spritesmith'),
    concatCss    = require('gulp-concat-css'),
    pug          = require('gulp-pug'),
    scss         = require('gulp-scss');

//**********
// gulp.task('pug', function() {
//   return gulp.src('app/pug-pages/*.pug')
//   .pipe(plumber())
//   .pipe(pug({
//     pretty: true
//   }).on( 'error', notify.onError({
//       message: "<%= error.message %>",
//       title  : "pug Error!"
//     }))
//   )
//   .pipe(gulp.dest('app'));
// });


//*********
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass().on( 'error', notify.onError({
      message: "<%= error.message %>",
      title  : "Sass Error!"
    }))
	)
	.pipe(plumber())
	.pipe(autoprefixer(['last 10 versions'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	// minify css
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(autoprefixer(['last 10 versions'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

//*********
// gulp.task("scss", function () {
//   gulp.src(
//     "app/scss/**/*.scss"
//   ).pipe(scss().on( 'error', notify.onError({
//       message: "<%= error.message %>",
//       title  : "Sass Error!"
//     }))
//   )
//   .pipe(plumber())
//   .pipe(autoprefixer(['last 15 versions'], { cascade: true }))
//   .pipe(gulp.dest('app/css'))
//   .pipe(browserSync.reload({stream: true}))
// });


//**********
// gulp.task('min-css', function() { 
// 	return gulp.src('app/css/*.css')
// 	.pipe(cssnano())
// 	.pipe(rename({suffix: '.min'}))
// 	.pipe(gulp.dest('dist/css'))
// });

//*********
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		socket: { domain: 'http://localhost:3000' }
	});
});


//**********
//gulp.task('js-libs', function() {
//  return gulp.src([
//    'app/libs/jquery/dist/jquery.min.js',
//    'app/libs/bootstrap/dist/js/bootstrap.min.js'
//    ])
//    .pipe(concat('libs.min.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('app/js'));
//});


//**********
// gulp.task('concat-css', function() {
//   return gulp.src([
//     'app/libs/owl-carousel2/owl.carousel.min.css',
//     'app/libs/owl-carousel2/owl.theme.default.min.css'
//     ])
//     .pipe(concatCss('owl-carousel.min.css'))
//     .pipe(gulp.dest('app/libs/owl-carousel2'));
// });


//***********
gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']);
	// gulp.watch('app/scss/**/*.scss', ['scss']);
  gulp.watch('app/*.html', browserSync.reload);
	// gulp.watch('app/**/*.pug', ['pug']);
	gulp.watch('app/js/**/*.js', browserSync.reload); 
});


//**********
// gulp.task('sprite', function () {
//   var spriteData = gulp.src('app/img/icons/*.png').pipe(spritesmith({
//   	imgPath: '../img/sprite/sprite.png',
//     imgName: 'sprite.png',
//     cssName: 'sprite.sass',
//   	padding: 2
//     //algorithm: 'binary-tree', or 'alt-diagonal' 'diagonal' 'left-right' 'top-down'
//   }));
//   var imgStream = spriteData.img
//     .pipe(gulp.dest('app/img/sprite'));
 
//   var cssStream = spriteData.css
//     .pipe(gulp.dest('app/sass'));
 
// });


//**********
gulp.task('clean', function() {
	return del.sync('dist');
});

//**********
gulp.task('img', function() {
	return gulp.src(['!app/img/icons/*', 'app/img/**/*']) 
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true
		})))
		.pipe(gulp.dest('dist/img'));
});

//***********
gulp.task('build-dist', ['clean', 'img', 'sass'], function() {

	var buildCss = gulp.src('app/css/*.min.css')
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') 
	.pipe(gulp.dest('dist/js'))

  var buildLibs = gulp.src('app/libs/**/*') 
  .pipe(gulp.dest('dist/libs'))

	var buildHtml = gulp.src('app/*.html') 
	.pipe(gulp.dest('dist'));

});

//*********
gulp.task('build', ['build-dist'], function() {
	return del.sync('dist/img/icons');
});

//*********
gulp.task('clear', function() {
  return cache.clearAll();
});



//********
gulp.task('default', ['watch']);













