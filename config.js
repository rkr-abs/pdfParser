const config = {
	nameRegex: /.*\/(?:Naukri_)?(.*)(?:\[])?\.{1}(pdf|docx?)/,
	phoneRegex: /(?:\+?\d{1,3}[- ]?)?\d{10}/g,
	emailRegex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi,
	path: './Naukri Responses/',
	experienceRegex: /.*\/(?:Naukri_)?(?:.*)\[(.*)\]\.{1}(?:pdf|docx?)/,
};

module.exports = config;
