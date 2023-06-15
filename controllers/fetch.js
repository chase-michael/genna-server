const Work = require('../models/Work')
const User = require('../models/User');

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
