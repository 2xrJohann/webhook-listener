const Koa = require('koa');
var Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
var xmlParser = require('xml2json');

const app = new Koa();
var router = new Router();
app.use(bodyParser());

/*app.use(async ctx => {
  ctx.body = 'Hello World';
});*/

router.get('/', (ctx, next) => {
  ctx.body = "webhook swerver!";
});

router.post('/ActivateDataBar', (ctx, next) => {
  consolePrintCarrierCallback(ctx, "Activate Data Bar");
});

router.post('/CancelDataBar', (ctx, next) => {
  consolePrintCarrierCallback(ctx, "Cancel Data Bar");
});

router.post('/CustomBarring', (ctx, next) => {
  consolePrintCarrierCallback(ctx, "Custom Barring");
});

router.post('/PortInCompletion', (ctx, next) => {
  consolePrintMisc(ctx, "Port In Completion");
});

router.post('/PortOutCompletion', (ctx, next) => {
  consolePrintMisc(ctx, "Port Out Completion");
});

router.post('/PortRejected', (ctx, next) => {
  consolePrintCommentStatus(ctx, "Port Rejected");
});

router.post('/Info', (ctx, next) => {
  consolePrintCommentStatus(ctx, "Info");
});

function consolePrintMisc(ctx, name){
  console.log(name);
  console.log("event: " + ctx.request.body.eventtype);
  console.log("clientid: " + ctx.request.body.clientid);
  console.log("phone number: " + ctx.request.body.msn);
  console.log("action: " + ctx.request.body.action);
  console.log("phoneid: " + ctx.request.body.phoneid);
  console.log("---------------------------\n");
}

function consolePrintCommentStatus(ctx, name){
  console.log(name);
  console.log("event: " + ctx.request.body.eventtype);
  console.log("clientid: " + ctx.request.body.clientid);
  console.log("phone number: " + ctx.request.body.msn);
  console.log("action: " + ctx.request.body.action);
  console.log("phoneid: " + ctx.request.body.phoneid);
  console.log("details: " + ctx.request.body.details);  
  console.log("---------------------------\n");
}

function consolePrintCarrierCallback(ctx, name){
  console.log(name);
  console.log("event: " + ctx.request.body.eventtype);
  console.log("clientid: " + ctx.request.body.clientid);
  console.log("phone number: " + ctx.request.body.msn);
  console.log("action: " + ctx.request.body.action);
  console.log("phoneid: " + ctx.request.body.phoneid);
  console.log(xmlParser.toJson(ctx.request.body.details));
  console.log("---------------------------\n");
}

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);