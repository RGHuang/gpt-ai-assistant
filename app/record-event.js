import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase.js';

const recordEvent = async (events = []) => {
  const lineContext = {
    userId: events[0]?.source.userId || 'unknown',
    time: Date.now(),
    message: events[0]?.message.text || 'unknown',
  };
  console.log(lineContext);

  const docRef = await addDoc(collection(db, 'log_line_chatgpt'), lineContext);
  console.log('Document written with ID: ', docRef.id);
};

export default recordEvent;
