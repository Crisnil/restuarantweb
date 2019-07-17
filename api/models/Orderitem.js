/**
 * Order_item.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const uuidv4 = require('uuid/v4');
module.exports = {

   tableName: 'order_items',

   attributes: {

    OrderItemKey: { type: 'string',isUUID:true},

     orderid:{
       model:'order',
       required: true,
     },
     restaurant: {
       model: 'restaurant',
       required: true,
     },

     menu: {
       model: 'menu',
       required: true,
     },
     qnty:{
       type:'number'
     },
	 completed: { type: 'boolean', defaultsTo: false, }

  },
  beforeCreate: function (modelObj, next) {
    modelObj.OrderItemKey = uuidv4();
    next();
}

};
