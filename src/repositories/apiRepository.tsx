const API_CONFIG_LIST: string = 'http://localhost:3100/nginx-configs';
const API_REQUEST_HEADERS: {[key: string]: string} = { "Content-Type": "application/json; charset=utf-8" };

export default function getList(callback: Function): void
{
  fetch(API_CONFIG_LIST, { headers: API_REQUEST_HEADERS })
    .then(res => res.json())
    .then(response => {
      callback(response);
    })
    .catch(err => {
        console.log(err);
    });
}
