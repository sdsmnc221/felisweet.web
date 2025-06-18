// This plugin helps polyfill node-fetch-native for Vercel serverless environment
import nodeFetch from 'node-fetch'

if (process.server) {
  // Polyfill node-fetch-native with node-fetch
  global.fetch = nodeFetch
  global.Headers = nodeFetch.Headers
  global.Request = nodeFetch.Request
  global.Response = nodeFetch.Response

  // Create a fake node-fetch-native module
  // This helps with modules that directly import from node-fetch-native
  if (!global.__NUXT_POLYFILL) {
    global.__NUXT_POLYFILL = true
    const Module = require('module')
    const originalRequire = Module.prototype.require

    Module.prototype.require = function (path) {
      if (path === 'node-fetch-native') {
        return nodeFetch
      }
      return originalRequire.apply(this, arguments)
    }
  }
}
