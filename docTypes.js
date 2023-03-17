const { readFileSync } = require('fs');
const { extractRawText } = require('mammoth');
const pdfParser = require('pdf-parse');
const {
	nameRegex,
	phoneRegex,
	emailRegex,
	experienceRegex,
} = require('./config');

const getMatch = ({ text, regex }) => (text.match(regex) || []).join(', ');

const extractCandidate = ({ text, file }) => {
	const phoneNumbers = getMatch({ text: text, regex: phoneRegex });
	const emailAddresses = getMatch({ text: text, regex: emailRegex });
	const name = file.replace(nameRegex, '$1');
	const experiences = file.replace(experienceRegex, '$1');

	return { name, phoneNumbers, emailAddresses, experiences };
};

const docTypes = {
	pdf: {
		fn: ({ file }) => pdfParser(readFileSync(`./${ file }`)),
		prop: 'text',
	},
	docx: {
		fn: ({ file }) => extractRawText({ path: `./${ file }` }),
		prop: 'value',
	},
};

const getCandidateDetails = async (context) => {
	const { type, file } = context;
	const { fn, prop } = docTypes[type];
	const res = await fn(context);

	return extractCandidate({
		text: res[prop],
		file: file,
	});
};

module.exports = getCandidateDetails;
