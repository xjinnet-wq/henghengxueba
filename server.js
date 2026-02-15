const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// 自动获取主机端口
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'users.json');

app.use(express.json());
// 指向存放网页的文件夹
app.use(express.static(path.join(__dirname, 'public_html')));

// API: 登录与读取档案
app.post('/api/login', (req, res) => {
    const { name } = req.body;
    let users = {};
    if (fs.existsSync(DATA_FILE)) {
        users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    const userData = users[name] || { medals: 0 };
    res.json(userData);
});

// API: 保存勋章进度
app.post('/api/save', (req, res) => {
    const { name, medals } = req.body;
    let users = {};
    if (fs.existsSync(DATA_FILE)) {
        users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    users[name] = { medals: medals };
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`🏰 哼哼的 JS 魔法塔已启动！`);
    console.log(`🌐 地址：https://heng.yunying.help/`);
});