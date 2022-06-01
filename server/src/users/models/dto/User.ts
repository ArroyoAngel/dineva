import { IUser, IAuthentication } from '../interfaces/interfaces';
import app from '../../../firebase/config';
import { Firestore, DocumentData, collection, getFirestore, doc, setDoc, CollectionReference, query, where, getDocs } from 'firebase/firestore';
import COLLECTION_DB_NAME from '../../../constants/dbConstants';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class User{

    db: Firestore = getFirestore(app);

    collectionDB(collectionName: string): CollectionReference<DocumentData>{
        return collection(this.db, collectionName);
    }

    async getUniqueId(): Promise<string>{
        const ref = this.collectionDB(COLLECTION_DB_NAME.RANDOM);
        return doc(ref).id;
    }

    async saveDocument(dataUser: IUser, collectionName: string):Promise<number>{
        try {
            const id:string = await this.getUniqueId();
            const dataRef = doc(this.db, collectionName, id);
            dataUser.password = bcrypt.hashSync(dataUser.password, 10);
            const dataToSave = {...dataUser, id};
            await setDoc(dataRef, dataToSave);
            return 200;    
        } catch (error) {
            return 404;
        }
        
    }

    async authenticationUser(dataUser: IAuthentication): Promise<any>{
        try {
            const { user, password } = dataUser;
            const dataRef = collection(this.db, COLLECTION_DB_NAME.USERS);
            const queryData = query(dataRef, where('user', '==', user));
            const querySnapshot = await getDocs(queryData);
            const exist = querySnapshot.docs.find(doc=>doc.data().user === user);
            if(exist){
                const passwordValidate = bcrypt.compareSync(password, exist.data().password);
                if(!passwordValidate) return {status: 400, error: 'ok', msj: 'Usuario o contraseña incorrecto'};
                return jwt.sign({
                    data: { _id: exist.data().id, user: exist.data().name, rol: exist.data().cargo }
                }, 'keyPassword', {expiresIn: '8h'});
                
            }else{
                return {status: 400, error: 'ok', msj: 'Usuario o contraseña incorrecto'};
            };
            
        } catch (error) {
            return error
        }
    }

}

export default new User();