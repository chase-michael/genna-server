const Work = require('../models/Work')
const User = require('../models/User')
const { uploadWork, uploadProfileImage } = require('../utils/upload');
const fs = require('fs');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken')

exports.saveWork = async (req, res) => {
  let { title, alt, artistId } = req.body;
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
      alt: alt,
      artistId: artistId,
      url: result.url
    });

    const savedWork = await work.save();

    res.status(200).json({ workId: savedWork._id, message: "Work successfully saved!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error saving the work" });
  }
}

exports.saveFinalWork = async (req, res) => {
  let { url, title, artistId } = req.body;

  artistId = new ObjectId(artistId);

  try {

    const result = await uploadWork(url);

    const work = new Work({
      title: title,
      alt: title,
      artistId: artistId,
      url: result.url
    });

    const savedWork = await work.save();

    res.status(200).json({ _id: savedWork._id, message: "Work successfully saved!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error saving the work" });
  }
}

exports.updateProfileImage = async (req, res) => {
  const { authToken } = req.body;
  const profileImage = req.file.path;

  try {
    const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);
    const result = await uploadProfileImage(profileImage);
    fs.unlinkSync(profileImage);

    const filter = { _id: payload._id};
    const update = { profileImage: result.url };

    const doc = await User.findOneAndUpdate(filter, update, {
      new: true
    });
    
    res.status(200).json({ doc: doc, message: "Profile image successfully updated!" });

  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
}