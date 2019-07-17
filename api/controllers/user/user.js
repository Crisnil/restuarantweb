module.exports = {


  friendlyName: 'User',


  description: 'User user.',


  inputs: {
    userId: {
      type: 'number',
      required: true,
      },
  },


  exits: {

  },



    fn: async function (inputs, exits) {


      var user = await User.find({
          where: {id:inputs.userId},
          select: ['fullName','emailAddress', 'price']
        });

       return exits.success(user);

      //return exits.success();

    }

};
