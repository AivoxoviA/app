const chalk = require(`chalk`);

const back = (user) => {
  console.log(`Returning to main menu...`);
  require(`./menu`).menu(user, true);
};

exports.main = (user) => {
  const host = `https://www.bi.go.id`;
  console.log(`Checking internet connection to the ${
    chalk.blue(host)
  }...`);

  const ping = require(`node-http-ping`);
  ping(host).then(time => {
    console.log(`Response time: ${chalk.green(time)} ms`);
    back(user);
  }).catch(() => {
    console.log(`Failed to ping ${chalk.red(host)}`);
    back(user);
  });
};
