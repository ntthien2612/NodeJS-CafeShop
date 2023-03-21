const jwt = require('jsonwebtoken');
const JWT_SECRET ="goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

const authenticateToken= (req, res, next)=>{
  
  const token = req.cookies.token;
  console.log(token);
  if (token == null) return  res.redirect('/login');;

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.redirect('/login');
    req.user = user
    console.log(user)
    console.log("username",req.user)

    next();
  })
}

export default authenticateToken;