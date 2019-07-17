module.exports = {


  friendlyName: 'Getalluser',


  description: 'Getalluser admin.',


  inputs: {
      name:{
        type:'string'
      },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var user = await User.find();

    var applicant = await Applicant.find() ;

    var allusers =_.merge(user,applicant);

    return exits.success(allusers);

  }


};
