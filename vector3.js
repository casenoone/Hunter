HUNT.Vector3 = function(x, y, z) {this.x = x; this.y = y; this.z = z};

HUNT.Vector3.prototype = {

	add : function(v) { return new HUNT.Vector3(this.x + v.x, this.y + v.y, this.z + v.z); } ,

	subtract : function(v) { return new HUNT.Vector3(this.x - v.x, this.y - v.y, this.z - v.z); } ,

	dot : function(v) { return this.x * v.x + this.y * v.y + this.z * v.z; },

	multiply : function(k){ return new HUNT.Vector3(this.x * k,this.y * k, this.z * k) },

	length : function() { return Math.sqrt(this.x * this.x + this.y * this.y +this.z * this.z) },

	sqrLength : function() { return this.x * this.x + this.y * this.y + this.z * this.z; },

	normalize : function() { var d = this.length(); return new HUNT.Vector3(this.x/d,this.y/d,this.z/d); },

	cross : function(v) { return new HUNT.Vector3(this.y * v.z - this.z * v.y,this.z * v.x - v.z * this.x, this.x * v.y - v.x * this.y); },
    
    negate : function() { return new HUNT.Vector3(-this.x, -this.y, -this.z); },

    divide : function(f) { var invf = 1/f; return new HUNT.Vector3(this.x * invf, this.y * invf, this.z * invf); },

    getDistance : function(v){  return Math.sqrt((v.x-this.x)*(v.x-this.x)+(v.y-this.y)*(v.y-this.y)+(v.z-this.z)*(v.z-this.z)); },


}

HUNT.Vector3.zero = new HUNT.Vector3(0,0,0);
