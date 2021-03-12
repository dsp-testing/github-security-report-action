const probotApp = require('./app')

require('@probot/adapter-github-actions').run(probotApp).catch((error) => {
  console.error(error)
  process.exit(1)
})