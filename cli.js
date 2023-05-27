const { Command } = require('commander');
const chalk = require('chalk');
const config = require('./config');

const program = new Command();

const programsMap = {
  main: {
    name: config.app.name,
    desc: `Command Line Interface programs`,
    version: `0.0.0`,
  },
  others: [
    {
      name: `add`,
      desc: `Adding two numbers`,
      version: `0.0.0`,
      callback: (program) => {
        program
          .argument(`<firstNumber>`, `First number`)
          .argument(`<secondNumber>`, `Second number`)
          .action((a, b) => {
            console.log(parseInt(a) + parseInt(b));
          })
        ;
      }
    },
    {
      name: `menu`,
      desc: `Show available commands`,
      version: `0.0.0`,
      callback: (program) => {
        program
          .action(() => {
            require(`./cli/index`);
          })
        ;
      }
    },
  ],
};

program
  .name(chalk.bgGreen(` ${config.app.name} - CLI `))
  .description(`${chalk.green(config.app.name)} - ${chalk.blue(programsMap.main.desc)}`)
  .version(programsMap.main.version)
;

for (let i = 0; i < programsMap.others.length; i++) {
  const command = programsMap.others[i];
  command.callback(
    program
      .command(command.name)
      .description(command.desc)
      .version(command.version)
  );
}

program.parse();
