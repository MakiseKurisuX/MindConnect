import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig'; 

export const fetchConsults = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, 'Consultations'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const consults = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return consults;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching consultations:", error);
    return []; 
  }
};