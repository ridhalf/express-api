const express = require('express')
const router = express.Router()
const PresenceModel = require('../Models/presence')
const UserModel = require('../Models/users')

const {where} = require("sequelize");


router.get('/',async (req,res)=>{
    const presences = await PresenceModel.findAll()
    res.status(200).json(
        {
            absen : presences
        }
    )
})
router.post('/in', async (req,res)=>{
    const {id, status} = req.body

    //cek apakah users ada atau tidak
    const users = await UserModel.findOne({where:{id:id}})
    if(users !== null){
        const hadir = await PresenceModel.create({
            user_id:id,
            status:status
        })
        res.status(200).json({
            data:hadir,
            msg: "Anda berhasil mengisin presensi"
        })
    }else{
        res.status(400).json({
            error: "Data tidak valid"
        })
    }
})
router.post('/out', async (req,res)=>{
    const {id, status} = req.body

    //cek apakah users ada atau tidak
    const users = await UserModel.findOne({where:{id:id}})
    if(users !== null){
        const hadir = await PresenceModel.create({
            user_id:id,
            status:status
        })
        res.status(200).json({
            data:hadir,
            msg: "Anda berhasil mengisin presensi"
        })
    }else{
        res.status(400).json({
            error: "Data tidak valid"
        })
    }
})
module.exports = router