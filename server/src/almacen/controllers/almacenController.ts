import express from "express";
import AlmacenService from "../services/AlmacenService"; 

class AlmacenController {

    async create(req: express.Request, res: express.Response){
        const result = await AlmacenService.create(req.body, req.params.collection);
        switch (result.status) {
            case 200:
                res.status(result.status).send(result.body);
                break;
            case 404:
                res.status(result.status).send(result.body);
            default:
                break;
        }
    };

    async getAlmacen(req: express.Request, res: express.Response){
        const result = await AlmacenService.get(req.params.collection);
        result.length>0?res.json([...result]).status(200):res.sendStatus(404);
    };

    async updateDocument(req: express.Request, res: express.Response){
        const result = await AlmacenService.updateById(req.params.idDoc, req.params.collection, req.body);
        switch (result) {
            case 200:
                res.sendStatus(result);
                break;
            case 404:
                res.sendStatus(result);
            default:
                break;
        }
    };

    async uploadFile(req: express.Request, res: express.Response){
        const urlFile = await AlmacenService.uploadFile(req.body.data, req.body.name, req.body.type);
        res.json(urlFile).status(200);
    };

    async getDocumentById(req: express.Request, res: express.Response){
        const result = await AlmacenService.getById(req.params.id, req.params.collection);
        if(result){
            res.json(result).status(200);
        }else{
            res.json({error: 'Document not exists'}).status(404);
        }
    };

    async updateStore(req: express.Request, res: express.Response){
        const result = await AlmacenService.updateCollectionStore(req.body);
        res.json(result).status(200);
    }
};

export default new AlmacenController();