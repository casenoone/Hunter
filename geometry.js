HUNT.Geometry.intersectResult = function() {

	this.position = HUNT.Vector3.zero;
	this.normal = HUNT.Vector3.zero;
	this.distance = 0;
	this.geometry = null;

}

HUNT.Geometry.intersectResult.noHit = new HUNT.Geometry.intersectResult();

HUNT.Geometry.union = function(scene) { this.scene = scene; }

HUNT.Geometry.union.prototype = {

	intersect : function(ray) {

		var minDistance = Infinity;
		var minResult = HUNT.Geometry.intersectResult.noHit;
		var p = this.scene.next;
		while(p!=null){

			var result = p.geometry.intersect(ray);
			if(result.geometry && result.distance < minDistance){

				minDistance = result.distance;
				minResult = result;

			}
			p = p.next;

		}

		return minResult;

	}

}

HUNT.Geometry.sphere = function (center, r){ this.center = center; this.r = r, this.sqrtR = r * r, this.material = 0;};

HUNT.Geometry.sphere.prototype = {
	
	initlize : function() {  },

	intersect : function(ray) { 
		
		var v = ray.origin.subtract(this.center);//射线起点减去球心
		var d_dot_v = ray.direction.dot(v);//向量d与向量v的点积
		var v_length = v.length();//向量v的模
		if(d_dot_v <= 0){//当物体在摄像机后面时，d_dot_v > 0,这种情况下摄像机看不到物体，所以要排除

			var delta = d_dot_v * d_dot_v - (v_length * v_length - this.sqrtR);//判断方程是否有解
			if(delta >= 0) {

				var result = new HUNT.Geometry.intersectResult();
				var dis = ray.origin.getDistance(this.center);
				if(dis<this.r){

					result.distance = -d_dot_v+Math.sqrt(delta);//方程组的解

				}
				else{
				result.distance = -d_dot_v- Math.sqrt(delta);//方程组的解

				}
				result.position = ray.getPoint(result.distance);
		        result.normal = result.position.subtract(this.center).normalize();
		        result.geometry = this;
		        return result;
			}

		}
		return HUNT.Geometry.intersectResult.noHit;
		
	 }

}

HUNT.Geometry.plane = function(normal, d) { 

	this.normal = normal; 
	this.d = d;
	this.position = this.normal.multiply(this.d);
	this.material = 0;
 
}

HUNT.Geometry.plane.prototype = {
 
	intersect : function(ray) {
        
        var a = ray.direction.dot(this.normal);
        if (a >= 0)
            return HUNT.Geometry.intersectResult.noHit;
 
        var b = this.normal.dot(ray.origin.subtract(this.position));
        var result = new HUNT.Geometry.intersectResult();
        result.geometry = this;
        result.distance = -b / a;
        result.position = ray.getPoint(result.distance);
        result.normal = this.normal;
        return result;
    }

}