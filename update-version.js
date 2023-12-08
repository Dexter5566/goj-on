// update-version.js

const fs = require('fs');
const { execSync } = require('child_process');

// 获取当前日期
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // 月份从 0 开始，需要加 1

// 读取 package.json 文件
const packageJsonPath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 检查上次版本号中的年份和月份
const lastVersion = packageJson.version.split('.');
const lastYear = parseInt(lastVersion[0], 10);
const lastMonth = parseInt(lastVersion[1], 10);

// 如果当前年份或月份与上次版本号不一致，将 patch 设置为 00
if (year !== lastYear || month !== lastMonth) {
    packageJson.version = `${year}.${month}.00`;
} else {
    // 否则，递增 patch
    const lastPatch = parseInt(lastVersion[2], 10);
    packageJson.version = `${year}.${month}.${lastPatch + 1}`;
}

// 将更新后的版本号写回 package.json 文件
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Version updated to:', packageJson.version);

// 提交更改并包含版本号
execSync(`git add package.json`);
execSync(`git commit -m "Update version - ${packageJson.version}"`);
execSync(`git push`);
