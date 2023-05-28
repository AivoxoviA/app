const chalk = require(`chalk`);

const back = (user) => {
  console.log(`Returning to main menu...`);
  require(`./menu`).menu(user, true);
};

const menus = [
  {
    text: `Fetch data uang and generate json data`,
    exe: (user) => {
      options(user);
    },
  },
  {
    text: `Exit`,
    exe: (user) => {
      back(user);
    },
  },
];

const options = (user) => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    console.log(chalk.cyan((i+1) + `. ` + menu.text));
  }
  const inquirer = require(`inquirer`);
  inquirer.prompt([{
    message: `Choose number:`, name: `number`
  },]).then((answers) => {
    try {
      const number = parseInt(answers.number);
      if (number < 1 || number > menus.length) throw new Error(
        `Chosen number isn't available!`
      );
      const menu = menus[number - 1];
      console.log(`\nexecute: ${chalk.green(menu.text)}`);
      menu.exe(user);
    } catch (error) {
      console.error(
        chalk.bgRed(` ${error} `)
        , chalk.red(`exiting program...`)
      );
      back(user);
    }
  });
};

exports.main = (user) => {
  const host = `https://www.bi.go.id`;
  console.log(`pinging ${
    chalk.green(host)
  }...`);

  const ping = require(`node-http-ping`);
  ping(host).then(time => {
    console.log(`Response time: ${
      chalk.green(time)
    } ms`);
    options(user);
  }).catch(() => {
    console.log(`Failed to ping ${chalk.red(host)}`);
    back(user);
  });
};
