
HUNT.initlize = function(canvas, width, height) {

	HUNT.c = document.getElementById(canvas);
	HUNT.ctx = HUNT.c.getContext("2d");
	HUNT.imgData = HUNT.ctx.createImageData(width,height);
	HUNT.screen.width = width;
	HUNT.screen.height = height;

}

HUNT.Scene = function() { this.next = null; this.geometry = null; }

HUNT.Scene.prototype = {

	add : function(object) {

		var head = this;
		var temp = new HUNT.Scene();
		temp.geometry = object;
		temp.next = head.next;
		head.next = temp;

	}

}


HUNT.render = function(camera, scene, lights) {
	
	var i = 0;
	var length = HUNT.imgData.data.length;
	var maxDepth = 10;
	var color = HUNT.Color.blue;
	for(var y = 0; y < HUNT.screen.height; y++) {

		var sy = 1 - y / HUNT.screen.height;//坐标系变换，将屏幕坐标（canvas画布坐标）转为取样坐标
		for(var x = 0; x < HUNT.screen.width; x++){

			var sx = x/HUNT.screen.width;
			var depth = 0;
			var ray = camera.generateRay(sx, sy);
			var union = new HUNT.Geometry.union(scene);
			//var maxDepth = 20;
			//var result = union.intersect(ray);
			//if(result.geometry){
				//var dis = result.distance;
				
				//color = result.geometry.material.sample(ray, result.position, result.normal);//phong模型
				color = HUNT.Materials.rayTraceRecursive(union, ray, 5, lights);//反射光
               
               // color = HUNT.Color.black;
               // for (var k in lights) {
                    //var lightSample = lights[k].sample(union, result.position);

                   // if (lightSample != lightSample.zero) {
                        //var NdotL = result.normal.dot(lightSample.L);
 
                        // 夹角小约90度，即光源在平面的前面
                        //if (NdotL >= 0)
                           // color = color.add(lightSample.EL.multiply(NdotL));
                    //}
				//}


			//}
			//else{

				//color = HUNT.Color.black;

			// }

			HUNT.imgData.data[i+0] = color.r * 255;
			HUNT.imgData.data[i+1] = color.b * 255;
			HUNT.imgData.data[i+2] = color.g * 255;
			HUNT.imgData.data[i+3] = 255;
			i += 4;

		}

	}
	HUNT.ctx.putImageData(HUNT.imgData,10,10);

}

