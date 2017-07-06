import program from 'commander';
import { version, description } from '../package.json';
import comporator from './comporator';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(comporator(firstConfig, secondConfig));
  });

export default () => program.parse(process.argv);
