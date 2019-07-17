module.exports = {


  friendlyName: 'Findmenubyname',


  description: 'Findmenubyname public.',


  inputs: {
    filtermenu: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
      var menuList = await Menu.find({
        where: {
          name: {
            'contains': inputs.filtermenu
          },
        },
        select: ['id', 'name', 'description', 'price', 'available', 'menupic']
      }).populate('category').populate('menuTags');


    return exits.success(menuList);
  }
};
