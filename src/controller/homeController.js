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


module.exports  = { getHomepage, getDetailPage, createNewUser }
