const fs = require('fs');
const path = require('path');
const {v4 : uuid} = require('uuid');


const direCodes = path.join(__dirname,'codes');

if(!fs.existsSync(direCodes))
{
    fs.mkdirSync(direCodes,{recursive:true});
}


const generateFile = async (format,code) => {
    
    const jobId=uuid();
    const fileName = `${jobId}.${format}`;

    const filePath = path.join(direCodes,fileName);
    await fs.writeFileSync(filePath,code);
    return filePath;

};

module.exports = {
    generateFile, 
}