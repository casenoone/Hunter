HUNT.Struct.rayTracingTree = function(){

	this.data = 0;
	this.lchild = null;
	this.rchild = null;


}

HUNT.Struct.rayTracingTree.prototype = {

	initlize : function() {

		this.lchild = new HUNT.Struct.rayTracingTree();
		this.rchild = new HUNT.Struct.rayTracingTree();

	}

}