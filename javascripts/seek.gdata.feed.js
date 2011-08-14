/*
- there are 6 types of feeds

# Video feeds
- Video feeds return a collection of video entries. In turn, each video entry contains information about a specific video in the video feed's result set.


# User's playlists feed
- A user's playlists feed contains a list of the playlists created by that user.


# User's subscriptions feed
- A user's subscriptions feed contains a list of the user actions and channels to which the user has subscribed.


# Video comments feed
- Each video entry contains a <gd:comments> tag, which encapsulates the URL to which you will send API requests to retrieve or append to the list of comments for the video. 


# User profile entry
- A user profile contains information that the user lists on his YouTube profile page.


# User's contacts feed
- A user's contacts feed lists all of the contacts for a specified user.
*/


/**
 * @namespace Feed
 */
Seek.Gdata.Feed = {};


/**
 * @class ActiveFeed
 * @description acts as a builder for the VideoFeed type
 */
Seek.Gdata.Feed.ActiveFeed = Class({
	statics: {
		buildFeed: function(raw_feed, feed_class, callback) {
			var feed_instance = this._buildInstance(feed_class, raw_feed);
			if(feed_instance) {
				if(!_.isUndefined(callback))
					callback.call(this, feed_instance);
			} else {
				throw new Error('Unable to call feed class:: ' + feed_class);
			}
		},
		
		_buildInstance: function(feed_type, feed_data) {
			if(Seek.Gdata.Feed[feed_type]) {
				return new Seek.Gdata.Feed[feed_type](feed_data);
			}
			return null;
		}
	}
});


/**
 * @class BaseFeed
 * @description acts as an abstract for all the feeds
 */
Seek.Gdata.Feed.BaseFeed = Class({
	Extends: Seek.Gdata.MediaFeed,
	
	_context: null,
	
	_data: null,
	
	_entry: null,
	
	/**
	 * @param {String} context_val - the context class
	 */
	setContext: function(context_val) {
		this._context = context_val;
	},
	/**
	 * @returns {String}
	 */
	getContext: function() {
		return this._context;
	},
	
	
	/**
	 * @param {Object} data_val - the actual feed returned from Gdata
	 */
	setData: function(data_val) {
		this._data = data_val;
	},
	/**
	 * @returns {Object}
	 */
	getData: function() {
		return this._data;
	},
	
	
	/**
	 * @param {Object} entry_val - the actual entry classes/object
	 */
	setEntry: function(entry_val) {
		this._entry = entry_val;
	},
	/**
	 * @returns {Object}
	 */
	getEntry: function() {
		return this._entry;
	}
});



	/**
	 * @class VideoFeed base class
	 * @description act as a base class for video type feeds(the ones that will containt videos, dooh)
	 */
	Seek.Gdata.Feed.VideoFeed = Class({
		Extends: Seek.Gdata.Feed.BaseFeed,
		
		initialize: function(feed_data) {
			this.setContext('VideoFeed');
			this.setData(feed_data.feed);
			cl('feed:: new VideoFeed');
		}
	});

	/**
	 * @class PlaylistCollectionFeed
	 * @description the playlist collection of a user
	 * - will contain an entry with one or more {PlaylistItem} objects
	 */
	Seek.Gdata.Feed.PlaylistCollectionFeed = Class({
		Extends: Seek.Gdata.Feed.BaseFeed,
		
		initialize: function(feed_data) {
			this.setContext('PlaylistCollectionFeed');
			this.setData(feed_data.feed);
			cl('new feed:: PlaylistCollectionFeed')
		}
	});
	
	
	Seek.Gdata.Feed.PlaylistItemFeed = Class({
		Extends: Seek.Gdata.Feed.BaseFeed,
		
		initialize: function(feed_data) {
			this.setContext('PlaylistItemFeed');
			this.setData(feed_data.feed);
			cl('new feed:: PlaylistItemFeed')
		}
	});
	
	
	Seek.Gdata.Feed.UserProfileFeed = Class({
		Extends: Seek.Gdata.Feed.BaseFeed,
		
		initialize: function(feed_data) {
			this.setContext('UserProfileFeed');
			this.setData(feed_data.entry);
			cl('new feed:: UserProfileFeed')
		}
	});
