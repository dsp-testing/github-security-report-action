const puppeteer = require('puppeteer-core');

// Use UTC for for all Date parsing
process.env.TZ = 'UTC'

module.exports = function (robot) {
  robot.on(['create', 'workflow_dispatch', 'repository_dispatch'], (context) => {
    let html = { content: '' };
    if (context.payload.hasOwnProperty("alert")) {
      html = {
        content: `
    <html>
    <body>
    <h1>A new Vulnerability has been found in your dependencies</h1><hr>
    <img sec="https://redmonk.com/rstephens/files/2018/08/business.jpg" style="float:left;"/>
    <ul style="float:left;">
      <li>Package name: ${context.paylad.alert.affected_package_name}</li>
      <li>Affected range: ${context.payload.alert.affected_range}</li>
      <li>Vuln created as: {context.payload.alert.created_at}</li>
    </ul>
    </body>
    </html>
    ` };
    } else {
      html = {
        content: `
      <html>
      <body>
      <h1>A new Vulnerability has been found in your dependencies</h1><hr>
      <img sec="https://redmonk.com/rstephens/files/2018/08/business.jpg" style="float:left;"/>
      <ul style="float:left;">
        <li>Package name: data-tbd</li>
        <li>Affected range: tbd</li>
      </ul>
      </body>
      </html>
      ` };
    }

    const fetcher = puppeteer.createBrowserFetcher({ path: process.env.GITHUB_WORKSPACE });

    fetcher.download('782078')//TODO need to store and inject this
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