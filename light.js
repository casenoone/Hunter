HUNT.Light.LightSample = function(L, EL) { this.L = L; this.EL = EL; };//返回光向量和辐照度（辐照度的概念还不太理解）
HUNT.Light.LightSample.zero = new HUNT.Light.LightSample(HUNT.Vector3.zero, HUNT.Color.black);

HUNT.Light.DirectionalLight = function(irradiance, direction) { 
	
	this.irradiance = irradiance; 
	this.direction = direction; 
	this.shadow = true; 
	this.L = this.direction.normalize().negate();

}

HUNT.Light.DirectionalLight.prototype = {

	sample: function(scene, position) {

        // 阴影测试
        if (this.shadow) {

            var shadowRay = new HUNT.Ray(position, this.L);
            var shadowResult = scene.intersect(shadowRay);
            if (shadowResult.geometry)
                return HUNT.Light.LightSample.zero;
        }
 
        return new HUNT.Light.LightSample(this.L, this.irradiance);
    }

}

HUNT.Light.PointLight = function(intensity, position) { this.intensity = intensity; this.position = position; this.shadow = false;}

HUNT.Light.PointLight.prototype = {

     sample: function(scene, position) {
        
        var delta = this.position.subtract(position);
        var rr = delta.sqrLength();
        var r = Math.sqrt(rr);
        var L = delta.divide(r);
 
        if (this.shadow) {
            var shadowRay = new HUNT.Ray(position, L);
            var shadowResult = scene.intersect(shadowRay);
            
            if (shadowResult.geometry && shadowResult.distance <= r)
                return HUNT.Light.LightSample.zero;
        }
 
        var attenuation = 1 / rr;
        return new HUNT.Light.LightSample(L, this.intensity.multiply(attenuation));
    }

}

