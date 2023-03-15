const { map } = require('@laufire/utils/collection');
const docTypes = require('./docTypes');
const getAllFiles = require('./getAllFiles');
const ObjectsToCsv = require('objects-to-csv');
const nameRegex = /.*Naukri_(.*)\[.*\.{1}(pdf|docx|doc)/;

const getDetails = async (file) => {
	const extractedDocType = file.replace(nameRegex, '$2');

	const res = await docTypes[extractedDocType](file);

	return res
};

const pdfParser = (files) =>
	Promise.all(map(files, (file) => getDetails(file)));

const main = async () => {
		const result = await pdfParser(getAllFiles("./Naukri Responses/Resume Download"));
		const csv = new ObjectsToCsv(result);
		await csv.toDisk('./test1.csv');
	
		console.log('Saved...');

	return (result);
};

main();

module.exports = pdfParser;
