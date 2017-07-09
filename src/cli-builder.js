import program from 'commander';
import { version, description } from '../package.json';
import gendiff from '.';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  });

export default () => program.parse(process.argv);
