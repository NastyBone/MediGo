const fs = require('fs');
const https = require('https');
const exec = require('child_process').exec;
const version = '3.0.31';
const downloadPath = 'openapi-generator';

function execute() {
  const args = process.argv.slice(2).join(' ');
  const cmd = `java -jar ./${downloadPath}/swagger-codegen-cli-${version}.jar ${args}`;

  exec(cmd, (error, stdout) => {
    console.log(stdout);
    if (error !== null) {
      console.log('Error -> ' + error);
    }
  });
}

function download(ver) {
  fs.mkdirSync(`${__dirname}/${downloadPath}`, { recursive: true });
  console.log(`Downloading swagger-codegen-cli-${ver}.jar`);
  const url = `https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/${ver}/swagger-codegen-cli-${ver}.jar`;
  https.get(url, (res) => {
    const path = `${__dirname}/${downloadPath}/swagger-codegen-cli-${ver}.jar`;
    const filePath = fs.createWriteStream(path, {});
    res.pipe(filePath);
    filePath.on('finish', () => {
      filePath.close();
      console.log('Download Completed');
      execute();
    });
  });
}

if (fs.existsSync(`./${downloadPath}/swagger-codegen-cli-${version}.jar`)) {
  execute();
} else {
  download(version);
}
