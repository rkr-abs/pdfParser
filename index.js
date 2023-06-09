const { map } = require('@laufire/utils/collection');
const ObjectsToCsv = require('objects-to-csv');

const { path } = require('./config');
const getAllFilesPath = require('./getAllFilesPath');
const getCandidate = require('./getDetails');

const getCandidates = (paths) => Promise.all(map(paths, getCandidate));

const main = async () => {
	const candidates = await getCandidates(getAllFilesPath(path));
	const csv = new ObjectsToCsv(candidates);

	console.log(await csv.toString());
};

main();
