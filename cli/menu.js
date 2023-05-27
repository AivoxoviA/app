const figlet = require("figlet");
const chalk = require(`chalk`);

const menus = [
  {
    text: `User management`,
    exe: (user) => {
      require(`./menu`).menu(user, true);
    },
  },
  {
    text: `VIM codes`,
  },
  {
    text: `tmux cheatsheet`,
  },
  {
    text: `htop statsictics`,
  },
  {
    text: `Fetch data from Bank Indonesia`,
  },
  {
    text: `Welcome screen`,
    exe: (user) => {
      require(`./menu`).menu(user);
    }
  },
  {
    text: `Exit CLI`,
    exe: () => {
      console.log(chalk.bgCyan(` Gracefully exiting system... `));
    }
  },
];
exports.menu = (user, skip) => {
  let _user = user;
  if (skip) _user = false;
  console.log(`\n`);
  const appendUser = _user ? `- ${_user}` : ` Back`;
  console.log(
    chalk.bgBlue(figlet.textSync(` Welcome ${appendUser}  `))
  );
  console.log(`\n`);
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    console.log(chalk.cyan((i+1) + `. ` + menu.text));
  }
  console.log(`\n`);

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
      console.log(menu);
      menu.exe(user);
    } catch (error) {
      console.error(
        chalk.bgRed(` ${error} `)
        , chalk.red(`exiting system...`)
      );
    }
  });
};
