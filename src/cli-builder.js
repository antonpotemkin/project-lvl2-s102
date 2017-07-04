import program from 'commander';
import packageJson from '../package.json';
import comporator from './comporator';

program
  .version(packageJson.version)
  .description(packageJson.description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(comporator(firstConfig, secondConfig));
  });

export default () => program.parse(process.argv);
