import pool from '../configs/connectDB';

const bcrypt = require('bcrypt');
const saltRounds = 255;


function hash_password(password){

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

let getAllUsers = async (req, res) => {
    //http
    // 404 501
    // json/xml => object
    const [rows, fields] = await pool.execute('SELECT * FROM login');
    console.log(rows)
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { username, password } = req.body;


    if (!username || !password ) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    // let pass = hash_password(password)
    // console.log(pass);
    await pool.execute('insert into login(username, password ) values (?, ?)',
        [username, password]);
    return res.status(200).json({
        message: 'ok'
    })
}


let updateUser = async(req, res)=>{
    let { username, password, id } = req.body;

    if (!username || !password || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update login set username= ?, password = ?  where id = ?',
        [username, password, id]);

    
        return res.status(200).json({
            message: 'ok'
        })
}

let deleteUser = async(req, res)=>{
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from login where id = ?', [userId])
    return res.status(200).json({
        message: 'ok'
    })

}

let loginUser = async (req, res) => {
    let { username, password } = req.body;


    if (!username || !password ) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

  
    const NumberUser =  await pool.execute('SELECT COUNT(username) AS NumberUser FROM `login` WHERE username = ? AND password =?',
        [username, password]);
    console.log(NumberUser[0][0].NumberUser)
    let checklogin = "false";
    if(NumberUser[0][0].NumberUser > 0){
        checklogin = "true";
    }
    return res.status(200).json({
        message: 'ok',
        login: checklogin
    })
}



module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser,loginUser
}