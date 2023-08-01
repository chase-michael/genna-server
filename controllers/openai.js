const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

exports.getImageGenerations = async (req, res) => {
  // const { prompt } = req.body;

  // const openai = new OpenAIApi(configuration);

  try {
  //   const response = await openai.createImage({
  //     prompt: prompt,
  //     n: 2,
  //     size: "1024*1024"
  //   });

  //   res.status(200).json(response.data);

  const result = {
    "created": 1589478378,
    "data": [
      {
        "url": "https://res.cloudinary.com/genna/image/upload/v1686761549/Work/wbyiqg0j4bewl4rdojm3.png"
      },
      {
        "url": "https://res.cloudinary.com/genna/image/upload/v1686761549/Work/wbyiqg0j4bewl4rdojm3.png"
      }
    ]
  }

  res.status(200).json(result);
  

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}