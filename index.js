const fs = require('fs');
const zlib = require('zlib');
var execCommand = require("./helper/exec-command");

const runCompression = function (dirs) {
  dirs.forEach(dir => {
    fs.readdirSync(dir).forEach(file => {
      if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
        var name = file.replace('.', '_original.');
        console.log('Compress file: ' + file);
        var command = "mv " + dir + '/' + file + " " + dir + '/' + name;
        execCommand(command);
        const fileContents = fs.createReadStream(dir + '/' + name);
        const writeStream = fs.createWriteStream(dir + '/' + file);
        const zip = zlib.createGzip();
        fileContents
          .pipe(zip)
          .on('error', err => console.error(err))
          .pipe(writeStream)
          .on('error', err => console.error(err));
        fs.unlinkSync(dir + '/' + name);
      }
    })
  });
};

module.exports = {
  run: runCompression,
};
