const Work = require('../models/Work')
const { uploadWork } = require('../utils/upload');
const fs = require('fs');
const { ObjectId } = require('mongodb');

exports.saveWork = async (req, res) => {
  let { title, description, alt, artistId, collection } = req.body;
  const image = req.file.path;

  if (!alt) {
    alt = title;
  }

  artistId = new ObjectId(artistId);

  try {
    const result = await uploadWork(image);
    fs.unlinkSync(image);

    const work = new Work({
      title: title,
      description: description,
      alt: alt,
      artistId: artistId,
      workCollection: collection,
      url: result.url
    });

    const savedWork = await work.save();

    res.status(200).json({ workId: savedWork._id, message: "Work successfully saved!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error saving the work" });
  }
}






