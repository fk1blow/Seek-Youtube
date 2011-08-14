/**
 * @namespace Gdata
 */
Seek.Gdata = {};


/**
 * @class GdataBase
 * @description base class for the Gdata object
 */
Seek.Gdata.GdataBase = Class({
    _entry_builder: null,
    
    _feed_object: null,
    
    statics: {
        API_URI:                    'http://gdata.youtube.com/feeds/api',
        DEFAULT_RESPONSE:           'json',
        API_VERSION:                '2',
        USER_URI:                   'http://gdata.youtube.com/feeds/api/users',
        VIDEO_URI:                  'http://gdata.youtube.com/feeds/api/videos',
        FAVORITES_SUFFIX:           'favorites',
        PLAYLISTS_SUFFIX:           'playlists',
        UPLOADS_URI_SUFFIX:         'uploads',
    },
    
    buildFeedObject: function(_feed_object, media_callback) {
        this._initializeFeed(_feed_object);
        this._initializeBuilder();
        this._addFeedEntries();
        
        //cl(this._feed_object)
        
        // call on the public interface method
        media_callback.call(this, this._feed_object);
    },
    
    /**
     * @description initialize the feed object
     */
    _initializeFeed: function(feed_object_instance) {
        delete this._feed_object;
        this._feed_object = feed_object_instance;
    },
    
    /**
     * @description initialize the builder
     */
    _initializeBuilder: function() {
        delete this.entry_builder;
        this.entry_builder = new Seek.Gdata.Entry.EntryBuilder(this._getEntryClass());
    },
    
    /**
     * @description adds the entries to the the feed object's entry index/object
     */
    _addFeedEntries: function() {
        var entries = this.entry_builder.getMediaEntries(this._feed_object.getData().entry);
        this._feed_object.setEntry(entries);
    },
    
    /**
     * @description take the name of the entry/object class and build the entries
     */
    _getEntryClass: function() {
        var feed_class_type = this._feed_object.getContext();
        if(feed_class_type) {
            return feed_class_type.replace('Feed', 'Entry');
        }
        return null;
    },
    
    /**
     * @param {Array} uri_segments - the segments array from which the final feed url is built
     * @returns {String} - uri string for specific segments
     */
    buildURI: function(uri_segments) {
        if(_.isArray(uri_segments) && uri_segments.length > 0) {
            return Seek.Gdata.URI.SkURI.build(uri_segments);
        }
        return 'default';
    }
});


