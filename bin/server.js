import config from '../config'
import server from '../server'

const debug = require('debug')('app:bin:server');
const port = config.server_port;
const host = config.server_host;

server.listen(port);
debug(`服务器已经启动： http://${host}:${port}.`);
