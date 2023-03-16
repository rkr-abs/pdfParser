const { peek } = require('@laufire/utils/debug');
const {nameRegex} = require('./config');
const getCandidateDetails = require('./docTypes');

const getFileType = (filePath) => filePath.replace(nameRegex, '$2');

const getCandidate = (filePath) =>
	{
		return getCandidateDetails({ type: getFileType(filePath), file: filePath });
	};

module.exports = getCandidate;
