import path from 'path';
import os from 'os';
import fs from 'fs';
import util from 'util';
import ConfigParser from "@webantic/nginx-config-parser";
const nginxParser = new ConfigParser();

const readdir = util.promisify(fs.readdir);
const readfile = util.promisify(fs.readFile);

const NGINX_CONFIG_PATH = path.resolve(os.homedir(), '.nginx');

export async function getList(req, res) {
   let files = await getConfigs(NGINX_CONFIG_PATH);
   files = files.map(async file => {
       const configString = await readfile(path.resolve(NGINX_CONFIG_PATH, file));
       const configJson = nginxParser.readConfigFile(path.resolve(NGINX_CONFIG_PATH, file), {
           parseIncludes: false
       });
       console.log(configJson);
       console.log(path.resolve(NGINX_CONFIG_PATH, file));

       return {
           name: file,
           site: file.slice(0, file.indexOf('.')),
           json: configJson,
           conf: configString,
       };
   });

   Promise.all(files).then(() => {
       res.json(files);
   });
}

async function getConfigs(configFolderPath) {
    let list = await readdir(configFolderPath);
    list = list.filter(file => file.indexOf('.conf') > -1);

    return list;
}
