module.exports = {


  friendlyName: 'Restaurantlist',


  description: 'Restaurantlist public.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var list = await Restaurant.find({
        select: ['name', 'address','restopic','description','owner','nameTag']
      });
      //sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);

    return exits.success(list);

  }


};
