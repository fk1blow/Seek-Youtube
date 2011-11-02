function cl(o) {
    try {
        console.log.apply(console, arguments)
    } catch(e) {}
}


function isArray (o) {
  return Object.prototype.toString.apply(o) === '[object Array]';
}


var __extends = function(child, parent) {
    var constrains = ['__classname', 'initialize'];
    var tmp_proto = {};
    
    for(var i in parent.prototype) {
        if(constrains.indexOf(i) > 0) 
            continue;
        if(isArray(parent.prototype[i])) {
            tmp_proto[i] = parent.prototype[i].slice(0);
        } else {
            tmp_proto[i] = parent.prototype[i];
        }
    }
    
    for(var i in child.prototype) {
        tmp_proto[i] =  child.prototype[i];
    }
    
    var ctor = function(){};
    ctor.prototype = tmp_proto;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    
    if (typeof parent.extended === "function") parent.extended(child);
    child.__superClass__ = parent.prototype;
};


var ClassBuilder = {
    dummy_context: null,
    
    // Extended function
    extend: function(child, parent) {
        __extends(child, parent);
    },
    
    // Adds the instance methods to the prototype
    createInstance: function(body) {
        dummy_context = function(init_params) {
            if(typeof(this.initialize) != 'undefined') {
                this.initialize.apply(this, arguments);
            }
        };
        
        var c = dummy_context;
        var tmp_methods = {};
        
        if(body && typeof(body) === 'object') {
            for(var item in body) {
                if(body[item] == 'statics' || body[item] == 'Extends')
                    continue;
                tmp_methods[item] = body[item];
            }
        }
        
        c.prototype = tmp_methods;
        this.createDefaults(c);
        
        return dummy_context;
    },
    
    // Adds default methods to object instances
    createDefaults: function(class_object) {
        class_object.prototype.getClassName = function() {
            return this.__classname;
        }
    },
    
    // Adds the static properties(methods, attributes)
    createStatic: function(context, methods) {
        for(var i in methods) {
            context[i] = methods[i];
        }
    }
};
//


function Class(body) {
    var options = {
        Extends: null,
        attributes: null,
        methods: null,
        statics: null
    }
    
    if(body) {
        options.Extends = body.Extends;
        //options.attributes = body.attributes;
        //options.methods = body.methods;
        options.statics = body.statics;
    }
    
    // Creates the actual function(or class, whatever)
    var c = ClassBuilder.createInstance(body);
    
    // Handles extends parent
    if(options.Extends != null) {
        ClassBuilder.extend(c, body.Extends);
    }
    
    // Static members
    if(options.statics != null) {
        ClassBuilder.createStatic(c, options.statics);
    }
    
    return c;
}


//exports.Class = Class;
