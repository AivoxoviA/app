const figlet = require("figlet");
const config = require(`./../config`);
const chalk = require(`chalk`);

console.log(`\n`);
console.log(chalk.bgGreen(figlet.textSync(` ${config.app.name} `)));
console.log(`\n`);

const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      message: 'user:',
      name: 'user',
    },
    {
      type: 'password',
      message: 'pass:',
      name: 'pass',
      mask: '*',
    },
  ])
  .then((answers) => {
    try {
      if (answers.user !== 'a7x') {
        throw new Error(` User not found! `);
      }
      if (answers.pass !== 'asdf') {
        throw new Error(` Password for user ${chalk.cyan(answers.user)} is wrong! `);
      }
      require(`./menu`).menu(answers.user);
    } catch (error) {
      console.error(chalk.bgRed(error.message), chalk.red(`Exiting system... `));
    }
  })
;
