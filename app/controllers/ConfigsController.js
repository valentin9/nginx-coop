import path from 'path';
import os from 'os';
import fs from 'fs';
import util from 'util';
import ConfigParser from "@webantic/nginx-config-parser";
const nginxParser = new ConfigParser();

const readdir = util.promisify(fs.readdir);
const readfile = util.promisify(fs.readFile);

const NGINX_CONFIG_PATH = path.resolve(os.homedir(), '.nginx');

async function _getParsedConfigs(files) {
    const parsedFiles = await Promise.all(files.map(async file => {
        const configFile = await readfile(path.resolve(NGINX_CONFIG_PATH, file));
        const configJson = nginxParser.readConfigFile(path.resolve(NGINX_CONFIG_PATH, file), {
            parseIncludes: false
        });
        console.log(configJson);
        console.log(path.resolve(NGINX_CONFIG_PATH, file));

        return {
            name: file,
            site: file.slice(0, file.indexOf('.')),
            json: configJson,
            conf: configFile.toString(),
        };
    }));

    return parsedFiles;
}

async function _getConfigFiles(configFolderPath) {
    let list = await readdir(configFolderPath);
    list = list.filter(file => file.indexOf('.conf') > -1);

    return list;
}

export async function getList(req, res) {
    let files = await _getConfigFiles(NGINX_CONFIG_PATH);
    const parsedFiles = await _getParsedConfigs(files);

    res.json(parsedFiles);
}
