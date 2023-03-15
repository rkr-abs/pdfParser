const { map } = require('@laufire/utils/collection');
const getAllFiles = require('./getAllFiles');
const ObjectsToCsv = require('objects-to-csv');
const {path} = require('./config');
const getDetails = require('./getDetails');

const fileParser = (files) => Promise.all(map(files, getDetails));

const main = async () => {
		const result = await fileParser(getAllFiles(path));
		const csv = new ObjectsToCsv(result);

		console.table(result);
		console.warn('done.');

	return (result);
};

main();

module.exports = fileParser;
