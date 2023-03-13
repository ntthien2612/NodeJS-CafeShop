import pool from '../configs/connectDB';



let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM todolist ');

    return res.render('index.ejs', { dataUser: rows, test: 'abc string test' })
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from todolist where id = ?`, [userId]);
    return res.send(JSON.stringify(user))
}


let createNewUser = async (req, res) => {
    let { firstname, lastname, email, address } = req.body;

    await pool.execute('insert into todolist(firstname, lastname, email, address) values (?, ?, ?, ?)',
        [firstname, lastname, email, address]);
    console.log(req.body)
    return res.redirect('/')
}

let deleteUser =async (req, res) => {
    let userId = req.body.userId;
    console.log(userId )

    await pool.execute('DELETE FROM todolist WHERE todolist.id = ?',[userId])
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('Select * from todolist where id = ?', [id]);
    return res.render('update.ejs', { dataUser: user[0] }); // x <- y
}

let postUpdateUser  = async (req, res) => {
    let { firstname, lastname, email, address, id } = req.body;

    await pool.execute('update todolist set firstname= ?, lastname = ? , email = ? , address= ? where id = ?',
        [firstname, lastname, email, address, id]);

    return res.redirect('/');
}


module.exports  = { getHomepage, getDetailPage, createNewUser,deleteUser, getEditPage, postUpdateUser }
