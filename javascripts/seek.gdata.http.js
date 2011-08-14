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
            return '?v=' + Seek.Gdata.GdataBase.API_VERSION + '&alt=' + Seek.Gdata.GdataBase.DEFAULT_RESPONSE;
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
        //cl('new SkHttp created');
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