module.exports = {


  friendlyName: 'Createorder',


  description: 'Createorder public.',

  inputs: {

	  totalPrice: {
      type: 'string',
      required: true
    },
	  firstName: {
      type: 'string',
      required: true
    },
	  lastName: {
		  type: 'string',
		  required: true
	  },
	  mobileNumber: {
      type: 'string',
      required: true
    },

    address: {
      type: 'string',
    },

    emailAddress: {
      type: 'string',
      isEmail: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com'
    },

    orderedDateTime:{
      type: "ref",
    },
	date:{
		type: 'string',
	},
	time:{
		type: 'string',
	},

    orders: {
      type: 'ref',
    },
	  restaurantId:{
	  	type:'ref'
	 },
	  restaurant:{type:'string'},
	  ownerMail:{type:'string'}
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let orders = _.clone(inputs.orders);

    var newOrderRecord = await Order.create(Object.assign({
      fullName: inputs.firstName + inputs.lastName ,
      price: _.parseInt(inputs.totalPrice),
      emailAddress:inputs.emailAddress,
      address:inputs.address,
      contact:inputs.mobileNumber,
      orderedDateTime:inputs.orderedDateTime,
		orderedDate:inputs.date,
		orderedTime:inputs.time,
		restaurantid:inputs.restaurantId

    })).fetch();

    for(var order of orders){

      var orderitem = await Orderitem.create(Object.assign({
            orderid:newOrderRecord.id,
            restaurant:order.restaurant,
            menu:order.id,
            qnty:order.pcs
        }));
    }
	let orderdetail = inputs;
	  	orderdetail.tracking	= newOrderRecord.tracking;
	    orderdetail.customer = inputs.firstName + inputs.lastName;
		console.log("orderdetail",orderdetail);
	  Mailer.sendWelcomeMail(orderdetail);
	  Mailer.sendToResto(orderdetail);
	  //Mailer.sendToOwner(orderdetail);

      return exits.success(newOrderRecord);
  }


};
