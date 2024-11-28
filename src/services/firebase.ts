import app from '../conf/initializeFirebase';
import {IPlayer} from '@/src/interface/IPlayer';
import {collection, getFirestore, onSnapshot} from 'firebase/firestore';

const db = getFirestore(app);

export function createPlayerSubscription(
  onUpdate: (players: IPlayer[]) => void,
) {
  const unsubscribe = onSnapshot(collection(db, 'players'), snapshot => {
    const jugadoresList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      imagePath: `https://jlgjgh-4200.csb.app/${doc.data().imagePath}`,
    })) as IPlayer[];
    onUpdate(jugadoresList);
  });

  return unsubscribe;
}
