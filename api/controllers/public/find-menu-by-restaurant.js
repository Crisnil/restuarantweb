module.exports = {


    friendlyName: 'Find menu by restaurant',


    description: '',


    inputs: {
        restoId: {
            type: 'number',
            required: true,
        },
        filtermenucategory: {
            type: 'number'
        },
        filtermenu: {
            type: 'string'
        }
    },


    exits: {

    },


    fn: async function (inputs, exits) {

        const BASE_URL = this.req.baseUrl;
        if (inputs.filtermenucategory){
            var menuList = await Menu.find({
                where: {
                    restaurant: inputs.restoId,
                    name: {
                        'contains': inputs.filtermenu
                    },
                    category: inputs.filtermenucategory || null
                },
                select: ['id', 'name', 'description', 'price', 'available', 'menupic']
            }).populate('category').populate('menuTags');
        }else{
            var menuList = await Menu.find({
                where: {
                    restaurant: inputs.restoId,
                    name: {
                        'contains': inputs.filtermenu
                    }
                },
                select: ['id', 'name', 'description', 'price', 'available', 'menupic']
            }).populate('category').populate('menuTags');
        }
        

        return exits.success(menuList);

        //return exits.success();

    }


};
