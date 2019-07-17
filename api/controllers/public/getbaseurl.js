module.exports = {


  friendlyName: 'Getbaseurl',


  description: 'Getbaseurl public.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var base = await getBaseUrl();
    console.log("base",base);
    return exits.success();

  }


};
