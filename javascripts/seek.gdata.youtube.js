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
        var uri = this.buildURI([ Seek.Gdata.GdataBase.USER_URI, username, Seek.Gdata.GdataBase.FAVORITES_SUFFIX ]);
        var feed = this.getFeed('VideoFeed', uri, callback);
    },
    
    /**
     * User playlist video entries
     */
    getUserPlaylistEntries: function(playlist_id, callback) {
        var uri = this.buildURI([ Seek.Gdata.GdataBase.API_URI, Seek.Gdata.GdataBase.PLAYLISTS_SUFFIX, playlist_id ]);
        var feed = this.getFeed('PlaylistItemFeed', uri, callback);
    },
    
    /**
     * User playlists collections
     */
    getUserPlaylistsCollection: function(username, callback) {
        var uri = this.buildURI([ Seek.Gdata.GdataBase.USER_URI, username, Seek.Gdata.GdataBase.PLAYLISTS_SUFFIX ]);
        var feed = this.getFeed('PlaylistCollectionFeed', uri, callback);
    },
    
    /**
     * User profile feed
     * http://gdata.youtube.com/feeds/api/users/username?v=2
     */
    getUserProfile: function(username, callback) {
        var uri = this.buildURI([ Seek.Gdata.GdataBase.USER_URI, username ]);
        var feed = this.getFeed('UserProfileFeed', uri, callback);
    }
});