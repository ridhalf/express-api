const express = require('express')
const router = express.Router()
const UserModel = require('../Models/users')
const {where} = require("sequelize");
const bcrypt = require('bcrypt')


router.get('/',async (req,res)=>{
    const users = await UserModel.findAll()
    res.status(200).json(
        {
            data : users
        }
    )
})
router.post('/',async (req,res)=>{
   const {nama,email,password,alamat,no_hp} = req.body
    if(!nama || !email || !password || !alamat || !no_hp ){
        res.status(400).json({
            status:400,
            msg:'Data belum lengkap'
        })
    }else{
        const cekEmail = await UserModel.findOne({where:{email}})
        try{
            if(cekEmail === null){
                const encryptPass = await bcrypt.hash(password,10)
                const users = await UserModel.create({nama,email,password:encryptPass,alamat,no_hp})
                res.status(200).json(
                    {
                        user:users,
                        msg:"Data berhasil diinput"
                    })
            }else{
                res.status(400).json({
                    status:400,
                    msg:'Email Tersedia'
                })
            }
        }catch (e) {
            res.status(500).json({
                status:500,
                msg:'Masalah Server'
            })
        }
    }



})

router.get('/:id',async (req,res)=>{
    const user = await UserModel.findOne({where:{id:req.params.id}})
    if(user !== null){
        res.status(200).json(
            {
                data:user,
                msg:"Data ditemukan"
            }
        )
    }else{
        res.status(400).json(
            {
                msg:"Data tidak ditemukan"
            }
        )
    }

})
router.put('/',async (req,res)=>{
    const {nama,email,password,alamat,no_hp,id} = req.body

    const userData = await UserModel.findOne({where:{id}})
    const encryptPass = await bcrypt.hash(password,10)
    if(userData.id === id){
        const users = await UserModel.update({nama,email,password:encryptPass,alamat,no_hp},{where:{id}})
        res.status(200).json(
            {
                msg:"Data berhasil diubah"
            })
    }else{
        res.status(400).json({
            error:"Data Invalid"
        })
    }


})

router.delete('/',async (req,res)=>{
    const id = req.body.id
    const userData = await UserModel.findOne({where:{id}})
    if(userData !== null){
        const user = await UserModel.destroy({where:{id}})
        res.status(200).json({
            msg:"User berhasil dihapus"
        })
    }else{
        res.status(400).json({msg:"User tidak ditemukan"})
    }
})

router.post('/login', async (req,res)=>{
    const {password, email} = req.body
    // CEK APAKAH USER ADA BY EMAIL
    const user = await UserModel.findOne({where:{email:email}})
    if(user !== null){
        const compare = await bcrypt.compare(password, user.password)
        if(compare !== false){
            const token = await UserModel.gene
            res.status(200).json({
                user:user,
                msg:"Login Success"
            })
        }else{
            res.status(400).json({
                error:"Password atau Email Salah"
            })
        }
    }else{
        res.status(400).json({
            error:"Password atau Email Salah"
        })
    }
})



module.exports = router

