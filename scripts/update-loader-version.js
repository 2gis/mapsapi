const fs = require('fs');
const path = require('path');

// Читаем новую версию из package.json (который мы только что обновили)
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const newVersion = pkg.version;

const loaderPath = path.join(__dirname, '../app/loader.js');

let content = fs.readFileSync(loaderPath, 'utf8');

const regex = /const version = '.*?'/; 

if (regex.test(content)) {
    content = content.replace(regex, `const version = '${newVersion}'`);
    fs.writeFileSync(loaderPath, content);
    console.log(`✅ Версия в loader.js обновлена на ${newVersion}`);
} else {
    console.error('❌ Не удалось найти версию в app/loader.js. Проверьте регулярное выражение в скрипте.');
    process.exit(1);
}