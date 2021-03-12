const puppeteer = require('puppeteer-core');

// Use UTC for for all Date parsing
process.env.TZ = 'UTC'

module.exports = function (robot) {
  robot.on(['create', 'workflow_dispatch', 'repository_dispatch'], (context) => {

    context.paylad.alert.affected_package_name
    let html = { content: `
    <html>
    <body>
    <h1>$A new Vulnerability has been found in your dependencies</h1><hr>
    <ul>
      <li>Package name: ${context.paylad.alert.affected_package_name}</li>
      <li>Affected range: ${context.payload.alert.affected_range}
    </ul>
    </body>
    </html>
    ` };

    const fetcher = puppeteer.createBrowserFetcher({ path: process.env.GITHUB_WORKSPACE });

    let outfile = fetcher.download('782078')//TODO need to store and inject this
      .then(revisionInfo => {
        return puppeteer.launch({ args: ['--no-sandbox --disable-setuid-sandbox'], executablePath: revisionInfo.executablePath })
          .then(browser => {
            return browser.newPage()
              .then(page => {
                return page.setContent(html.content)
                  .then(() => {
                    console.log('printing pdf', process.env.GITHUB_WORKSPACE + "/vulnerability-alert.pdf");
                    return page.pdf({ path: process.env.GITHUB_WORKSPACE + "/vulnerability-alert.pdf", format: 'A4' })
                      .then(() => {
                        return browser.close();
                      })
                  })
              })
          })
      })
      .then(() => {
        return '';
      });
  });
}