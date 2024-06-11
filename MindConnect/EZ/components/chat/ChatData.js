import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig'; 

export const fetchChats = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No authenticated user found");
    }

    const chatsRef = collection(db, 'Chats');
    const q = query(chatsRef, where('userId', 'array-contains', user.uid));
    const querySnapshot = await getDocs(q);
    const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return entries;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return []; 
  }
};