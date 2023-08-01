const mongoose = require('mongoose');
const Work = require('../models/Work')
const User = require('../models/User');
const ColorThief = require('colorthief');


exports.fetchSampleWorks = async (req, res) => {
    const { numberOfWorks } = req.query;
    
    try {
        const sampleWorks = await Work.aggregate([{ $sample: { size: parseInt(numberOfWorks) } }]);
        res.status(200).json(sampleWorks);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: [{ error: 'Error in getSampleWorks' }]
        });
    }
}

exports.fetchSampleArtists = async (req, res) => {
    const { numberOfArtists } = req.query;

    try {
        const response = await User.aggregate([
            { $sample: { size: parseInt(numberOfArtists) } },
            {
                $project: {
                    _id: 0, 
                    displayName: 1, 
                    bio: 1, 
                    profileImage: 1,
                    slug: 1
                }
            }
        ]);

        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error in getSampleArtists' });
    }
}

exports.fetchSampleCollectionWorks = async (req, res) => {
    const { workCollection, numberOfWorks } = req.query;

    try {
        const sampleWorks = await Work.aggregate([
            { $match: { workCollection: workCollection } },
            { $sample: { size: parseInt(numberOfWorks) } },
          ]);

        res.status(200).json(sampleWorks);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error in getSampleCollectionWorks' });
    }
}

exports.fetchWorksByArtist = async (req, res) => {
    const { artistId } = req.query;
    try {
        const works = await Work.aggregate([
            { $match: { artistId: new mongoose.Types.ObjectId(artistId) } }
        ]);
        res.status(200).json(works);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: [{ error: 'Error in fetchWorksByArtist' }]
        });
    }
}