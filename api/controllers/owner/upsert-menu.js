const uuidv4 = require('uuid/v4');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = {


  friendlyName: 'Upsert menu',


  description: '',


  inputs: {
    id: {
      type: 'string',
      required: false,
      example: '1'
    },

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

    menupic: {
      type: 'string'
    },

    menupicFileType: {
      type: 'string'
    },

    restoId:{
      model:'restaurant',
      type:'ref'
    },

    category: {
      model: 'menuCategory',
      type: 'ref'
    },

    available:{
      type: 'boolean',
    },

    menuTags:{
      collection:'menutag',
      via:'menu',
      type:'ref'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var newMenuRecord = null
    if (inputs.id){
      var menu = await Menu.findOne({
        id: inputs.id
      });
      if(menu){
        newMenuRecord = await Menu.update(menu, Object.assign({
          id: menu.id,
          name: inputs.name || menu.name,
          description: inputs.description || menu.description,
          price: inputs.price ? _.parseInt(inputs.price) : _.parseInt(menu.name),
          restaurant: inputs.restoId || menu.restoId,
          category: inputs.category || menu.category,
          // menuTags: inputs.menuTags || menu.menuTags,
          available: _.isUndefined(inputs.available) ? menu.available : inputs.available
        })).fetch()
      }
    }else{
      newMenuRecord = await Menu.create(Object.assign({
        name: inputs.name,
        description: inputs.description,
        price: _.parseInt(inputs.price),
        restaurant: inputs.restoId,
        category: inputs.category,
        // menuTags: inputs.menuTags,
        available: inputs.available || true
      })).fetch()
    }

    // sails.log("newMenuRecord", newMenuRecord)
    if (newMenuRecord && inputs.menupicFileType){
      let fileType = inputs.menupicFileType || 'png'
      var base64Data = inputs.menupic.replace(/^data:image\/\w+;base64,/, "");
      
      var dirPath = "assets/images/menu/"

      try {
        mkdirp.sync(dirPath, 0755);
      } catch (e) {
        console.log("error mkdir", e);
      }

      var imgPath = dirPath + uuidv4() + `.${fileType}`;
      var uploadSuccess = false;
      await fs.writeFile(imgPath, base64Data, 'base64', function (err) {
        if (err) {
          console.log("error", err);
        } else {
          uploadSuccess = true;
        }
      });

      if (!_.isEmpty(newMenuRecord)){
        let menuToUpdateData = newMenuRecord[0] ? newMenuRecord[0] : newMenuRecord
        let picLink = menuToUpdateData.menupic || null;
        if (picLink){
          let exImgPath = "./assets/"+picLink;
          try{
            fs.unlinkSync(exImgPath);
          }catch(e){}
        }

        // if (newMenuRecord.id){
          newMenuRecord = await Menu.update(menuToUpdateData.id, {
            menupic: imgPath.replace("assets/", "/"),
          }).fetch();
        // }
      }
    }

    if (inputs.menuTags){
      let menuId = newMenuRecord.id
      if(_.isArray(newMenuRecord)){
        menuId = newMenuRecord[0].id
      }
      var menuTagList = await MenuTag.find({
        where: {
          menu: menuId
        },
        select: ['id', 'tag']
      });

      for (var tag of inputs.menuTags) {
        if (_.findIndex(menuTagList, (mtl) => {
          return mtl.tag == tag
        }) == -1){
          await MenuTag.create(Object.assign({
            menu: menuId,
            tag,
          }));
        }
      }

      var menuToDeleteList = await MenuTag.find({
        where: {
          menu: menuId,
          tag: { '!': inputs.menuTags }
        },
        select: ['id']
      });

      for (var mdl of menuToDeleteList) {
        await MenuTag.destroy({
          id: mdl.id
        });
      }
    }

    return exits.success(newMenuRecord);
  },
};
