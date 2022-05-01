const c = require('chalk');
const d = require('dayjs');

const LOG_DEBUG = c.cyanBright.bold(`DEBUG`);
const LOG_INFO  = c.greenBright.bold(`INFO`);
const LOG_WARN  = c.yellowBright.bold(`WARNING`);
const LOG_ERROR = c.redBright.bold(`ERROR`);

let prefix = LOG_DEBUG;

const log = function() {
  let args = Array.prototype.slice.call(arguments);
  let now = d().format(' HH:mm:ss ');
  now = c.bgGray.black(now);
  args.unshift(`${now} ${prefix} |`);
  console.log.apply(console, args);
  prefix = LOG_DEBUG;
};
log.info = function() {
  prefix = LOG_INFO;
  let args = Array.prototype.slice.call(arguments);
  log.apply(null, args);
};
log.warn = function() {
  prefix = LOG_WARN;
  let args = Array.prototype.slice.call(arguments);
  log.apply(null, args);
};
log.error = function() {
  prefix = LOG_ERROR;
  let args = Array.prototype.slice.call(arguments);
  log.apply(null, args);
};

module.exports = log;
