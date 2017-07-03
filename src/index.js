import program from 'commander';

const help = program
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((cmd, env) => {
    console.log(`Compares two configuration files: ${cmd} and ${env}`);
  })
  .parse(process.argv);

export default () => help.action;
