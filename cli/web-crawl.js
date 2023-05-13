const base = 'www.bi.go.id';
const url = `https://${base}/id/rupiah/gambar-uang/Default.aspx`;
const axios = require('axios'), cheerio = require('cheerio');
const fs = require('fs');

class Uang {
	constructor(nominal, tipe, te, img, judul) {
		this.nominal = nominal;
		this.tipe = tipe;
		this.te = te;
		this.img = img;
		this.judul = judul;
	}
}

async function main() {
	const data = [];
	const pageHTML = await axios.get(url);
	const $ = cheerio.load(pageHTML.data);

	let skip = false;
	let count = 1;
	$(".about__content-images-replace-dewan-gubernur-1").each(
		(index, element) => {
		//if (skip) return false; 
		const img = ($(element).attr("style").match(/\((.*?)\)/)[1]).replace(/^'(.*)'$/, '$1');
		const type = $(element).find("h2").text();
		const info = $(element).find("p").text();

		console.log(type, '&', info);
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
		if (type === 'Rp 50 Koin' && info === 'TE 1999') skip = true;
		// skip uang khusus
		count++;
	});

	console.log(data);
	fs.writeFile(
		"./data/bank-indonesia/uang.json"
		, JSON.stringify(data, null, 2), {flag: 'w+'}, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
	}); 
}

main();