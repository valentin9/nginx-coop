import RoutInterface from '../interfaces/route';

const ROUTES = {
    home: {
        name: 'home',
        path: '/',
    },
    configList: {
        name: 'configList',
        path: '/configs',
    },
    configDetail: {
        name: 'configDetail',
        path: '/configs/:configName',
    },
};

export { ROUTES };
