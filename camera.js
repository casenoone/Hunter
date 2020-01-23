HUNT.Camera = function(eye, front, up, fov) { this.eye = eye; this.front = front; this.up = up; this.fov = fov}//简化版透视相机

HUNT.Camera.prototype = {

	initlize : function() {

		this.right = this.front.cross(this.up);
		this.cameraUp = this.right.cross(this.front);
		this.fovScale = Math.tan(this.fov * 0.5 * Math.PI / 180) * 2;//视野规模
	},

	generateRay : function(sx, sy) {

		var r = this.right.multiply((sx - 0.5) * this.fovScale);
		var u = this.cameraUp.multiply((sy - 0.5) * this.fovScale);
		return new HUNT.Ray(this.eye, this.front.add(r).add(u).normalize());

	}



}