import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase.js';
import { replyMessage } from '../utils/index.js';
import {
  execActivateCommand,
  execCallCommand,
  execChatCommand,
  execCommandCommand,
  execConfigureCommand,
  execContinueCommand,
  execDeactivateCommand,
  execDeployCommand,
  execDocCommand,
  execDrawCommand,
  execVersionCommand,
  isActivateCommand,
  isCallCommand,
  isChatCommand,
  isCommand,
  isConfigureCommand,
  isContinueCommand,
  isDeactivateCommand,
  isDeployCommand,
  isDocCommand,
  isDrawCommand,
  isVersionCommand,
} from './commands/index.js';
import Context from './context.js';
import Event from './event.js';

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const handle = async (context) => (
  (isCommand(context) && execCommandCommand(context))
    || (isDocCommand(context) && execDocCommand(context))
    || (isVersionCommand(context) && execVersionCommand(context))
    || (isDeployCommand(context) && execDeployCommand(context))
    || (isConfigureCommand(context) && execConfigureCommand(context))
    || (isDrawCommand(context) && execDrawCommand(context))
    || (isActivateCommand(context) && execActivateCommand(context))
    || (isDeactivateCommand(context) && execDeactivateCommand(context))
    || (isContinueCommand(context) && execContinueCommand(context))
    || (await isCallCommand(context) && execCallCommand(context))
    || (await isChatCommand(context) && execChatCommand(context))
    || context
);

const handleEvents = async (events = []) => {
  Promise.all(
    (await Promise.all(
      events
        .map((event) => new Event(event))
        .filter((event) => event.isMessage)
        .map((event) => new Context(event))
        .map((context) => handle(context)),
    ))
      .filter((context) => context.messages.length > 0)
      .map((context) => replyMessage(context)),
  );

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

export default handleEvents;
