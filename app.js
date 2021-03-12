const puppeteer = require('puppeteer-core');

// Use UTC for for all Date parsing
process.env.TZ = 'UTC'

module.exports = robot => {
  robot.on(['create', 'workflow_dispatch', 'repository_dispatch'], (context) => {

    let html = { content: "<h1>Welcome to html-pdf-node</h1>" };

    const fetcher = puppeteer.createBrowserFetcher({ path: process.env.GITHUB_WORKSPACE });

    let outfile = fetcher.download('782078')//TODO need to store and inject this
      .then(revisionInfo => {
        return puppeteer.launch({ args: ['--no-sandbox --disable-setuid-sandbox'], executablePath: revisionInfo.executablePath })
          .then(browser => {
            return browser.newPage()
              .then(page => {
                return page.setContent(html.content)
                  .then(() => {
                    console.log('printing pdf', process.env.GITHUB_WORKSPACE+"vuln-output-puppeteer.pdf");
                    //let tempfile = page.pdf({ path: process.env.GITHUB_WORKSPACE+"vuln-output-puppeteer.pdf", format: 'A4' })
                  });
              })
              .then(() => {
                return browser.close();
              });
          })
          .then(() => {
            return '';
          });
      });
  });
}