// 引入 gulp及组件
var gulp = require('gulp'),
  less = require('gulp-less');//引入gulp-less插件


gulp.task('less-css', function () {

  return gulp.src('./static/theme/dark/dark.less')
    .pipe(less())
    .pipe(gulp.dest('./static/theme/dark'))
    //.pipe(notify({message: 'css task ok'}));
});

gulp.task('watch-less', function () {
  gulp.watch('./static/theme/dark/dark.less', ['less-css'])
});
