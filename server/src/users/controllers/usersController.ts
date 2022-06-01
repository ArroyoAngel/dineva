import express from 'express';
import UsersService from '../services/UsersService';

class UserController{
    async createUser(req: express.Request, res: express.Response){
        const result = await UsersService.create(req.body);
        switch (result) {
            case 200:
                res.sendStatus(result);
                break;
            case 404:
                res.sendStatus(result);
            default:
                break;
        }
    }

    async authentication(req: express.Request, res: express.Response){
        const auth = await UsersService.authentication(req.body);
        res.json(auth);
    }
}

export default new UserController();