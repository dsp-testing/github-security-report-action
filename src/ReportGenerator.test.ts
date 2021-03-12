import { Octokit } from '@octokit/rest';
import { expect } from 'chai';
import Vulnerability from './dependencies/Vulnerability';
import ReportGenerator from './ReportGenerator';
import { getGitHubToken, getSampleSarifDirectory, getTestDirectoryFilePath } from './testUtils';

const TOKEN: string = getGitHubToken();

const SIMPLE_TEST_REPOSITORY = {
  repository: 'octodemo/ghas-reporting',
  sarifReportDir: getSampleSarifDirectory('java', 'detailed')
}

const PM_AS_JAVA = {
  repository: 'peter-murray/advanced-security-java',
  sarifReportDir: getSampleSarifDirectory('peter-murray', 'advanced-security-java')
}

describe('ReportGenerator', function () {

  this.timeout(10 * 1000);

  let tempVuln = Object.assign({createdAt:'',dismisser:{login:'', name:''},dismissedAt:'', dismissReason:'',
  vulnerableManifestFilename:'', vulnerableRequirements:'', vulnerableManifestPath:'', securityVulnerability: { package: {
    ecosystem: '',
    name: ''
  },
  severity: '',
  vulnerableVersionRange: ''} ,
   securityAdvisoryts:'', securityAdvisory:{
    databaseId: '',
    id: '',
    summary: '',
    severity: '',
    description: '',
    ghsaId: '',
    identifiers: {
      type: '',
      value: '',
    },
    permalink: '',
    publishedAt: ''
   }, id:''},{});

  [SIMPLE_TEST_REPOSITORY, PM_AS_JAVA].forEach(config => {
    it(`should generate a report for ${config.repository}`, async () => {
      const generatorConfig = {
        octokit: new Octokit({auth: TOKEN}),
        repository: config.repository,
        vulnAlert:  new Vulnerability(tempVuln),
        sarifReportDirectory: config.sarifReportDir,
        outputDirectory: getTestDirectoryFilePath(config.repository),

        templating: {
          name: 'summary'
        }
      }

      const generator = new ReportGenerator(generatorConfig);
      const file = await generator.run();
      expect(file).to.contain(generatorConfig.outputDirectory);
      //TODO need to store an expected result
    });
  })


});