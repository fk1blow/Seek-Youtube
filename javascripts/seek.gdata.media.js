/**
 * @class Media
 */
Seek.Gdata.Media = Class({
    Extends: Seek.Gdata.GdataBase,
    
    getFeed: function(feed_type, uri, callback) {
        var self = this;
        var feed_type = feed_type || 'VideoFeed';
        var http = Seek.Gdata.Http.SkHttp.getInstance();
        
        http.getResponseFrom(uri, function(response) {
            Seek.Gdata.Feed.ActiveFeed.buildFeed(response, feed_type, function(media_instance) {
                if(typeof(callback) === 'undefined' || (callback && typeof(callback) !== 'function')) {
                    throw new Error('No callback provided after http response!')
                }
                self.buildFeedObject(media_instance, callback);
            });
        });
    }
});


/**
 * @class MediaEntry
 */
Seek.Gdata.MediaEntry = Class({
   // 
});


/**
 * @class MediaFeed
 */
Seek.Gdata.MediaFeed = Class({
    //
});
