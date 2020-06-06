import express from 'express';
import fs from 'fs';
import path from 'path';
import util from 'util';
import os from 'os';
import asyncHandler from 'express-async-handler';
import ConfigParser from "@webantic/nginx-config-parser";

const nginxParser = new ConfigParser();
const app = express();

const readdir = util.promisify(fs.readdir);
const readfile = util.promisify(fs.readFile);

const NGINX_CONFIG_PATH = path.resolve(os.homedir(), '.nginx');

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
    files = files.map(async file => {
        const configString = await readfile(path.resolve(NGINX_CONFIG_PATH, file));
        // let configJson = nginxParser.toJSON(configString, { parseIncludes: false });
        let configJson = nginxParser.readConfigFile(path.resolve(NGINX_CONFIG_PATH, file), { parseIncludes: false });
        console.log(configJson);

        return {
            name: file,
            site: file.slice(0, file.indexOf('.')),
            json: configJson,
            conf: configString,
        };
    });

    res.json(files);
}));

app.listen(3100, () => {
    console.log('Server listening on port 3100!');
});
