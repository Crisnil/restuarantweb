/**
 * Menu.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      maxLength: 200,
      example: 'Fish Fried'
    },

    description: {
      type: 'string',
      description: 'The definition of the menu',
    },

    price: {
      type: 'string',
      required: true
    },
    menupic:{
      type: 'string',
    },

    restaurant:{
      model:'restaurant'
    },

    category: {
      model: 'menuCategory'
    },

    available: {
      type: 'boolean',
      description: 'Is available? true : false'
    },

    menuTags:{
      collection:'menutag',
      via: 'menu'
    }
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  customToJSON: function() {
    // Return a shallow copy of this record with the password and ssn removed.
    let forReturn = _.clone(this);
    if (this.menupic) {
      forReturn.menupic = !_.includes(this.menupic, sails.config.custom.baseUrl) ? sails.config.custom.baseUrl + this.menupic : this.menupic;
    }
    return forReturn;
  }
};
