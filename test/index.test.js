const { Probot, ProbotOctokit } = require('probot')
const plugin = require('../app')

process.env.TZ = 'UTC'
process.env.GITHUB_WORKSPACE= '/workspaces/github-security-report-action/'
let event_payload = JSON.parse(JSON.stringify(require('./fixtures/vuln_alert.create.json')))

let robot = new Probot({
  'secret': 'foo',
  githubToken: 'test',
  // Disable throttling & retrying requests for easier testing
  Octokit: ProbotOctokit.defaults({
    retry: { enabled: false },
    throttle: { enabled: false }
  }),
  installation: { id: 13055 }
})

plugin(robot)
robot.receive({id:1,name:"repository_dispatch", payload: event_payload});
    