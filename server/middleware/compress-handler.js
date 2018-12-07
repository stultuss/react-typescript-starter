import koaCompress from 'koa-compress';

class CompressHandler {

  register(options) {
    return koaCompress({
      threshold: options.threshold || '100kb',
      flush: require('zlib').Z_BEST_SPEED
    });
  }
}

export default new CompressHandler();
