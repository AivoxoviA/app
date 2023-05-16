const data = require('./../data/bank-indonesia/uang');
const processedData = [];

for (let i = 0; i < data.length; i++) {
	const item = data[i];
	if (item.tipe === 'Khusus') break;
	let added = false;
	for (let j = 0; j < processedData.length; j++) {
		const _item = processedData[j];
		if (_item.nominal === item.nominal && _item.tipe === item.tipe) {
			processedData[j].alt.push(i);
			added = true;
		}
	}
	if (added) continue;
	item.id = i;
	item.alt = [i];
	processedData.push(item);
}

console.log(processedData);

const fs = require('fs');
fs.writeFile(
	`./data/bank-indonesia/uang_processed.json`
	, JSON.stringify(data, null, 2), {flag: `w+`}, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`The file was saved!`);
	}
);


