const fs = require('fs');
const PDFParser = require('pdf-parse');
const mammoth = require('mammoth');
const {nameRegex,phoneRegex,emailRegex} = require('./config');

const getMatch=({res,value,regex})=> (res[value].match(regex)||[]).join(', ')

const docTypes = {
	pdf: async (file) => {
		const dataBuffer = fs.readFileSync(`./${ file }`);
		const res = await PDFParser(dataBuffer);
		const phoneNumbers = getMatch({res,value:'text',regex:phoneRegex});
		const emailAddresses =  getMatch({res,value:'text',regex:emailRegex});
    const name = file.replace(nameRegex, '$1');

		return { name,phoneNumbers, emailAddresses };
	},
	docx: async (file) => {
		const res = await mammoth.extractRawText({ path: `./${ file }` });
		const phoneNumbers = getMatch({res,value:'value',regex:emailRegex});
		const emailAddresses = getMatch({res,value:'value',regex:emailRegex});
    const name = file.replace(nameRegex, '$1');

		

		return {name, phoneNumbers, emailAddresses} ;
	},
	
}

const getDetails = async (file) => {
	const extractedDocType = file.replace(nameRegex, '$2');

	const res = await docTypes[extractedDocType](file);

	return res
};

module.exports = getDetails;
