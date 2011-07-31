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
 * @class SkVideoFeedFactory
 * @description acts as a factory for the VideoFeed type
 */
Seek.Gdata.Feed.ActiveFeed = Class({
	statics: {
		buildFeed: function(raw_feed, feed_class, callback) {
			var feed_instance = this._buildInstance(feed_class, raw_feed);
			if(feed_instance) {
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
	Extends: Seek.Gdata.Media,
	
	data: null,
	
	getData: function() {
		return this.data;
	},
	
	setData: function(data_val) {
		this.data = data_val;
	},
	
	getFeed: function() {
		return this.data.feed;
	},
	
	setFeed: function(feed_data) {
		this.data.feed = feed_data.feed;
	},
	
	getEntry: function(entry_index) {
		if(this.data.entry) {
			return this.data.entry[entry_index] || this.data.entry;
		} else {
			return null;
		}
	},
	
	setEntry: function(feed_entry, feed_type) {
		if(_.isUndefined(feed_entry)) {
			this.data.entry = null;
			return;
		}
		var entry = feed_entry,
			length = feed_entry.length,
			tmp_obj = {},
			feed_type = feed_type || this.data.class_type.replace('Feed', 'Entry');
		for(var i = 0; i < length; i++) {
			tmp_obj[i] = new Seek.Gdata.Entry[feed_type](entry[i]);
		}
		this.data.entry = tmp_obj;
	},
	
	getCount: function() {
		return this.data.feed.entry.length;
	}
});


/**
 * subclasses > BaseFeed
 */


/**
 * @class VideoFeed base class
 * @description act as a base class for video type feeds(the ones that will containt videos, dooh)
 */
Seek.Gdata.Feed.VideoFeed = Class({
	Extends: Seek.Gdata.Feed.BaseFeed,
	
	initialize: function(feed_data) {
		this.data = { class_type: 'VideoFeed', feed: null, entry: null, };
		this.setFeed(feed_data);
		this.setEntry(feed_data.feed.entry);
		cl('new feed:: VideoFeed');
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
		this.data = { class_type: 'PlaylistCollectionFeed', feed: null, entry: null, };
		this.setFeed(feed_data);
		this.setEntry(feed_data.feed.entry);
		cl('new feed:: PlaylistCollectionFeed')
	}
});


Seek.Gdata.Feed.PlaylistItemFeed = Class({
	Extends: Seek.Gdata.Feed.BaseFeed,
	
	initialize: function(feed_data) {
		this.data = { class_type: 'PlaylistItemFeed', feed: null, entry: null, };
		this.setFeed(feed_data);
		this.setEntry(feed_data.feed.entry);
		cl('new feed:: PlaylistItemFeed')
	}
});
























