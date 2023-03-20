import pool from '../configs/connectDB';

let getAllUsers = async (req, res) => {
    //http
    // 404 501
    // json/xml => object
    const [rows, fields] = await pool.execute('SELECT * FROM todolist');
    console.log(rows)
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstname, lastname, email, address } = req.body;


    if (!firstname || !lastname || !email || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

  
    await pool.execute('insert into todolist(firstname, lastname, email, address) values (?, ?, ?, ?)',
        [firstname, lastname, email, address]);
    return res.status(200).json({
        message: 'ok'
    })
}


let updateUser = async(req, res)=>{
    let { firstname, lastname, email, address, id } = req.body;

    if (!firstname || !lastname || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    
    
     
    await pool.execute('update todolist set firstname= ?, lastname = ? , email = ? , address= ? where id = ?',
        [firstname, lastname, email, address, id]);

    
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
    await pool.execute('delete from todolist where id = ?', [userId])
    return res.status(200).json({
        message: 'ok'
    })

}



module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}