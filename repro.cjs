const fs = require('node:fs');
const path = require('node:path');

const packagePath = require.resolve('expo/package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const templatePath = path.join(path.dirname(packagePath), 'template.tgz');
console.log('Expo version:', packageJson.version);
console.log('Node.js version:', process.version);
console.log('template.tgz exists:', fs.existsSync(templatePath));
console.log('Explicit template export:', packageJson.exports['./template.tgz'] ?? '(missing)');
console.log('Wildcard export:', JSON.stringify(packageJson.exports['./*']));
console.log('Resolved template:', require.resolve('expo/template.tgz'));
