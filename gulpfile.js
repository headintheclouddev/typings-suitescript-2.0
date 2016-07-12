var gulp = require('gulp');

gulp.task('default', function() {
    require('dts-generator').default({
        name: 'SSv2-Globals',
        project: './SuiteScript2.0-Globals',
        out: './SuiteScript2.0-Globals/dist/SSv2-Globals.d.ts'
    });
});