const fs = require('fs');
const PDFParser = require('pdf-parse');
const mammoth = require('mammoth');

const phoneRegex = /(?:\+?\d{1,3}[- ]?)?\d{10}/g;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi;
const nameRegex = /.*Naukri_(.*)\[.*\.{1}(pdf|docx|doc)/;

const docTypes = {
	pdf: async (file) => {
		const dataBuffer = fs.readFileSync(`./${ file }`);
		const res = await PDFParser(dataBuffer);
		const phoneNumbers = (res.text.match(phoneRegex)||[]).join(', ');
		const emailAddresses = (res.text.match(emailRegex)||[]).join(', ');
    const name = file.replace(nameRegex, '$1');

		return { name,phoneNumbers, emailAddresses };
	},
	docx: async (file) => {
		const res = await mammoth.extractRawText({ path: `./${ file }` });
		const phoneNumbers = (res.value.match(phoneRegex)|| []).join(', ');
		const emailAddresses = (res.value.match(emailRegex)||[]).join(', ');
    const name = file.replace(nameRegex, '$1');

		

		return {name, phoneNumbers, emailAddresses} ;
	},
	
}

module.exports = docTypes;