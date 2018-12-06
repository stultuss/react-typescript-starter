import * as crypto from 'crypto';

class RequestHandler {
  register() {
    return async (ctx, next) => {
      const reqId = crypto.randomBytes(12);
      const reqTime = new Date().getTime();
      ctx.reqId = reqId.toString('hex');
      await next();

      // Koa 剥洋葱
      const consumed = new Date().getTime() - reqTime;
      ctx.set('X-Response-Time', `${consumed}ms`);
      console.log(ctx.reqId, `${ctx.method} ${ctx.url} - ${consumed} ms`);
    };
  };
}

export default new RequestHandler();