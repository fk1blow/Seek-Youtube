/**
 * @namespace Entry
 */
Seek.Gdata.Entry = {};


/**
 * @class ActiveEntry
 * @description acts as a director
 */
Seek.Gdata.Entry.EntryBuilder = Class({
	entry_object_type: null,
	
	initialize: function(object_type) {
		this.entry_object_type = object_type;
	},
	
	/**
	 * @param {String} entry_class - the type of the entry that should build
	 * @param {Object} entry_source - the source from which the entries will be build
	 */
	getMediaEntries: function(entry_source) {
		return this._buildEntryItems(entry_source);
	},
	
	/**
	 * @name _buildEntryItems
	 * @description build the entry items for an entry
	 */
	_buildEntryItems: function(entry_source) {
		if(_.isUndefined(entry_source)) {
			return null;
		}
		var entry = entry_source,
			length = entry_source.length,
			tmp_obj = {};
			
		for(var i = 0; i < length; i++) {
			tmp_obj[i] = new Seek.Gdata.Entry[this.entry_object_type](entry[i]);
		}
		
		return tmp_obj;
	}
});



/**
 * @class EntryBase
 * @description base class for the entry
 */
Seek.Gdata.Entry.BaseEntry = Class({
	Extends: Seek.Gdata.MediaEntry,
	
	_data: null,
	
	setData: function(data_val) {
		this._data = data_val;
	},
	
	getData: function() {
		return this._data;
	}
});


	/**
	 * @class VideoEntry
	 */
	Seek.Gdata.Entry.VideoEntry = Class({
		Extends: Seek.Gdata.Entry.BaseEntry,
		
		object_type: 'VideoEntry',
		
		initialize: function(entry_data) {
			this.setData(entry_data);
		},
		
		getVideoId: function() {
			return this.getData().media$group.yt$videoid;
		},
		
		getVideoTitle: function() {
			return this.getData().title;
		}
	});
	

	/**
	 * @class PlaylistCollectionEntry
	 * @description
	 * this class holds the users playlists collection
	 * - every collection represents a playlist item that has one or more VideoEntry objects
	 */
	Seek.Gdata.Entry.PlaylistCollectionEntry = Class({
		Extends: Seek.Gdata.Entry.BaseEntry,
		
		object_type: 'PlaylistCollectionEntry',
		
		initialize: function(entry_data) {
			this.setData(entry_data);
		},
		
		getPlaylistTitle: function() {
			return this.getData().title;
		},
		
		getPlaylistId: function() {
			return this.getData().yt$playlistId.$t;
		}
	});
	
	
	/**
	 * @class PlaylistItemEntry
	 * @description object that hols the videos for a playlist
	 */
	Seek.Gdata.Entry.PlaylistItemEntry = Class({
		Extends: Seek.Gdata.Entry.BaseEntry,
		
		object_type: 'PlaylistItemEntry',
		
		initialize: function(entry_data) {
			this.setData(entry_data);
		},
		
		getVideoId: function() {
			return this.getData().media$group.yt$videoid;
		},
		
		getVideoTitle: function() {
			return this.getData().title;
		}
	});
















