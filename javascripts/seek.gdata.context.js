/*
	- fiecare tip de feed va avea unul sau mai multe tipuri de entry-uri
	- fiecare entry va fi un Object
	
	- UserFavorites va avea un entry de tip UserFavoritesEntry
	- UserPlaylistItem va avea un entry de tip UserPlaylistItemEntry
*/


/**
 * @class Abstract SkContext
 * @description provides a context for the items representing the feed object
 */
Seek.Gdata.Entry = {};

Seek.Gdata.Entry.MediaEntry = Class({
	Extends: Seek.Gdata.Media,
	
	data: null,
});

/**
 * @class VideoEntry
 */
Seek.Gdata.Entry.VideoEntry = Class({
	Extends: Seek.Gdata.Entry.MediaEntry,
	
	class_type: 'VideoEntry',
	
	initialize: function(entry_data) {
		this.data = entry_data;
	},
	
	getVideoId: function() {
		return this.data.media$group.yt$videoid;
	},
	
	getVideoTitle: function() {
		return this.data.title;
	}
});

/**
 * @class PlaylistCollectionEntry
 * @description
 * this class holds the users playlists collection
 * - every collection represents a playlist item that has one or more VideoEntry objects
 */
Seek.Gdata.Entry.PlaylistCollectionEntry = Class({
	Extends: Seek.Gdata.Entry.MediaEntry,
	
	class_type: 'PlaylistCollectionEntry',
	
	initialize: function(entry_data) {
		this.data = entry_data;
	},
	
	getPlaylistTitle: function() {
		return this.data.title;
	},
	
	getPlaylistId: function() {
		return this.data.yt$playlistId;
	},
	
	getPlaylistUrl: function() {
		return this.data.link[2].href;
	}
});


Seek.Gdata.Entry.PlaylistItemEntry = Class({
	Extends: Seek.Gdata.Entry.MediaEntry,
	
	class_type: 'PlaylistItemEntry',
	
	initialize: function(entry_data) {
		this.data = entry_data;
	},
	
	getVideoId: function() {
		return this.data.media$group.yt$videoid;
	},
	
	getVideoTitle: function() {
		return this.data.title;
	}
});


















