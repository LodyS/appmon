const db = require("../models");
const User = db.user;

var jwt = require('jsonwebtoken');
var brcypt = require('bcryptjs');

exports.register = async(request, response)=>{
    const store = User.create({
        name : request.body.name,
        email : request.body.email,
        username : request.body.username,
        password : brcypt.hashSync(request.body.password)
    })

    if(store){
        return response.status(201).send({ message : "User berhasil terdaftar" });
    } else {
        return response.status(500).send({ message : "Gagal simpan user"});
    } 
}