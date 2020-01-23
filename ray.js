HUNT.Ray = function(origin ,direction) { this.origin = origin; this.direction = direction }

HUNT.Ray.prototype = {

	initlize : function() { this.direction.normalize(); },

	getPoint : function(k) { return this.origin.add(this.direction.multiply(k)); },

}

HUNT.Ray.getReflectRay = function(result, ray) {

		 var r = result.normal.multiply(-2 * result.normal.dot(ray.direction)).add(ray.direction);
         return new HUNT.Ray(result.position, r);

	}

HUNT.Ray.getRefrectRay = function(result, ray) {

		
         return new HUNT.Ray(result.position, r);

	}