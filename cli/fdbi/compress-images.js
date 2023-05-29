const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const main = async () => {
  const files = await imagemin([
    './public/images/uang/*.{jpeg,png}'
  ], {
		destination: './public/images/uang_compressed',
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.6, 0.8]
			})
		]
	});
};

exports.exe = (cb) => {
  const Spinner = require('cli-spinner').Spinner;
  Spinner.setDefaultSpinnerString(18);
  const spinner = new Spinner(`compressing images %s`);
  spinner.start();
  (async () => {
    await main();
    spinner.stop(true);
    cb();
  })();
};
