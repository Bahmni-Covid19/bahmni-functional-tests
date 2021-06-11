"use strict";
var Buffer = require('buffer/').Buffer

function getReceptionistUserName(){
    var encodedUser = process.env.receptionist;
    let user = new Buffer(encodedUser,'base64');
    let decodedUser = user.toString('ascii');
    return decodedUser.split(":")[0]
}

function getReceptionistPassword(){
    var encodedUser = process.env.receptionist;
    let user = new Buffer(encodedUser,'base64');
    let decodedUser = user.toString('ascii');
    return decodedUser.split(":")[1]
}

function randomName(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports={
    randomName:randomName,
    getReceptionistUserName:getReceptionistUserName,
    getReceptionistPassword:getReceptionistPassword
}