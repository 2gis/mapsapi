var fs = require('fs');
var clc = require('cli-color');

var targetFile = '.git/hooks/pre-push';
var sourceFile = '../../hooks/pre-push';

try {
    fs.symlinkSync(sourceFile, targetFile);
} catch(e) {
    if (e.code === 'EEXIST') {
        // на случай если будут обновляться хуки, удаляем
        // существующие и устанавливаем новые
        fs.unlinkSync(targetFile)
        fs.symlinkSync(sourceFile, targetFile);
    } else {
        console.error(clc.red('Error during git hooks installation:'), e.message);
    }
}
