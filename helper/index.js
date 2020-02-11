var execSync = require("child_process").execSync;


var getExecCommandOutput = function (cmd) {
  return execSync(cmd).toString();
};

module.exports = {
  getExecCommandOutput: getExecCommandOutput
};
