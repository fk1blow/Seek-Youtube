function cl(o) {
    if(console)
		console.log.apply(console, arguments);
}


(function() {
	// inherits function
	function extend(parent, child, overrides) {
		function ctor() {};
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
		child.prototype.constructor = child;
		child.__superClass__ = parent.prototype;
		
		if (overrides) {
			for (var i in overrides)
				child.prototype[i] = overrides[i];
		}
	}
	
	// add the "properties" to the Constructor function
	function getClassProperties(classObject, props) {
		var reservedWords = ['statics', '_static', 'Inherits'];
		var _properties = {};
		if(!props || typeof(props) !== 'object')
			throw new Error('Class properties should be defined as Objects');
		for(var item in props) {
			if(reservedWords.indexOf(item) > -1)
				continue;
			if(props.hasOwnProperty(item))
				_properties[item] = props[item];
		}
		return _properties;
	}
	
	// add the properties into the class's prototype
	function setClassProperties(classObject, props) {
		classObject.prototype = props;
		return true;
	}
	
	// Public class function
	var Class = function(options) {
		// constructor
		this.F = function() {
			this.initialize && typeof(this.initialize) === 'function' && this.initialize.apply(this, arguments);
		}
		var props = getClassProperties(this.F, options);
		setClassProperties(this.F, props);
		// extends if any parent given
		if(options.Inherits)
			extend(options.Inherits, this.F, this.F.prototype);
		// return the actual constructor function
		return this.F;
	}
	
	this.Class = window.Class || Class;
}());
