import Almacen from "../models/dto/Almacen";
import { CRUD } from '../../common/interfaces/interfaces';

class AlmacenService implements CRUD{

    async create(resource: any, collection: string){
        return Almacen.saveDocument(resource, collection);
    }

    async get(collectionName: string){
        return Almacen.getDocument(collectionName);
    }

    async updateById(id: string, collection: string, resource: any){
        return Almacen.updateDocument(id,collection, resource);
    }

    async uploadFile(data: any, name: string, type: string){
        return Almacen.uploadFile(data, name, type);
    }

    async getById(id: string, collection: string){
        return Almacen.getDocumentById(id, collection);
    }

    async updateCollectionStore(resource: any){
        return Almacen.updateStore(resource);
    }

}

export default new AlmacenService();