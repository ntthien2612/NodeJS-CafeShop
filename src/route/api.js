import express from "express"



let router = express.Router();


const initApiRoute = (app) => {
    

    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);

    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.postUpdateUser);

    

    return app.use('/', router)
}




export default initApiRoute;