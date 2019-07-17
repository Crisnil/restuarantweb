/**
 * Module dependencies
 */

// ...


/**
 * owner/add-menu.js
 *
 * Add menu.
 */
module.exports = async function addMenu(req, res) {
  
  sails.log(req);
  var createdMenu = await Menu.create({
    name:req.name,
    description: req.description,
    price:req.price,
    restaurant:req.restoId,
    tags:req.tags,
}
  ).fetch();
  return res.json(createdMenu);

};
