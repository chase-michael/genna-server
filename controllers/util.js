const ColorThief = require('colorthief');

exports.getImageColors = async (req, res) => {
  let { image } = req.query;

  try {
    const palette = await ColorThief.getPalette(image, 2);
    res.status(200).json({ palette })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error in getImageColors' })
  }
}
