const data = require('./../data/bank-indonesia/uang.json');
const https = require('https');
const fs = require('fs');

for (let i = 0; i < data.length; i++) {
	const url = data[i].img;
	const path = './public/images/uang/';
	const filepath = `${path}uang-${i}.jpg`;
	const file = fs.createWriteStream(filepath);

	https.get(url, response => {
		response.pipe(file);
		file.on('finish', () => {
			file.close();
			console.log(`file downloaded as ${filepath}`);
		});
	}).on('error', err => {
		fs.unlink(filepath);
		console.error(`Error downloading file: ${err.message}`)
	})
}
