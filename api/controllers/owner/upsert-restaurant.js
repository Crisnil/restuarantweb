const uuidv4 = require('uuid/v4');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = {


    friendlyName: 'Upsert restaurant',


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
            description: 'The description of the restaurant',
        },

        address: {
            type: 'string'
        },

        restopic: {
            type: 'string'
        },

        restopicFileType: {
            type: 'string'
        },

        tags: {
            collection: 'tag',
            via: 'tagowner',
            type: 'ref'
        }
    },


    exits: {

    },


    fn: async function (inputs, exits) {
        var newRestoRecord = null
        if (inputs.id) {
            var resto = await Restaurant.findOne({
                id: inputs.id
            });
            if (resto) {
                newRestoRecord = await Restaurant.update(resto, Object.assign({
                    id: resto.id,
                    name: inputs.name || resto.name,
                    description: inputs.description || resto.description,
                    address: inputs.address || resto.address,
                    tags: inputs.tags || resto.tags
                })).fetch()
            }
        } else {
            newRestoRecord = await Restaurant.create(Object.assign({
                name: inputs.name,
                description: inputs.description,
                address: _.parseInt(inputs.price),
                tags: inputs.tags,
            })).fetch()
        }

        // sails.log("newRestoRecord", newRestoRecord)
        if (newRestoRecord) {
            let fileType = inputs.restopicFileType || 'png'
            var base64Data = inputs.restopic.replace(/^data:image\/\w+;base64,/, "");
            var dirPath = "assets/images/restaurant/"

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

            // if(uploadSuccess){
            let picLink = newRestoRecord[0].restopic;
            if (picLink) {
                let exImgPath = "./assets/" + picLink;
                fs.unlinkSync(exImgPath);
            }
            newRestoRecord = await Restaurant.update(newRestoRecord[0].id, {
                restopic:imgPath.replace("assets/", "/"),
            }).fetch();
            // }
        }

        return exits.success(newRestoRecord);
    },
};
