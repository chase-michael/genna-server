const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

exports.getImageGenerations = async (req, res) => {
  const { prompt } = req.body;

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 2,
    });
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }




}