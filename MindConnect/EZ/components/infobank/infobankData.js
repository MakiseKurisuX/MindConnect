import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const fetchEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'InfoBank'));
    const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return entries;
  } catch (error) {
    console.error("Error fetching entries:", error);
    console.log(error);
  }
};