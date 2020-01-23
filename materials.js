HUNT.Materials.CheckerMaterial = function(scale, reflectiveness,refraction) { 

	this.scale = scale; 
	this.reflectiveness = reflectiveness;
    this.refraction = refraction;

 }

HUNT.Materials.CheckerMaterial.prototype = {

	sample : function(ray, position, normal) {
        
        return Math.abs((Math.floor(position.x * 0.1) + Math.floor(position.z * this.scale)) % 2) < 1 ? HUNT.Color.white : HUNT.Color.black;
	
	}
} 

HUNT.Materials.phong = function(diffuse, specular, shininess, reflectiveness,refraction,reType) { 

	this.diffuse = diffuse;
    this.specular = specular;
    this.shininess = shininess;
    this.reflectiveness = reflectiveness;//反射衰减系数
    this.refraction = refraction;//折射衰减系数
    this.reType = reType;//从属光线类型

}

/*var lightDir = new HUNT.Vector3(1, 1, 1).normalize();//临时光源
var lightColor = HUNT.Color.white;*/

HUNT.Materials.phong.prototype = {

	sample: function(ray, position, normal, lightSample) {
        
        var NdotL = normal.dot(lightSample.L);
        var H = (lightSample.L.subtract(ray.direction)).normalize();
        var NdotH = normal.dot(H);
        var diffuseTerm = this.diffuse.multiply(Math.max(NdotL, 0));
        var specularTerm = this.specular.multiply(Math.pow(Math.max(NdotH, 0), this.shininess));
        
        return lightSample.EL.modulate(diffuseTerm.add(specularTerm));
    }

}

HUNT.Materials.glass = function(reflectiveness,refraction,reType) { 
    
    this.refraction = refraction;
    this.reflectiveness = reflectiveness;
    this.reType = reType; 

}

HUNT.Materials.glass.prototype = {

    sample: function() {

        return HUNT.Color.black;

    } 

}

HUNT.Materials.rayTraceRecursive = function(scene, ray, maxReflect, lights) {
    
    var result = scene.intersect(ray); 
    
    if (result.geometry) {
        var type = result.geometry.material.reType;
        
        if(type == "diffuse"){
            var reflectiveness = result.geometry.material.reflectiveness;
            var color = HUNT.Color.black;
            for (var k in lights) {
                var lightSample = lights[k].sample(scene, result.position);
                    if (lightSample != lightSample.zero) {
                        var NdotL = result.normal.dot(lightSample.L);
                            if (NdotL >= 0){
                                // color = color.add(lightSample.EL.multiply(NdotL));
                                color = color.add(result.geometry.material.sample(ray, result.position, result.normal,lightSample));
                             }
                    }

            }

            color = color.multiply(1 - reflectiveness);
            if (reflectiveness > 0 && maxReflect > 0) {
                
                ray = HUNT.Ray.getReflectRay(result, ray);
                //折射光线应该写在这里
                var reflectedColor = HUNT.Materials.rayTraceRecursive(scene, ray, maxReflect - 1, lights);
                color = color.add(reflectedColor.multiply(reflectiveness));
            
            }
            return color;

        }

        else {
            //var refraction = result.geometry.material.refraction;
            var color = HUNT.Color.black;
            var into = true;
            var Normal = result.normal;
            
            var n_air = 1.0;//空气折射率
            var n_glass = 1.5;//玻璃折射率
            var delta_r = 0;//折射角
            var delta_i = 0;//反射角
           
            if(Normal.dot(ray.direction) > 0){
                into = false;
                Normal = Normal.negate();
            }
           

            if ( maxReflect > 0) {
                //if(into == true){//光线从空气射入玻璃
                    var ratio = 0;
                    if(into == true){
                        ratio = n_air / n_glass;
                    }
                    else{
                        ratio = n_glass / n_air;
                    }
                    Normal = Normal.normalize();
                    ray.direction = ray.direction.normalize();
                    delta_i = Normal.dot(ray.direction) * -1;
                    delta_r = Math.sqrt(1 - (ratio * ratio) * (1 - delta_i * delta_i));
                    var v1 = ray.direction.multiply(ratio);
                    var v2 = Normal.multiply(delta_r - ratio * delta_i);
                    var r = v1.subtract(v2)
                    //var r = ray.direction.multiply(ratio).subtract(Normal.multiply(delta_r - ratio * delta_i));
                    r = r.normalize();
                    var position = result.position.subtract(Normal.multiply(0.001));
                    ray = new HUNT.Ray(position, r);
                    //折射光线应该写在这里
                    var refractionColor = HUNT.Materials.rayTraceRecursive(scene, ray, maxReflect - 1, lights);
                    color = color.add(refractionColor);

            }
            return color;

        }

    }
    else
        
        return HUNT.Color.black;
}


/*HUNT.Materials.rayTraceRecursive = function(scene, ray, maxReflect, lights) {
    //备份函数
    var result = scene.intersect(ray); 
    if (result.geometry) {
        var reflectiveness = result.geometry.material.reflectiveness;

        var color = HUNT.Color.black;
        for (var k in lights) {
            var lightSample = lights[k].sample(scene, result.position);
               if (lightSample != lightSample.zero) {
                        var NdotL = result.normal.dot(lightSample.L);
                        if (NdotL >= 0){
                           // color = color.add(lightSample.EL.multiply(NdotL));
                            color = color.add(result.geometry.material.sample(ray, result.position, result.normal,lightSample));
                        }
                }

        }



        color = color.multiply(1 - reflectiveness);
        if (reflectiveness > 0 && maxReflect > 0) {
            var r = result.normal.multiply(-2 * result.normal.dot(ray.direction)).add(ray.direction);
            ray = new HUNT.Ray(result.position, r);
            //折射光线应该写在这里
            var reflectedColor = HUNT.Materials.rayTraceRecursive(scene, ray, maxReflect - 1, lights);
            color = color.add(reflectedColor.multiply(reflectiveness));
        }
      
     
        return color;
    }
    else
        return HUNT.Color.black;
}
*/