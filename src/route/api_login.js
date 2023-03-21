import express from "express";
import APILoginController from '../controller/APILoginController';
let router = express.Router();



const initAPIRouteLogin = (app) => {
    router.get('/users',APILoginController.getAllUsers); // method GET -> READ data
    router.post('/create-user', APILoginController.createNewUser); // method POST -> CREATE data
    router.put('/update-user', APILoginController.updateUser); //method PUT -> UPDATE data
    router.delete('/delete-user/:id', APILoginController.deleteUser); //method DELETE -> DELETE data
    // dang nhap
    router.post('/login', APILoginController.loginUser); // method POST -> CREATE data

    return app.use('/api/v1/login/', router)

}


export default initAPIRouteLogin;