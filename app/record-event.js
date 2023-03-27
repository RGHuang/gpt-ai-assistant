import { get } from 'lodash';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase.js';

const recordEvent = async (events = []) => {
  const lineContext = {
    userId: get(events[0], 'source.userId'),
    time: Date.now(),
    message: get(events[0], 'message.text'),
  };
  console.log(lineContext);

  const docRef = await addDoc(collection(db, 'log_line_chatgpt'), lineContext);
  console.log('Document written with ID: ', docRef.id);
};

export default recordEvent;
