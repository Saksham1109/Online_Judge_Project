const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    console.log(jobId);
    console.log("==================================");
    const outPath = path.join(outputPath, `${jobId}.exe`);
    console.log(outPath);

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeCpp,
};