const fs = require('fs'), configFile = 'config.json';
let ok = false, config = {};

try {
	if (fs.existsSync(`./${configFile}`)) {
		config = require(`./../${configFile}`);
		ok = config.check.is.this.ok;
	} else if (process.env.config) {
		console.log('using config env vars');
		config = JSON.parse(process.env.config);
		ok = config.check.is.this.ok; 
	} else {
		throw new Error('config couldn\'t be loaded!');
	}
	if (!ok) {
		throw new Error('there is something wrong with the config!');
	}
} catch (e) {
	console.error(e);
}

module.exports = config;