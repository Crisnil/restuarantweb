module.exports = {


  friendlyName: 'Add restuarant',


  description: '',


  inputs: {

    name:{
      type:'string',
      required:true,
    },
    description:{
      type:'string',
      
    },
    id: {
      type: 'number',
      required:true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    console.log(inputs);

    var newRestaurant = await Restaurant.create(Object.assign({
      name: inputs.name,
      description: inputs.description,
      owner:inputs.id,
    })).fetch()

    return exits.success(newRestaurant);

  }


};
