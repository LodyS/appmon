const { authJwt } = require("../middleware");
const db = require("../models");
const RequestUser = db.requestUser;
const sequelize = require("sequelize");

exports.index = async(request, response)=>{
    const data = await RequestUser.findAll();

    response.status(200).send({ message : "Daftar permintaan APPMON", data : data});
}

exports.show = async(request, response)=>{
    const data = await RequestUser.findAll({ 
        where : {
            id : request.params.id 
        }
    });

    response.status(200).send({ message : 'Detail permintaan APPMON', data : data});
}

exports.store = async(request, response)=>{
    const save = await RequestUser.create({
        media : request.body.media,
        unit : request.body.unit,
        application : request.body.application,
        type : request.body.type,
        detail : request.body.detail
    });

    if(save){
        response.status(201).send({ message : 'Berhasil kirim permintaan APPMON'});
    } else {
        response.status(500).send({ message : "Gagal kirim permintaan APPMON"});
    }
};

exports.update = async(request, response)=>{
    const update = await RequestUser.update({
        status : request.body.status,
        end : request.body.end,
        notes : request.body.notes,
        pic : request.userId,
        start : sequelize.literal("CURRENT_TIMESTAMP"),
    },{
        where : {
            id : request.params.id
        }
    });

    if(update){
        response.status(201).send({ message : 'Berhasil update permintaan APPMON'});
    } else {
        response.status(500).send({ message : "Gagal update permintaan APPMON"});
    } 
}

exports.doneTask = async(request, response)=>{
    const update = await RequestUser.update({
        end : sequelize.literal("CURRENT_TIMESTAMP")
    },{
        where : {
            id : request.params.id
        }
    })

    if(update){
        response.status(200).send({ message : "Berhasil update permintaan APPMON" });
    } else {
        response.status(500).send({ message : "Gagal update permintaan APPMON"});
    }
}