const fs = require('fs');
const zlib = require('zlib');

const runCompression = function (dirs) {
  dirs.forEach(dir => {
    fs.readdirSync(dir).forEach(file => {
      if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
        var name = file.replace('.', '_original.');
        fs.rename(dir + '/' + file, dir + '/' + name, (err) => {
          if (err) throw err;
          const fileContents = fs.createReadStream(dir + '/' + name);
          fs.exists(dir + '/' + name, (exists) => {
            const fileContents = fs.createReadStream(dir + '/' + name);
            const writeStream = fs.createWriteStream(dir + '/' + file);
            const zip = zlib.createGzip();
            setTimeout(function () {
              console.log('START compress file: ' + file);
              fileContents
                .pipe(zip)
                .on('error', err => console.error(err))
                .pipe(writeStream)
                .on('error', err => console.error(err));
              fs.unlinkSync(dir + '/' + name);
              console.log('END compress file: ' + file);
            }, 500);
          });
        });
      }
    });
  });
};

module.exports = {
  run: runCompression,
};
