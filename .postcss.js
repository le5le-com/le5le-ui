const AUTOPREFIXER_BROWSERS = [
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

module.exports = function (postcss) {
  return postcss([
    require('precss'),
    require('autoprefixer')({
      browsers: AUTOPREFIXER_BROWSERS
    })
  ]);
};
