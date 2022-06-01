import { IOrden } from "../interfaces/IOrder";
import app from "../../../firebase/config";
import { Firestore, updateDoc ,DocumentData, collection, getFirestore, doc, setDoc, CollectionReference, addDoc, query, getDocs, writeBatch, WriteBatch } from 'firebase/firestore';

class Order {
    db: Firestore = getFirestore(app);
    batch: WriteBatch = writeBatch(this.db);

    // async saveDocument(dataOrden: IOrden, collectionName: string):Promise<number>{
    //     try {
    //         const dataRef = collection(this.db, collectionName);
    //         await addDoc(dataRef, {...dataOrden});
    //         return 200;    
    //     } catch (error) {
    //         console.error(error);
    //         return 404;
    //     }
    // };

    // async getDocument(collectionName: string):Promise<any>{
    //     const dataRef = collection(this.db, collectionName);
    //     const queryData = query(dataRef);
    //     const querySnapshot = await getDocs(queryData);
    //     const data = querySnapshot.docs.map((doc) => doc.data());
    //     return data;
    // };

    // async updateSolOrder(id: string, collectionName: string, updateOrder: any):Promise<any>{
    //     console.log(id,collectionName, updateOrder)
    //     try {
    //         const dataRef = doc(this.db, collectionName, id);
    //         await updateDoc(dataRef, {...updateOrder});
    //         return 200;
    //     } catch (error) {
    //         console.error(error);
    //         return 404;
    //     }
    // };
}

export default new Order();