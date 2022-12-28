import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase.js';

const recordEvent = async (events = []) => {
  if (events.type === 'message') {
    const lineContext = {
      userId: events.source.userId,
      time: Date.now(),
      message: events.message.text,
    };
    console.log(lineContext);

    try {
      const docRef = await addDoc(collection(db, 'log_line_chatgpt'), lineContext);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
};

export default recordEvent;
