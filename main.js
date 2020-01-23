onload = function() {
	
	HUNT.initlize("myCanvas", 512, 512);
	
	var camera = new HUNT.Camera(new HUNT.Vector3(0,8,20), new HUNT.Vector3(0,0,-1), new HUNT.Vector3(0,1,0), 110)
	camera.initlize();
	var scene = new HUNT.Scene();
	
	
	var sphere = new HUNT.Geometry.sphere(new HUNT.Vector3(3,2,7),3);
	
	//sphere.material = new HUNT.Materials.phong(HUNT.Color.red, HUNT.Color.white, 16, 0.25,0,"diffuse");
	sphere.material = new HUNT.Materials.glass(0,0.25,"refra");
	//scene.add(sphere);
//alert(123);
	var sphere1 = new HUNT.Geometry.sphere(new HUNT.Vector3(0,5,7),3);
	sphere1.material = new HUNT.Materials.phong(HUNT.Color.red, HUNT.Color.white, 16, 0.25,0,"diffuse");
	scene.add(sphere1);

	var sphere2 = new HUNT.Geometry.sphere(new HUNT.Vector3(0,0,-4),3);
	//sphere2.material = new HUNT.Materials.phong(HUNT.Color.blue, HUNT.Color.white, 16, 0.25,0,"diffuse");
	sphere2.material = new HUNT.Materials.glass(0,0.25,"refra");

	//scene.add(sphere2);

	var sphere3 = new HUNT.Geometry.sphere(new HUNT.Vector3(-6,3,7),3);
	sphere3.material = new HUNT.Materials.phong(HUNT.Color.red, HUNT.Color.white, 16, 0.25,0,"diffuse");
	//scene.add(sphere3);
	
	var planeDown = new HUNT.Geometry.plane(new HUNT.Vector3(0, 1, 0), 0);
	planeDown.material = new HUNT.Materials.phong(HUNT.Color.down, HUNT.Color.white, 10, 0.25,0,"diffuse");
	//plane1.material = new HUNT.Materials.CheckerMaterial( 0.1,0.25);
	scene.add(planeDown);
	


	var planeUp = new HUNT.Geometry.plane(new HUNT.Vector3(0, -1, 0), -20);
	planeUp.material = new HUNT.Materials.phong(HUNT.Color.up, HUNT.Color.white, 10,0.25,0,"diffuse");
	scene.add(planeUp);
	
	var planeFront = new HUNT.Geometry.plane(new HUNT.Vector3(0, 0, 1), 3);
	planeFront.material = new HUNT.Materials.phong(HUNT.Color.front, HUNT.Color.white, 19, 0.25,0,"diffuse");
	scene.add(planeFront);

	var planeRight = new HUNT.Geometry.plane(new HUNT.Vector3(-1, 0, 0), -10);
	planeRight.material = new HUNT.Materials.phong(HUNT.Color.right, HUNT.Color.white, 19, 0.25,0,"diffuse");
	scene.add(planeRight);

	var planeLeft = new HUNT.Geometry.plane(new HUNT.Vector3(1, 0, 0), -10);
	planeLeft.material = new HUNT.Materials.phong(HUNT.Color.left, HUNT.Color.white, 19, 0.25,0,"diffuse");
	scene.add(planeLeft);

	var light1 = new HUNT.Light.PointLight(HUNT.Color.white.multiply(100), new HUNT.Vector3(-0, 10, 18));
	//var light = new HUNT.Light.DirectionalLight(HUNT.Color.white, new HUNT.Vector3(-1.75, -2, -1.5));

	HUNT.render(camera,scene,[light1]);

	/*var tree = new HUNT.Struct.rayTracingTree();
	tree.data = 1;
	tree.initlize();

	var tree = new HUNT.Struct.rayTracingTree();
	var p = tree;*/
 }