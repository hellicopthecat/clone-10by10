import gulp from "gulp";
import {deleteSync} from "del";
import minify from "gulp-csso";
import gulpSass from "gulp-sass";
import sass2 from "sass";
import autoprefixer from "gulp-autoprefixer";
import replace from "gulp-replace";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import ghPages from "gh-pages";
import htmlmin from "gulp-htmlmin";

const jquery = "src/js/jquery-3.7.1.min.js";
const sass = gulpSass(sass2);

const routes = {
  html: {
    watch: "index.html",
    dest: "dest/",
  },
  css: {
    watch: "src/scss/*",
    src: "src/scss/styles.scss",
    dest: "dest/css",
  },
  js: {
    watch: "src/js/*",
    src: {
      index: "src/js/index.js",
      click: "src/js/clickEvent.js",
      menu: "src/js/openMenu.js",
    },
    dest: "dest/js",
  },
};
const home = () => {
  gulp
    .src(routes.html.watch)
    .pipe(replace('<script src="src/js/jquery-3.7.1.min.js"></script>', ""))
    .pipe(replace('<script src="src/js/clickEvent.js"></script>', ""))
    .pipe(replace('<script src="src/js/openMenu.js"></script>', ""))
    .pipe(replace("src/js/", "js/"))
    .pipe(replace("dest/css/", "css/"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(routes.html.dest));
};

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const js = () => {
  gulp
    .src([jquery, routes.js.src.index, routes.js.src.click, routes.js.src.menu])
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(gulp.dest(routes.js.dest));
};

const watch = () => {
  gulp.watch(routes.html.watch, home);
  gulp.watch(routes.css.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const ghDeploy = async () => {
  await ghPages.publish("dest", {
    branch: "gh-pages",
    message: "auto Deploy",
  });
};
const clean = async () => await deleteSync(["dest/"]);

const prepare = gulp.series([clean]);

const assets = async () => {
  await home();
  await styles();
  await js();
};

const live = gulp.parallel([watch]);
export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([ghDeploy]);
