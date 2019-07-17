module.exports.sendWelcomeMail = function (obj) {
	sails.hooks.email.send(
		"checkoutMail",
		{
			name:obj.emailAddress,
			tracking:obj.tracking,
			totalPrice:obj.totalPrice,
			restuarant:obj.name,
			orders:obj.orders,
			restaurant:obj.restaurant,
			date:obj.date,
			time:obj.time

		},
		{
			to:obj.emailAddress,
			subject: "Order Confirmation"
		},
		function (err) {
			console.log(err || "Mail Sent!");
		}
	)
}
module.exports.sendToResto = function (obj) {
	console.log("obj",obj);
	sails.hooks.email.send(
		"orderMail",
		{	costumer:obj.customer,
			mobileNumber:obj.mobileNumber,
			emailAddress:obj.emailAddress,
			tracking:obj.tracking,
			totalPrice:obj.totalPrice,
			orders:obj.orders,
			restaurant:obj.restaurant,
			address:obj.address,
			date:obj.date,
			time:obj.time
		},
		{
			to: obj.ownerMail,
			subject: "Order Notification"
		},
		function (err) {
			console.log(err || "Mail Sent!");
		}
	)
}
module.exports.sendToOwner = function (obj) {
	sails.hooks.email.send(
		"ownerMail",
		{
			costumer:obj.customer,
			mobileNumber:obj.mobileNumber,
			emailAddress:obj.emailAddress,
			tracking:obj.tracking,
			totalPrice:obj.totalPrice,
			orders:obj.orders,
			restaurant:obj.restaurant,
			address:obj.address,
			date:obj.date,
			time:obj.time
		},
		{
			to: "annefloresa@gmail.com",
			subject: "Order Notification"
		},
		function (err) {
			console.log(err || "Mail Sent!");
		}
	)
}
