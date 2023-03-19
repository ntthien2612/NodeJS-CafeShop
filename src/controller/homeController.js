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

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {

    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}



let handleUploadMultipleFiles = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);

}
module.exports  = { getHomepage, getDetailPage, createNewUser,deleteUser, getEditPage, postUpdateUser, getUploadFilePage, handleUploadFile, handleUploadMultipleFiles }
