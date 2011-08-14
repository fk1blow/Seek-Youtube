
$(document).ready(function() {
    
    var yb = new Seek.Gdata.Youtube.SkYoutube();
    
    $('#sidebar').find('a#user_favorites').click(function() {
        yb.getUserFavorites('fk1blow', function(feed) {
            cl(feed.getEntry())
            //cl(feed.getEntry()[0].getVideoId())
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
            cl(feed.getEntry())
            cl(feed.getEntry()[9].getPlaylistTitle())
            cl(feed.getEntry()[9].getPlaylistId())
            //gp(feed.getEntry(5).getPlaylistId().$t)
            //cl(feed.getEntry(0).getPlaylistTitle())
            //cl(feed.getEntry(3).getPlaylistTitle())
            //cl(feed.get('PlaylistsCollection').getEntries()[0]);
            gp(feed.getEntry()[9].getPlaylistId())
        });
    });
    
    //$('#sidebar').find('a#user_playlists').click();
    
    
    
    $('#sidebar').find('a#user_playlist_programming').click(function() {
        gp('2E7BED2053CA0366');
    });
    
    function gp(playlist_id) {
        yb.getUserPlaylistEntries(playlist_id, function(feed) {
            cl(feed)
            //cl(feed.getEntry()[1].getVideoTitle())
            //cl(feed.getEntry()[4].getVideoId())
            //for(var video in feed.getEntry()) {
            //    cl(feed.getEntry(video).getVideoId())
            //    cl(feed.getEntry(video).getVideoTitle())
            //}
        });
    }
    
    
    $('#sidebar').find('#user_profile').click(function() {
        yb.getUserProfile('fk1blow', function(feed) {
            cl(feed)
        })
    });
    
});
