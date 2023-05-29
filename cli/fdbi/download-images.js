const basepath = './public/images/uang';

const chalk = require('chalk');
const mimeTypes = require('mime-types');
const Downloader = require('nodejs-file-downloader');

function truncate(text) {
  const size = 32;
  return text.length > size ? '...' + text.slice(text.length - size) : text;
}

async function download(url, saveTo, spinner) {
  const c_url = chalk.green(truncate(url));

  const downloader = new Downloader({
    url: url,
    directory: basepath,
    fileName: saveTo,
    cloneFiles: false,
  });

  try {
    const {filePath, downloadStatus} = await downloader.download();
    const done = chalk.bgGreen.white(` ${downloadStatus}! `);
    console.log(`${done} saved at ${truncate(filePath)}`);
  } catch (error) {
    console.error(`Download failed`, error);
  }
  spinner.stop(true);
};

const data = require('./../../data/bank-indonesia/data_uang.json');
const path = require('path');

const Spinner = require('cli-spinner').Spinner;
Spinner.setDefaultSpinnerString(18);

const main = async () => {
  for (let i = 0; i < data.length; i++) {
    const spinner = new Spinner(`processing data %s`);
    spinner.start();

    const url = data[i].img;
    spinner.setSpinnerTitle(`downloading ${
      truncate(url)
    } %s`);
    let ext = path.extname(url);
    const contentType = mimeTypes.lookup(ext);
    ext = mimeTypes.extension(contentType);
    const filename = `uang-${i}.${ext}`;
    await download(url, filename, spinner);
  }
};

exports.exe = (cb) => {
  (async () => {
    await main();
    cb();
  })();
};

