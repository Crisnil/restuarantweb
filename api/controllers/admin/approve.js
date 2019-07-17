var addRestuarant = require('./addRestuarant');

module.exports = {


  friendlyName: 'Approve',


  description: 'Approve admin.',


  inputs: {
      id:{
        required:true,
        type: 'number'
      }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var applicant = await Applicant.findOne({
      id: inputs.id
    });

    var newUser = await User.create(Object.assign({
      emailAddress: applicant.emailAddress,
      password: applicant.password,
      fullName: applicant.fullName,
      isSuperAdmin: 0,
      hasBillingCard: applicant.hasBillingCard,
      emailStatus: applicant.emailStatus,
      bank:applicant.bank,
      bankAccount:applicant.bankAccount
    })).fetch();

    var newRestaurant = await Restaurant.create(Object.assign({
      name: applicant.restoName,
      description: applicant.description,
      owner: newUser.id,
      restopic:applicant.restopic,
    })).fetch();

    var approveApplicant = await Applicant.destroy({id: inputs.id}).fetch();

    return exits.success();

  }


};
