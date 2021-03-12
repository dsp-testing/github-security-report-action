import ReportGenerator from './ReportGenerator';
const github = require('@actions/github');
import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';

async function run(): Promise<void> {
  
  
  let temp_event = {
  "action": "vuln_alert_created",
  "alert": {
    "affected_package_name": "octokit",
    "affected_range": "> 4.10.0",
    "created_at": "2021-03-10T16:11:00Z",
    "external_identifier": "TEST-0000-0004",
    "external_reference": null,
    "ghsa_id": "GHSA-g3h7-8h5v-pvhc",
    "id": 4
  },
  "enterprise": {
    "avatar_url": "http://alambic.github.localhost/avatars/b/1?",
    "created_at": "2021-03-01T07:22:28Z",
    "description": null,
    "html_url": "http://github.localhost/enterprises/github-inc",
    "id": 1,
    "name": "GitHub, Inc",
    "node_id": "MDEwOkVudGVycHJpc2Ux",
    "slug": "github-inc",
    "updated_at": "2021-03-01T07:22:28Z",
    "website_url": null
  },
  "organization": {
    "avatar_url": "http://alambic.github.localhost/avatars/u/3?",
    "description": null,
    "events_url": "http://api.github.localhost/orgs/github/events",
    "hooks_url": "http://api.github.localhost/orgs/github/hooks",
    "id": 3,
    "issues_url": "http://api.github.localhost/orgs/github/issues",
    "login": "github",
    "members_url": "http://api.github.localhost/orgs/github/members{/member}",
    "node_id": "MDEyOk9yZ2FuaXphdGlvbjM=",
    "public_members_url": "http://api.github.localhost/orgs/github/public_members{/member}",
    "repos_url": "http://api.github.localhost/orgs/github/repos",
    "url": "http://api.github.localhost/orgs/github"
  },
  "repository": {
    "archive_url": "http://api.github.localhost/repos/github/hub/{archive_format}{/ref}",
    "archived": false,
    "assignees_url": "http://api.github.localhost/repos/github/hub/assignees{/user}",
    "blobs_url": "http://api.github.localhost/repos/github/hub/git/blobs{/sha}",
    "branches_url": "http://api.github.localhost/repos/github/hub/branches{/branch}",
    "clone_url": "http://github.localhost/github/hub.git",
    "collaborators_url": "http://api.github.localhost/repos/github/hub/collaborators{/collaborator}",
    "comments_url": "http://api.github.localhost/repos/github/hub/comments{/number}",
    "commits_url": "http://api.github.localhost/repos/github/hub/commits{/sha}",
    "compare_url": "http://api.github.localhost/repos/github/hub/compare/{base}...{head}",
    "contents_url": "http://api.github.localhost/repos/github/hub/contents/{+path}",
    "contributors_url": "http://api.github.localhost/repos/github/hub/contributors",
    "created_at": "2021-03-01T07:44:26Z",
    "default_branch": "main",
    "deployments_url": "http://api.github.localhost/repos/github/hub/deployments",
    "description": "Yoosa should follow me now, okeeday?",
    "disabled": false,
    "downloads_url": "http://api.github.localhost/repos/github/hub/downloads",
    "events_url": "http://api.github.localhost/repos/github/hub/events",
    "fork": false,
    "forks": 0,
    "forks_count": 0,
    "forks_url": "http://api.github.localhost/repos/github/hub/forks",
    "full_name": "github/hub",
    "git_commits_url": "http://api.github.localhost/repos/github/hub/git/commits{/sha}",
    "git_refs_url": "http://api.github.localhost/repos/github/hub/git/refs{/sha}",
    "git_tags_url": "http://api.github.localhost/repos/github/hub/git/tags{/sha}",
    "git_url": "git://github.localhost/github/hub.git",
    "has_downloads": true,
    "has_issues": true,
    "has_pages": false,
    "has_projects": true,
    "has_wiki": true,
    "homepage": null,
    "hooks_url": "http://api.github.localhost/repos/github/hub/hooks",
    "html_url": "http://github.localhost/github/hub",
    "id": 1,
    "issue_comment_url": "http://api.github.localhost/repos/github/hub/issues/comments{/number}",
    "issue_events_url": "http://api.github.localhost/repos/github/hub/issues/events{/number}",
    "issues_url": "http://api.github.localhost/repos/github/hub/issues{/number}",
    "keys_url": "http://api.github.localhost/repos/github/hub/keys{/key_id}",
    "labels_url": "http://api.github.localhost/repos/github/hub/labels{/name}",
    "language": null,
    "languages_url": "http://api.github.localhost/repos/github/hub/languages",
    "license": null,
    "merges_url": "http://api.github.localhost/repos/github/hub/merges",
    "milestones_url": "http://api.github.localhost/repos/github/hub/milestones{/number}",
    "mirror_url": null,
    "name": "hub",
    "node_id": "MDEwOlJlcG9zaXRvcnkx",
    "notifications_url": "http://api.github.localhost/repos/github/hub/notifications{?since,all,participating}",
    "open_issues": 0,
    "open_issues_count": 0,
    "owner": {
      "avatar_url": "http://alambic.github.localhost/avatars/u/3?",
      "events_url": "http://api.github.localhost/users/github/events{/privacy}",
      "followers_url": "http://api.github.localhost/users/github/followers",
      "following_url": "http://api.github.localhost/users/github/following{/other_user}",
      "gists_url": "http://api.github.localhost/users/github/gists{/gist_id}",
      "gravatar_id": "",
      "html_url": "http://github.localhost/github",
      "id": 3,
      "login": "github",
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjM=",
      "organizations_url": "http://api.github.localhost/users/github/orgs",
      "received_events_url": "http://api.github.localhost/users/github/received_events",
      "repos_url": "http://api.github.localhost/users/github/repos",
      "site_admin": false,
      "starred_url": "http://api.github.localhost/users/github/starred{/owner}{/repo}",
      "subscriptions_url": "http://api.github.localhost/users/github/subscriptions",
      "type": "Organization",
      "url": "http://api.github.localhost/users/github"
    },
    "private": true,
    "pulls_url": "http://api.github.localhost/repos/github/hub/pulls{/number}",
    "pushed_at": "2021-03-10T16:08:40Z",
    "releases_url": "http://api.github.localhost/repos/github/hub/releases{/id}",
    "size": 0,
    "ssh_url": "ssh://git@localhost:3035/github/hub.git",
    "stargazers_count": 0,
    "stargazers_url": "http://api.github.localhost/repos/github/hub/stargazers",
    "statuses_url": "http://api.github.localhost/repos/github/hub/statuses/{sha}",
    "subscribers_url": "http://api.github.localhost/repos/github/hub/subscribers",
    "subscription_url": "http://api.github.localhost/repos/github/hub/subscription",
    "svn_url": "http://github.localhost/github/hub",
    "tags_url": "http://api.github.localhost/repos/github/hub/tags",
    "teams_url": "http://api.github.localhost/repos/github/hub/teams",
    "trees_url": "http://api.github.localhost/repos/github/hub/git/trees{/sha}",
    "updated_at": "2021-03-10T16:08:42Z",
    "url": "http://api.github.localhost/repos/github/hub",
    "watchers": 0,
    "watchers_count": 0
  },
  "sender": {
    "avatar_url": "http://alambic.github.localhost/avatars/u/3?",
    "events_url": "http://api.github.localhost/users/github/events{/privacy}",
    "followers_url": "http://api.github.localhost/users/github/followers",
    "following_url": "http://api.github.localhost/users/github/following{/other_user}",
    "gists_url": "http://api.github.localhost/users/github/gists{/gist_id}",
    "gravatar_id": "",
    "html_url": "http://github.localhost/github",
    "id": 3,
    "login": "github",
    "node_id": "MDEyOk9yZ2FuaXphdGlvbjM=",
    "organizations_url": "http://api.github.localhost/users/github/orgs",
    "received_events_url": "http://api.github.localhost/users/github/received_events",
    "repos_url": "http://api.github.localhost/users/github/repos",
    "site_admin": false,
    "starred_url": "http://api.github.localhost/users/github/starred{/owner}{/repo}",
    "subscriptions_url": "http://api.github.localhost/users/github/subscriptions",
    "type": "Organization",
    "url": "http://api.github.localhost/users/github"
  }
};
  
  try {
    const token = getRequiredInputValue('token');

    const generator = new ReportGenerator({
      repository: getRequiredInputValue('repository'),
      octokit: new Octokit({auth: token}),

      sarifReportDirectory: getRequiredInputValue('sarifReportDir'),
      outputDirectory: getRequiredInputValue('outputDir'),

      templating: {
        name: 'summary'
      }
    });

    const file = await generator.run();
    console.log(file);
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();

function getRequiredInputValue(key: string): string {
  return core.getInput(key, {required: true});
}
