// Workaround for environments where Node's os.networkInterfaces() throws:
// SystemError: uv_interface_addresses returned Unknown system error 1
//
// webpack-dev-server calls os.networkInterfaces() during startup to compute
// local hosts. Returning an empty object is sufficient for dev server use.

const os = require('os');

try {
  os.networkInterfaces();
} catch (_err) {
  os.networkInterfaces = () => ({});
}

