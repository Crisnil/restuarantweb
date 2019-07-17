/**
 * Order.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const uuidv4 = require('uuid/v4');

module.exports = {
  attributes: {
	  restaurantid: {
		  model:'restaurant',
		  required: true,
	  },

		fullName: {
		  type: 'string',
		  required: true,
		  maxLength: 200,
		},
		price: {
		  type: 'string',
		  required: true
		},
		contact: {
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

		orderlist: {
		  collection: 'orderitem',
		  via: 'orderid'
		},
		orderedDateTime:{
		  type: "ref",
		  columnType: "datetime"
		},
		  orderedDate:{
			  type: "string"
		},
		  orderedTime:{
			  type: "string"
		},
	    completed: { type: 'boolean', defaultsTo: false, },

		tracking: { type: 'string',isUUID:true},

  },
  beforeCreate: function (modelObj, next) {
    modelObj.tracking = uuidv4();
    next();
  } ,

};
