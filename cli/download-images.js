const basepath = './public/images/uang';

const chalk = require('chalk');
const mimeTypes = require('mime-types');
const Downloader = require('nodejs-file-downloader');

function truncate(text) {
  const size = 64;
  return text.length > size ? '...' + text.slice(text.length - size) : text;
}

async function download(url, saveTo) {
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
};

const data = require('./../data/bank-indonesia/uang.json');
const path = require('path');

(async () => {
  for (let i = 0; i < data.length; i++) {
    const url = data[i].img;
    let ext = path.extname(url);
    const contentType = mimeTypes.lookup(ext);
    ext = mimeTypes.extension(contentType);
    const filename = `uang-${i}.${ext}`;
    await download(url, filename);
    if (i == 2) break;
  }
})();

