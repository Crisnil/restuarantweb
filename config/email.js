module.exports.email = {
	service: "SendGrid",
	auth: {
		user: "demogenome",
		pass: "mahiraphulaan1"
	},
	templateDir: "api/emailTemplates",
	from: "orders@sitneat.com",
	testMode: false,
	ssl: true
}
