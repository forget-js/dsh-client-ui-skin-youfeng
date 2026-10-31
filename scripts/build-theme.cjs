/**
 * Build the WorkBuddy Youfeng DSH skin:
 * inline tokens, CSS and images into lib/client.js.
 *
 * Usage: node scripts/build-theme.cjs
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
const tokens = JSON.parse(read('src', 'tokens.json'));
const css = read('src', 'theme.css');
const template = read('src', 'client.template.js');
const wallpaper = fs.readFileSync(path.join(root, 'assets', 'green.webp')).toString('base64');
const cat = fs.readFileSync(path.join(root, 'assets', 'cat.webp')).toString('base64');

const imageCss = css.replace(
  'background-image: var(--wf-wallpaper);',
  `background-image: url("data:image/webp;base64,${wallpaper}");`
);

const output = template
  .replace('__TOKENS__', JSON.stringify(tokens, null, 2))
  .replace('__CSS__', JSON.stringify(imageCss))
  .replace('__CAT__', JSON.stringify(`data:image/webp;base64,${cat}`));

fs.mkdirSync(path.join(root, 'lib'), { recursive: true });
fs.writeFileSync(path.join(root, 'lib', 'client.js'), output);
console.log(`built ${path.join(root, 'lib', 'client.js')} (${output.length} bytes)`);
