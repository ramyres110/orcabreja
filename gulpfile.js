const gulp = require('gulp');
const uglyfly = require('gulp-uglyfly');
 
gulp.task('compress', function() {
  gulp.src('app/js/main.js')
    .pipe(uglyfly())
    .pipe(gulp.dest('public/js/'))
});

gulp.task('default', () => {

});