/**
 * Restautrant.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:'string',
      required:true,
    },
    description:{
      type:'string',

    },
    address:{
      type:'string',
    },
    menus:{
      collection:'menu',
      via:'restaurant'
    },
    ordersItems: {
      collection: 'orderitem',
      via: 'restaurant'
    },
    owner:{
      model:'user'
    },
    restopic:{
      type: 'string',
    },

    featured: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Is feature in frontpage? true : false'
    },
    nameTag:{
      type: 'string',
    },

  },
  beforeCreate: function (modelObj, next) {
    var res = modelObj.name.replace(/\s/g,'-');
    modelObj.nameTag = res;
    next();
  },

  customToJSON: function() {
    // Return a shallow copy of this record with the password and ssn removed.
    let forReturn = _.clone(this);
    console.log("base",sails.config.custom.baseUrl,"menu",this.restopic);
    if(this.restopic){
      forReturn.restopic = !_.includes(this.restopic, sails.config.custom.baseUrl) ? sails.config.custom.baseUrl + this.restopic : this.restopic;
    }
    return forReturn;
  }

};
