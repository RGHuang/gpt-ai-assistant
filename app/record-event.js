import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase.js';

const recordEvent = async (events = []) => {
  const lineContext = {
    userId: events.source.userId,
    time: Date.now(),
    message: events.message.text,
  };
  console.log(lineContext);

  const docRef = await addDoc(collection(db, 'log_line_chatgpt'), lineContext);
  console.log('Document written with ID: ', docRef.id);
};

export default recordEvent;
