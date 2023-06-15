const User = require('../models/User');
const Work = require('../models/Work')

const search = async (req, res) => {
    const searchTerm = req.query.term;

    try {
        const artists = await User.aggregate([
            {
                $search: {
                    'index': 'displayName',
                    'text': {
                        'query': searchTerm,
                        'path': 'displayName'
                    }
                },
            },
            {
                $project: {
                    '_id': 0,
                    'displayName': 1,
                    'profileImage': 1,
                    'slug': 1
                }
            },
        ]);
        const works = await Work.aggregate([
            {
                $search: {
                    'index': 'workSearchResult',
                    'text': {
                        'query': searchTerm,
                        'path': ['title', 'description']
                    }
                }
            },
            {
                $project: {
                    'title': 1,
                    'url': 1
                }
            }
        ]);
        res.json({ artists, works });

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const getArtistBySlug = (req, res) => {
    let { slug } = req.query;

    User.findOne({ 'slug': slug })
        .then((user) => {
            const artist = {
                displayName: user.displayName,
                bio: user.bio,
                profileImage: user.profileImage
            }
            res.status(200).json(artist);

        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Error in getArtistBySlug' }]
            });
        })
}

const getArtistById = (req, res) => {
    let { artistId } = req.query;
    User.findOne({ '_id': artistId })
        .then((user) => {
            const artist = {
                displayName: user.displayName,
                bio: user.bio,
                profileImage: user.profileImage
            }
            res.status(200).json(artist);

        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Error in getArtistById' }]
            });
        })
}

const getWorkById = (req, res) => {
    let { id } = req.query;

    Work.findOne({ '_id': id })
        .then((work) => {
            res.status(200).json(work);
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Error in getWorkById' }]
            });
        })
}

module.exports = { search, getArtistBySlug, getWorkById, getArtistById };