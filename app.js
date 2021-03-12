var html_to_pdf = require('html-pdf-node');

// Use UTC for for all Date parsing
process.env.TZ = 'UTC'

module.exports = robot => {

    
  robot.on(['create','workflow_dispatch','repository_dispatch'], (context)=> {
      console.log(context.payload)
      let options = { format: 'A4',path:process.env.GITHUB_WORKSPACE };

        let file = { content: "<h1>Welcome to html-pdf-node</h1>" };

        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            console.log("PDF Buffer:-", pdfBuffer);
        });
  })
}