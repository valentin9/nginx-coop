import express from 'express';
import fs from 'fs';
import path from 'path';
import util from 'util';
import os from 'os';
import asyncHandler from 'express-async-handler';

const readdir = util.promisify(fs.readdir);
const app = express();
const NGINX_CONFIG_PATH = path.resolve(os.homedir(), '.nginx');

console.log(NGINX_CONFIG_PATH);


async function getConfigs(configFolderPath) {
    let list = await readdir(configFolderPath);
    list = list.filter(file => file.indexOf('.conf') > -1);

    return list;
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/nginx-configs-list', asyncHandler(async (req, res) => {
    let files = await getConfigs(NGINX_CONFIG_PATH);
    res.json(files);
}));

app.listen(3100, () => {
    console.log('Example app listening on port 3100!');
});
