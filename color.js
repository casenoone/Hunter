HUNT.Color = function(r, b, g) {this.r = r; this.b = b; this.g = g};

HUNT.Color.prototype = {
    //copy : function() { return new Color(this.r, this.g, this.b); },
    add : function(c) { return new HUNT.Color(this.r + c.r, this.g + c.g, this.b + c.b); },
    multiply : function(s) { return new HUNT.Color(this.r * s, this.g * s, this.b * s); },
    modulate : function(c) { return new HUNT.Color(this.r * c.r, this.g * c.g, this.b * c.b); }
};
 
HUNT.Color.black = new HUNT.Color(0, 0, 0);
HUNT.Color.white = new HUNT.Color(1, 1, 1);
HUNT.Color.red = new HUNT.Color(1, 0, 0);
HUNT.Color.green = new HUNT.Color(0, 1, 0);
HUNT.Color.blue = new HUNT.Color(0, 0, 1);

HUNT.Color.down = new HUNT.Color(0.75,0.75,0.75);
HUNT.Color.up = new HUNT.Color(0.75,0.75,0.75);
HUNT.Color.front = new HUNT.Color(0.75,0.75,0.75);
HUNT.Color.right = new HUNT.Color(0.25,0.25,0.75);
HUNT.Color.left = new HUNT.Color(0.75,0.25,0.25);
