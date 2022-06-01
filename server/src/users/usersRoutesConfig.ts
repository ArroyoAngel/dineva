import { CommonRoutesConfig } from '../common/commonRoutesConfig';
import usersController from './controllers/usersController';
import express from 'express';

export class UserRoutes extends CommonRoutesConfig{
    constructor(app: express.Application){
        super(app, 'UserRoutes');
    };

    configureRoutes(){
        this.app.route('/create/user')
            .post(usersController.createUser);

        this.app.route('/authentication/user')
            .post(usersController.authentication);
        return this.app;
    };

};