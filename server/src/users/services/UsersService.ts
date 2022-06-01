import User from '../models/dto/User';
import { CRUD } from '../../common/interfaces/interfaces';
import { IUser, IAuthentication } from '../models/interfaces/interfaces';
import COLLECTION_DB_NAME from '../../constants/dbConstants';

class UsersService implements CRUD{
    
    async create(resource: IUser){
        return User.saveDocument(resource, COLLECTION_DB_NAME.USERS);
    }

    async authentication(resource: IAuthentication){
        return User.authenticationUser(resource);
    }

}

export default new UsersService();