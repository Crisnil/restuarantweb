module.exports = {

	friendlyName: 'Checkout Mail Sender',

	description: 'Sends Email Upon Checkout to User, Sitneat and Restaurant',

	inputs: {
		orderId: {
			type: 'number',
			required: true
		},
		orders: {
			type: ['ref']
		},
		details: {
			type: {}
		},
		emailAddress: {
			type: 'string'
		}
	},

	exits: {},

	fn: async function (inputs, exits) {

		Mailer.sendWelcomeMail(inputs);  // <= Here we are  using

		return exits.success()

	}

}
