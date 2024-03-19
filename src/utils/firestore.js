import { doc, getDoc, getDocs, setDoc, firebase, collection, orderBy, limit, query } from "firebase/firestore";
import { DEFAULT_USER_DATA } from '../interface/userdata';
import { DEFAULT_TRADE_DATA } from '../interface/tradedata';

const COLLECTIONS = {
    USERS: 'users',
    TRADEADS: 'tradeads'
}

export const FirestoreAPI = {
    getUser: async (db, user_id) => {
        const docRef = doc(db, COLLECTIONS.USERS, user_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }
    },
    createUser: async (db, user_id) => {
        try {
            const userRef = doc(db, COLLECTIONS.USERS, user_id)
            setDoc(userRef, DEFAULT_USER_DATA)
        } catch (error) {
            console.log("Error during createUser : Firestore");
            console.log(error);
        }
    },
    updateUser: async (db, user_id, data) => {
        try {
            const userRef = doc(db, COLLECTIONS.USERS, user_id)
            setDoc(userRef, { ...data }, { merge: true })
            return await getDoc(userRef);

        } catch (error) {
            console.log("Error during updateUser : Firestore");
            console.log(error);
        }
    },
    getTradeAds: async (db) => {
        const tradeRef = collection(db, "tradeads")

        let ads = []
        let ads2 = []
        /*   const querySnapshot = await getDocs(collection(db, COLLECTIONS.TRADEADS));
           querySnapshot.forEach((doc) => {
               // doc.data() is never undefined for query doc snapshots
               ads.push({ id: doc.id, data: doc.data() })
           });
   */

        const q = query(tradeRef, orderBy("timeStamp", "desc"), limit(25)); //latest posts
        const querySnapshot2 = await getDocs(q);
        querySnapshot2.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            ads2.push({ id: doc.id, data: doc.data() })
        });
        return ads2
        if (ads.length) {
            return ads
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }
    },
    addTradeAd: async (db, user_id, data) => {
        try {
            const userRef = doc(db, COLLECTIONS.TRADEADS, user_id)
            setDoc(userRef, { ...data, timeStamp: Date.now() }, { merge: true })
            return await getDoc(userRef)

        } catch (error) {
            console.log("Error during addTradeAd : Firestore");
            console.log(error);
        }
    }
}