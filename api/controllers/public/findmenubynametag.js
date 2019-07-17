module.exports = {


  friendlyName: 'Findmenubynametag',


  description: 'Findmenubynametag public.',


  inputs: {
      nameTag: {
          type: 'string',
          required: true,
      },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var menuList = await Restaurant.findOne({
        where: { nameTag: inputs.nameTag }
    }).populate('menus');

    var owner = await User.findOne({
		where: {id:menuList.owner},
	})
	  menuList.fullname = owner.fullName
	  menuList.ownerMail = owner.emailAddress;
      menuList.bank = owner.bank;
      menuList.bankAccount = owner.bankAccount;
	 console.log(menuList);
    return exits.success(menuList);

  }


};
