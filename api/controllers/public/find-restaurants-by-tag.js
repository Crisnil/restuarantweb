module.exports = {


    friendlyName: 'Find restaurants by tag',


    description: '',


    inputs: {
        tag: {
            type: 'string'
        }
    },


    exits: {

    },


    fn: async function (inputs, exits) {
        let filterName = inputs.tag
        let tagList = await Tags.find({
            where: {
                name: {
                    'contains': filterName
                }
            },
            select: ['id']
        });
        

        let tagIds = _.map(tagList, (tl) => {
            return tl.id
        })

        let inTagIds = _.isEmpty(tagIds) ? null : tagIds.join(",")
        sails.log('inTagIds', inTagIds)

        let menuList = await sails.sendNativeQuery(`SELECT m.* FROM menu m LEFT JOIN menutag mt ON mt.menu = m.id WHERE mt.tag IN (${inTagIds}) OR m.name LIKE '%${filterName}%' OR m.description LIKE '%${filterName}%'`);
        
        let menuIds = []
        if (!_.isEmpty(menuList.rows)) {
            sails.log("menuList", menuList.rows)

            menuIds = _.map(menuList.rows, (menu, idx) => {
                return menu.id
            })
        }

        sails.log("menuIds", menuIds)


        let inMenuIds = _.isEmpty(menuIds) ? null : menuIds.join(",")
        sails.log('inMenuIds', inMenuIds)

        let restaurantList = await sails.sendNativeQuery(`SELECT r.* FROM restaurant r LEFT JOIN menu m ON m.restaurant = r.id WHERE m.id IN (${inMenuIds}) OR r.name LIKE '%${filterName}%' OR r.description LIKE '%${filterName}%' GROUP BY r.id`);

        let forReturn = _.isEmpty(restaurantList)?[]:restaurantList.rows;
        return exits.success(forReturn);

        //return exits.success();

    }


};
