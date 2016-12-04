'use strict';

const ipics = require('ipics');
const Search = require('../models/searches.js');

function Handler () {
	
	this.searchCovers = function (req, res) {
	    
        ipics(req.params.term, 'album')
        .then(result => {
            
            const newSearch = new Search();
            newSearch.term = req.params.term;

			newSearch.save(function (err) {
				if (err) console.error('could not save search', err);
            });
            
            const releases = [];
            
            for (let release of result) {
                releases.push({
                    'title': release.name,
                    'cover': release.imageUrl
                });
            }
            
            if (req.query.offset > 0) releases.splice(0, req.query.offset);
            res.json(releases);
        }).catch(function(err) {
            res.json({ error: 'could not use ipics: ' + err });
        });
	};
	
	this.getRecentSearches = function (req, res) {
	    
	    Search.find({}).sort({ _id: 'desc' }).exec(function(err, docs) {
	        if (err) console.error('could not fetch saved searches', err);
	        
	        const searches = [];
	        
	        for (let search of docs) {
                searches.push({
                    'term': search.term,
                    'date': search._id.getTimestamp()
                });
            }
            
            res.json(searches);
	    });
	};
}

module.exports = Handler;