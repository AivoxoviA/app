const c = require('chalk');
const d = require('dayjs');
let LOG_PREFIX = c.cyanBright.bold("DEBUG");

const log = function() {
  let args = Array.prototype.slice.call(arguments);
  let now = d().format(' HH:mm:ss ');
  now = c.bgGray.black(now);
  args.unshift(`${now} ${LOG_PREFIX} |`);
  console.log.apply(console, args);
  LOG_PREFIX = c.cyanBright.bold("DEBUG");
};
log.info = function() {
  LOG_PREFIX = c.greenBright.bold(`INFO`);
  let args = Array.prototype.slice.call(arguments);
  log.apply(null, args);
};

module.exports = log;
