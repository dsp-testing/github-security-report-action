const probotApp = require('./app')

if (process.env.GITHUB_ACTIONS) {
  require('@probot/adapter-github-actions').run(actionApp).catch((error) => {
    console.error(error)
    process.exit(1)
  })
}