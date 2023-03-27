import express from "express";
import { isNil, get } from "lodash";

import { handleEvents, printPrompts, recordEvent } from "../app/index.js";
import config from "../config/index.js";
import { validateLineSignature } from "../middleware/index.js";

const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.get("/", (req, res) => {
  if (config.APP_URL) {
    res.redirect(config.APP_URL);
    return;
  }
  res.sendStatus(200);
});

app.post(config.APP_WEBHOOK_PATH, validateLineSignature, async (req, res) => {
  try {
    if (!isNil(get(req.body.events, "0.source.userId"))) {
      await recordEvent(req.body.events);
    }
    await handleEvents(req.body.events);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  if (config.APP_DEBUG) printPrompts();
});

if (config.APP_PORT) {
  app.listen(config.APP_PORT);
}

export default app;
