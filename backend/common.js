exports.timestamp = function () {
  return new Date(Date.now()).toLocaleString();
}

const fs = require('fs');
const util = require('util');
const filename = 'app.log';
const log_stdout = process.stdout;
const rotate = require('log-rotate');

exports.log = function(d) {
  log_stdout.write('[' + this.timestamp() + '] ' + util.format(d) + '\n');
  fs.appendFile(__dirname + '/logs/' + filename, util.format(d) + '\n', function (err) {
    if (err) throw err;
  });
}

exports.logRotate = function(logFile) {
  rotate(__dirname + '/logs/' + logFile, { count: 9 }, function (err) {
    if (err) throw err;
  });
}

exports.getFilesizeInBytes = function (filename) {
  const stats = fs.statSync(__dirname + '/logs/' + filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}
