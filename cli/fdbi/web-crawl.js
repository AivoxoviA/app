class Uang {
	constructor(nominal, tipe, te, img, judul) {
		this.nominal = nominal;
		this.tipe = tipe;
		this.te = te;
		this.img = img;
		this.judul = judul;
	}
}

const main = async (host, cb, spinner) => {
  const url = `${host}/id/rupiah/gambar-uang/Default.aspx`;
  const axios = require('axios'), cheerio = require('cheerio');
  const fs = require('fs');

	const data = [];
	const pageHTML = await axios.get(url);
	const $ = cheerio.load(pageHTML.data);

	let count = 1;
	$(".about__content-images-replace-dewan-gubernur-1").each(
		(index, element) => {
		const img = ($(element).attr("style").match(/\((.*?)\)/)[1]).replace(/^'(.*)'$/, '$1');
		const type = $(element).find("h2").text();
		const info = $(element).find("p").text();

		let tipe = type.split(' ')[2];
		let te = parseInt(info.split(' ')[1]);
		if (!tipe) {
			tipe = 'Khusus';
			te = info;
		}
		const uang = new Uang(
			parseInt(type.split(' ')[1].replace('.', ''))
			, tipe
			, te
			, img
			, type
		);

		data.push(uang);
		count++;
	});
  const savePath = "./data/bank-indonesia/data_uang.json";
	fs.writeFile(
    savePath
		, JSON.stringify(data, null, 2), {flag: 'w+'}, function (err) {
    if (err) {
        return console.log(err);
    }
    spinner.stop(true);
    console.log(`The file ${savePath} was saved!`);
    cb();
	}); 
};

exports.exe = (host, cb) => {
  const Spinner = require('cli-spinner').Spinner;
  Spinner.setDefaultSpinnerString(18);
  const spinner = new Spinner(`processing data %s`);
  console.log();
  spinner.start();
  main(host, cb, spinner);
};

