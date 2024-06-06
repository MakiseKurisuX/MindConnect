import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Assuming auth is not used here

export const fetchChats = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'PeerChats'));
        const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return entries;
    } catch (error) {
        console.error("Error fetching chats:", error);
        return []; // Return an empty array or handle the error as needed
    }
};