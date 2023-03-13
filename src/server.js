import express from 'express'
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';


require('dotenv').config();
const path = require('path');


const app = express()
const port = process.env.PORT || 8080;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);



app.get('/about',  (req, res)=> {
  res.send('hello')
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})