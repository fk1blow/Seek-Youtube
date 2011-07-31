
$(document).ready(function() {
    
    var yb = new Seek.Gdata.Youtube.SkYoutube();
    
    $('#sidebar').find('a#user_favorites').click(function() {
        yb.getUserFavorites('fk1blow', function(feed) {
            //cl(feed.getEntry())
            //cl(feed.getEntry(0).getVideoId())
            /*for(var video in feed.getEntry()) {
                cl(feed.getEntry(video).getVideoId())
                cl(feed.getEntry(video).getVideoTitle())
            }*/
        });
    });
    
    //$('#sidebar').find('a#user_favorites').trigger('click')
    
    $('#sidebar').find('a#user_playlists').click(function() {
        yb.getUserPlaylistsCollection('fk1blow', function(feed) {
            cl('xxxx')
            cl(feed.getEntry(5).getPlaylistTitle())
            //cl(feed.getEntry(1).getPlaylistUrl())
            gp(feed.getEntry(5).getPlaylistId().$t)
            //cl(feed.getEntry(0).getPlaylistTitle())
            //cl(feed.getEntry(3).getPlaylistTitle())
            //cl(feed.get('PlaylistsCollection').getEntries()[0]);
            //getPlaylistVideoEntries(feed.get('PlaylistsCollection').getEntries()[0])
        });
    });
    
    $('#sidebar').find('a#user_playlists').click();
    
    
    $('#sidebar').find('a#user_playlist_programming').click(function() {
        gp('0E5B66AE7ACEA6D4');
    });
    
    function gp(playlist_id) {
        yb.getUserPlaylistEntries(playlist_id, function(feed) {
            for(var video in feed.getEntry()) {
                cl(feed.getEntry(video).getVideoId())
                cl(feed.getEntry(video).getVideoTitle())
            }
        });
    }
    
});
