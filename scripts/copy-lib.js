
const fs = require('fs-extra');
const path = require('path');
const src = path.join(__dirname, '../node_modules/reveal.js');
const dest = path.join(__dirname, '../vendor/reveal.js');
try {
    fs.copySync(path.join(src, 'dist'), path.join(dest, 'dist'));
    fs.copySync(path.join(src, 'plugin'), path.join(dest, 'plugin'));
    console.log('✅ Reveal.js core files copied to /vendor/reveal.js');
} catch (err) {
    console.error('❌ Error copying files. Run "npm install" first.');
}
