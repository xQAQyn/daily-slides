// scaffold.js - 跨平台初始化脚本
const fs = require('fs');
const path = require('path');

// 1. 定义目录结构
const dirs = [
    'assets/css',
    'assets/images',
    'decks/demo',
    'scripts'
];

// 2. 创建目录
dirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`[Created] ${dir}`);
    }
});

// 3. 写入 package.json (核心配置)
// 注意：引入了 'shx' 来实现跨平台命令
const pkgJson = {
    name: "my-slides-repo",
    version: "1.0.0",
    scripts: {
        "start": "http-server -p 8000 -c-1", 
        "dev": "http-server -p 8000 -c-1",
        "build": "node scripts/copy-lib.js",
        "clean": "shx rm -rf vendor"
    },
    dependencies: {
        "reveal.js": "^5.0.0"
    },
    devDependencies: {
        "http-server": "^14.1.1",
        "fs-extra": "^11.1.1",
        "shx": "^0.3.4" 
    }
};
fs.writeFileSync('package.json', JSON.stringify(pkgJson, null, 2));
console.log('[Created] package.json');

// 4. 写入脚本：将 reveal.js 核心库提取到 vendor (部署用)
const copyScript = `
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
`;
fs.writeFileSync('scripts/copy-lib.js', copyScript);

// 5. 写入 CSS
const cssContent = "/* Global Styles */\n.reveal h1 { font-family: sans-serif; }\n.reveal section img { border: none; }";
fs.writeFileSync('assets/css/custom.css', cssContent);

// 6. 写入 Demo Content (Markdown)
const demoMd = `
## Hello Multi-Platform!
此 Slide 在 Linux 和 Windows 下均可正常运行。

---

## 架构特点
* **npm scripts** 管理命令
* **vendor** 目录独立部署
* **Markdown** 编写内容
`;
fs.writeFileSync('decks/demo/content.md', demoMd);

// 7. 写入 HTML 模板 (指向 vendor)
const htmlTpl = `
<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <link rel='stylesheet' href='../../vendor/reveal.js/dist/reveal.css'>
    <link rel='stylesheet' href='../../vendor/reveal.js/dist/theme/black.css'>
    <link rel='stylesheet' href='../../assets/css/custom.css'>
</head>
<body>
    <div class='reveal'>
        <div class='slides'>
            <section data-markdown='content.md' data-separator='^\\r?\\n---\\r?\\n$' data-separator-vertical='^\\r?\\n--\\r?\\n$'></section>
        </div>
    </div>
    <script src='../../vendor/reveal.js/dist/reveal.js'></script>
    <script src='../../vendor/reveal.js/plugin/markdown/markdown.js'></script>
    <script>
        Reveal.initialize({ plugins: [ RevealMarkdown ] });
    </script>
</body>
</html>
`;
fs.writeFileSync('decks/demo/index.html', htmlTpl);

// 8. 写入入口 Index
fs.writeFileSync('index.html', "<h1>My Slides</h1><ul><li><a href='decks/demo/'>Demo</a></li></ul>");

console.log("\n🎉 Scaffolding Complete! Now run:\n  npm install\n  npm run build\n  npm start");