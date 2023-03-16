const { peek } = require('@laufire/utils/debug');
const { readFileSync } = require('fs');
const { extractRawText } = require('mammoth');
const PDFParser = require('pdf-parse');

const {nameRegex,phoneRegex,emailRegex} = require('./config');

const getMatch = ({text,regex})=> (text.match(regex) || []).join(', ')

const extractCandidate = ({text,file})=>{
  const phoneNumbers = getMatch({text,regex:phoneRegex});
  const emailAddresses =  getMatch({text, regex:emailRegex});
  const name = file.replace(nameRegex, '$1');

  return { name, phoneNumbers, emailAddresses }
}

const docTypes = {
	pdf: {
    fn: ({ file }) => PDFParser(readFileSync(`./${ file }`)),
    prop: 'text',
  },
	docx: {
    fn: ({ file }) => extractRawText({ path: `./${ file }` }),
    prop: 'value',
  },
};

const getCandidateDetails = async (context) => {
  const { type, file } = context;
  peek(type)
  const { fn, prop } = docTypes[type]; 
  const res = await fn(context);

  return extractCandidate({
    text: res[prop],
    file: file,
  })
};

module.exports = getCandidateDetails;