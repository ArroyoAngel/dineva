import { CommonRoutesConfig } from "../common/commonRoutesConfig";
import almacenController from './controllers/almacenController';
import express from 'express';

export class AlmacenRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AlmacenRoutes');
    };

    configureRoutes(){
        this.app.route('/create/:collection')
            .post(almacenController.create);
        
        this.app.route('/get/:collection')
            .get(almacenController.getAlmacen);

        this.app.route('/put/:collection/:idDoc')
            .put(almacenController.updateDocument);

        this.app.route('/upload')
            .post(almacenController.uploadFile);

        this.app.route('/get/:collection/:id')
            .get(almacenController.getDocumentById);
        
        this.app.route('/update/store')
            .put(almacenController.updateStore);
        return this.app;
    };
};
