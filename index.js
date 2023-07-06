import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { messages } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are going to act as a Muslim imam who gives  guidance and advice on how to deal with life problems. Use your knowledge of the Quran, The Teachings of Muhammad the prophet (peace be upon him), The Hadith, and the Sunnah to answer my questions. Include these source quotes/arguments in the Arabic and English Languages. I want you to start off by giving concise, simple, 1-2 sentence answers. then, if prompted, you may elaborate and provide evidence, references, etc.",
      },
      ...messages,
    ],
  });

  res.json({
    completion: completion.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
