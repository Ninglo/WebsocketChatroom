const Koa = require("koa");
const serve = require("koa-static");
const app = new Koa();

app.use(serve("./web"));

exports.module = app;
