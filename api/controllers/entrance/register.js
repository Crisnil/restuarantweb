const uuidv4 = require('uuid/v4');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = {


  friendlyName: 'Register',


  description: 'Register entrance.',


  inputs: {
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com'
    },
    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    restoName: {
      type: 'string',
      required: true,
      description: 'Full representation of the restaurant name',
      maxLength: 120,
      example: 'Chicken Ati-atihan'
    },

    fullName:  {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    },
    restopic:  {
      type: 'string',
    },
    restopicFileType: {
        type: 'string'
    },
    bank:{
      type:'string'
    },
    bankAccount:{
      type:'string'
    }

  },


  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
  },


  fn: async function (inputs, exits) {

    var newEmailAddress = inputs.emailAddress.toLowerCase();

    var existingUser =  await User.find({
      where: {emailAddress:newEmailAddress},
      select: ['emailAddress']}
    );
    var newUserRecord = {};

    if(existingUser.length<1){
    newUserRecord = await Applicant.create(Object.assign({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      fullName: inputs.fullName,
      restoName:inputs.restoName,
      bank:inputs.bank,
      bankAccount:inputs.bankAccount,
      tosAcceptedByIp: this.req.ip,

    }))
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();
  }else {
      throw 'emailAlreadyInUse';
  //return exits.emailAlreadyInUse();

  }
    let defaultpic = "https://react.semantic-ui.com/images/wireframe/white-image.png"
    if (newUserRecord){
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
        //console.log("newUserRecord",newUserRecord);
        let picLink = inputs.restopic;
        if (picLink){
          let exImgPath = "./assets/"+picLink;
            try{
          fs.unlinkSync(exImgPath);
            }catch(e){}

        newUserRecord = await Applicant.update(newUserRecord.id, {
          restopic: imgPath.replace("assets/", "/"),
        }).fetch();
          }
      }

    return exits.success();

  }


};
