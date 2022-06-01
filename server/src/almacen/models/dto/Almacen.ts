import app from '../../../firebase/config';
import { 
    Firestore, 
    DocumentData, 
    collection, 
    getFirestore, 
    doc, 
    setDoc, 
    CollectionReference, 
    query, 
    getDocs, 
    updateDoc,
    getDoc
} from 'firebase/firestore';
import { 
    getStorage, 
    FirebaseStorage, 
    ref, 
    uploadString, 
    getDownloadURL, 
} from 'firebase/storage';
import COLLECTION_DB_NAME from "../../../constants/dbConstants";
import { getKeyObject } from '../../../helpers/functions';

class Almacen{
    db: Firestore = getFirestore(app);
    dbStorage: FirebaseStorage = getStorage(app);

    collectionDB(collectionName: string): CollectionReference<DocumentData>{
        return collection(this.db, collectionName);
    }

    async getUniqueId(): Promise<string>{
        const ref = this.collectionDB(COLLECTION_DB_NAME.RANDOM);
        return doc(ref).id;
    };

    async saveDocument(dataUser: any, collectionName: string):Promise<any>{
        try {
            const id:string = await this.getUniqueId();
            const dataRef = doc(this.db, collectionName, id);
            await setDoc(dataRef, {...dataUser, id});
            return {
                status: 200,
                body: {...dataUser, id}
            };
        } catch (error) {
            console.error(error);
            return {
                status: 404,
                body: error
            };
        }
    };

    async getDocument(collectionName: string):Promise<any>{
        const dataRef = collection(this.db, collectionName);
        const queryData = query(dataRef);
        const querySnapshot = await getDocs(queryData);
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;
    };

    async updateDocument(id: string, collectionName: string, updateOrder: any):Promise<any>{
        try {
            const dataRef = doc(this.db, collectionName, id);
            await updateDoc(dataRef, {...updateOrder});
            return 200;
        } catch (error) {
            console.error(error);
            return 404;
        }
    };

    async uploadFile(data: any, name: string, type: string): Promise<any>{
        const storageRef = ref(this.dbStorage, `${name}`);
        await uploadString(storageRef, data, 'data_url');
        const url = await getDownloadURL(storageRef).then(urlFile=>urlFile).catch(error=>error);
        return url;
    };

    async getDocumentById(id: string, collectionName: string): Promise<any>{
        const dataRef = doc(this.db, collectionName, id);
        const docSnap = await getDoc(dataRef);
        if(docSnap.exists()){
            return docSnap.data();
        }else{
            return false;
        };
    };

    async updateStore(resource: any): Promise<any>{
        const keys = await Promise.resolve(getKeyObject(resource));
        for (const keyObject in resource) {
            if (Object.prototype.hasOwnProperty.call(resource, keyObject)) {
                const element = resource[keyObject];
                keys.map(async (key:string)=>{
                    if(key===keyObject){
                        const dataRef = doc(this.db, COLLECTION_DB_NAME.ORDER, key);
                        await updateDoc(dataRef, {...element});
                        return {statusCode: 200, data: "Actualizado"};
                    };
                });
            };
        };
        return 200;
    };

}

export default new Almacen(); 