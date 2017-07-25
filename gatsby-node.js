const rucksack = require('rucksack-css');
const lost = require('lost');
const cssnext = require('postcss-cssnext');
const fs = require('fs-extra');
const path = require('path');

const domain = '5pi.de';

exports.modifyWebpackConfig = function (config) {
  config.merge({
    postcss: [
      lost(),
      rucksack(),
      cssnext({
        browsers: ['>1%', 'last 2 versions'],
      }),
    ],
  });

  config.loader('svg', {
    test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
  });

  return config;
};

exports.postBuild = (pages, callback) => {
  fs.writeFile(path.join(__dirname, '/public/CNAME'), domain + '\n')
};
