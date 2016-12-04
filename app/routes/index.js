'use strict';

const path = process.cwd();
const Handler = require(path + '/app/controllers/handler.server.js');

module.exports = function (app) {
    
    const handler = new Handler();
    
    app.route('/')
        .get(function (req, res) {
            res.render('index.pug', {
                app_url: process.env.APP_URL
            });
    });
    
    app.route('/search/:term')
        .get(handler.searchCovers);
		
    app.route('/recent')
        .get(handler.getRecentSearches);
		
};
