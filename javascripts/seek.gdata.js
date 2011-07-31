/**
 * Seek global object/namespace
 */
Seek = {};



/**
 * @namespace Gdata
 */
Seek.Gdata = {};

Seek.Gdata.SkGdata = Class({
    statics: {
        API_URI:                    'http://gdata.youtube.com/feeds/api',
        DEFAULT_RESPONSE:           'json',
        API_VERSION:                '2',
        USER_URI:                   'http://gdata.youtube.com/feeds/api/users',
        VIDEO_URI:                  'http://gdata.youtube.com/feeds/api/videos',
        FAVORITES_SUFFIX:          'favorites',
        PLAYLISTS_SUFFIX:           'playlists',
        UPLOADS_URI_SUFFIX:         'uploads',
    }
});

Seek.Gdata.Media = Class({
    Extends: Seek.Gdata.SkGdata,
    
    context: null,
    
    class_type: null,
    
    getFeed: function(feed_type, uri, callback) {
        var self = this;
        var feed_type = feed_type || 'VideoFeed';
        var http = Seek.Gdata.Http.SkHttp.getInstance();
        
        http.getResponseFrom(uri, function(response) {
            Seek.Gdata.Feed.ActiveFeed.buildFeed(response, feed_type, callback);
        });
    }
});



/**
 * @namespace Youtube
 */
Seek.Gdata.Youtube = {};

/**
 * Interface for the Youtube client
 */
Seek.Gdata.Youtube.IYoutubr = Class({
    getUserFavorites: function() {},
    getUserPlaylistsCollection: function() {},
    getUserPlaylisyEntries: function() {}
})

/**
 * @class SkYoutube
 * @extends SkMedia
 * @implements IYoutubr
 */
Seek.Gdata.Youtube.SkYoutube = Class({
    Extends: Seek.Gdata.Media,
    
    initialize: function() {
        this.context = 'Youtube';
    },
    
    /**
     * User favorites
     */
    getUserFavorites: function(username, callback) {
        var uri = this._buildURI([ Seek.Gdata.SkGdata.USER_URI, username, Seek.Gdata.SkGdata.FAVORITES_SUFFIX ]);
        var feed = this.getFeed('VideoFeed', uri, callback);
    },
    
    /**
     * User playlist video entries
     */
    getUserPlaylistEntries: function(playlist_id, callback) {
        var uri = this._buildURI([ Seek.Gdata.SkGdata.API_URI, Seek.Gdata.SkGdata.PLAYLISTS_SUFFIX, playlist_id ]);
        var feed = this.getFeed('PlaylistItemFeed', uri, callback);
    },
    
    /**
     * User playlists collections
     */
    getUserPlaylistsCollection: function(username, callback) {
        var uri = this._buildURI([ Seek.Gdata.SkGdata.USER_URI, username, Seek.Gdata.SkGdata.PLAYLISTS_SUFFIX ]);
        var feed = this.getFeed('PlaylistCollectionFeed', uri, callback);
    },
    
    _buildURI: function(uri_segments) {
        if(_.isArray(uri_segments) && uri_segments.length > 0) {
            return Seek.Gdata.URI.SkURI.build(uri_segments);
        }
        return 'default'
    }
});



/**
 * @namespace URI
 */
Seek.Gdata.URI = {};

Seek.Gdata.URI.SkURI = Class({
    
    statics: {
        build: function(segments) {
            var uri = segments.join('/') + this._getExtension();
            return uri;
        },
        
        _getExtension: function() {
            return '?v=' + Seek.Gdata.SkGdata.API_VERSION + '&alt=' + Seek.Gdata.SkGdata.DEFAULT_RESPONSE;
        }
    }
    
});



/**
 * @namespace Http
 */
Seek.Gdata.Http = {};

Seek.Gdata.Http.SkHttp = Class({
    instance: null,
    
    initialize: function() {
        cl('new SkHttp created');
    },
    
    getResponseFrom: function(url, callback) {
        if(!url || !typeof(url) === 'string') {
            throw new Error('url argument must be a string');
        }
        this._requestData(url, callback);
    },
    
    _requestData: function(url, callback) {
        jQuery.getJSON(url, function(data) {
            callback.call(this, data);
        })
    },
    
    statics: {
        getInstance: function() {
            if(!this.instance) {
                this.instance = new Seek.Gdata.Http.SkHttp();
            }
            return this.instance;
        }
    }
});
