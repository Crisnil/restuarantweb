/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // getAllOrdersByRestaurant: async function(req, res) {
    //     const restoFilter = req.params.filter || "";
    //     const restoList = await Restaurant.find().where({ name: { contains: restoFilter } })
    //     let forReturn = _.map(restoList, async (resto, idx) => {
    //         let orders = await Order.find().where({
    //             restaurant: resto.id
    //         })
    //
    //         resto.orders = orders;
    //     })
    //
    //     return res.json(forReturn);
    // }
};
