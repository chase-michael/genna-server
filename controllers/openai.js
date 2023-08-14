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
      size: "1024x1024"
    });

    res.status(200).json(response.data);

  // const result = {
  //   "created": 1589478378,
  //   "data": [
  //     {
  //       "url": "https://res.cloudinary.com/genna/image/upload/v1686761549/Work/wbyiqg0j4bewl4rdojm3.png"
  //     },
  //     {
  //       "url": "https://res.cloudinary.com/genna/image/upload/v1686761549/Work/wbyiqg0j4bewl4rdojm3.png"
  //     }
  //   ]
  // }

  // res.status(200).json(result);
  

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

exports.getGuidedByAiOptions = async (req, res) => {
  const PROMPT = `You are providing options for an AI-guided flow where users build a prompt that will be used to generate an image with AI. Your response must be a string representation of a JSON object where each category / key provides an array of 4 creative options. The selected options will be concatenated into a single final prompt. The categories are 'Subject' (which can include adjectives or emotions), 'Action' (which can be active or something passive happening to the subject), 'Environment', 'Style' (art style), and 'Perspective'.`
  const openai = new OpenAIApi(configuration);

  try {
    const chat_completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          "role": "system",
          "content": PROMPT
        },
        {
          role: "user",
          content: "Provide a new set of options."
        }
      ],
    });
  //   const chat_completion = `{
  //     "Subject": ["A towering robot", "A playful puppy", "An ancient tree", "A tiny fairy"],
  //     "Action": ["walking through a field", "gazing at the starry sky", "basking in sunlight", "fighting a monstrous foe"],
  //     "Environment": ["an enchanted forest", "a bustling city", "a desolate desert", "the ruins of an old castle"],
  //     "Style": ["Impressionist", "Cubism", "Japanese ukiyo-e", "Mexican muralism"],
  //     "Perspective": ["from a bird's-eye view", "from the ground looking up", "from the perspective of someone close-by", "through a frame of foliage"]
  // }`
    res.status(200).json(chat_completion.data);
    // res.status(200).json(chat_completion);
    
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}