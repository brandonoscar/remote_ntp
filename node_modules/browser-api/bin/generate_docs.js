#!/usr/bin/env node
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const options = yargs
  .usage('$0 [options]', 'Start')
  .option('m', {
    alias: 'module',
    describe: 'Module file for the API to parse',
    type: 'string',
    demand: true,
  })
  .option('s', {
    alias: 'sources',
    describe: 'List of API files (or glob expressions) to parse',
    type: 'array',
    demand: true,
  })
  .option('d', {
    alias: 'docs',
    describe: 'Directory to write generated API documentation files',
    type: 'str',
    demand: true,
  }).argv;

function generate_doc(target, templateData, template) {
  let options = {
    data: templateData,
    separators: true,
  };

  if (typeof template !== 'undefined') {
    options.template = template;
  }

  console.log('Generating', target);

  const output = jsdoc2md.renderSync(options);
  fs.writeFileSync(target, output);
}

fs.rmSync(options.docs, { recursive: true });
fs.mkdirSync(options.docs, { recursive: true });

const sourcesData = jsdoc2md.getTemplateDataSync({ files: options.sources });

const classNames = sourcesData.reduce((classNames, identifier) => {
  if (identifier.kind === 'class') {
    classNames.push(identifier.name);
  }

  return classNames;
}, []);

// Generate markdown for each API class
for (const className of classNames) {
  const file = path.resolve(options.docs, `${className}.md`);
  const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
  generate_doc(file, sourcesData, template);
}

// Generate markdown for the module
const file = path.resolve(options.docs, 'README.md');
const moduleData = jsdoc2md.getTemplateDataSync({ files: options.module });
generate_doc(file, moduleData);
