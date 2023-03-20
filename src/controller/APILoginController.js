import pool from '../configs/connectDB';
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const JWT_SECRET ="goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

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

    const [User, fields] =  await pool.execute('SELECT * FROM `login` WHERE username = ? ',
        [username]);


    if(User!= ''){

        return res.status(200).json({
            message: 'tai khoan ton tai',
        });
    }

    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log(hashedPassword)

    await pool.execute('insert into login(username, password ) values (?, ?)',
        [username, hashedPassword]);

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

    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    
    
    
    await pool.execute('update login set username= ?, password = ?  where id = ?',
        [username, hashedPassword, id]);

    
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

  
    const [NumberUser, fields] =  await pool.execute('SELECT * FROM `login` WHERE username = ? ',
        [username]);
    
    console.log(NumberUser);
    
    if(NumberUser== ''){

        return res.status(200).json({
            message: 'tai khoan khong ton tai',
        });
    }

    let pass = NumberUser[0].password;


    const isMatch = await bcrypt.compare(password, pass);

    if (isMatch) {
        return res.status(200).json({
            message: 'ok',
            User: NumberUser[0],
            token: jsonwebtoken.sign({ user: NumberUser[0].username }, JWT_SECRET,{expiresIn: 15*60}),
        })
    } else {
        return res.status(200).json({
            message: 'sai mat khau',
        })
    }

}



module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser,loginUser
}