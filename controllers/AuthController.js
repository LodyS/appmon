const db = require("../models");
const User = db.user;
const config = require("../config/authConfig");
var jwt = require('jsonwebtoken');
var brcypt = require('bcryptjs');
const tokenBlacklist = db.tokenBlacklist;

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

exports.login = async(request, response)=>{
    const cek = await User.findOne({
        where : {
            username : request.body.username
        }
    })

    if(!cek){
        return response.status(404).send({ message : "User tidak ada"});
    }

    var kredenesialValid = brcypt.compareSync(request.body.password, cek.password);

    if(!kredenesialValid){
        return response.status(403).send({ message : "User tidak valid"});
    } else {
        const token = jwt.sign({id:cek}, config.secret,{
            algorithm: 'HS256',
            allowInsecureKeySizes:true,
            expiresIn:86400,
        });

        await tokenBlacklist.create({
            token : token,
            user_id : request.userId
        })
    
        response.status(200).send({
            id : cek.id,
            username : cek.username,
            email : cek.email,
            accessToken : token
        });
    }
}

exports.logout = async(request, response)=>{
    let token = request.headers['x-access-token'];
    
    if(!token){
        return response.status(403).send({ message : 'Tidak ada token yang valid'});
    }

    //let cek_token = await tokenBlacklist.findOne({
        //where : {
        //    token : token
      //  }
    //})

    //if(!cek_token){
      //  return response.status(400).send({ message : 'Token tidak valid'});
    //} else {
        
        let hapus_token = await tokenBlacklist.destroy({
            where : {
                token : token
            }
        });

        return response.status(200).send({ message : "Berhasil logout"});
    //}
}