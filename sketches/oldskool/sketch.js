var palette = [];
var firedemo;
var plasmademo;
var w = 150;
var h = 150;
var fire = new Array(h).fill(0).map(() => new Array(w).fill(0));
var demos = [];
var cur_demo = 0;

class Plasma {
  setup() {
    colorMode(HSL, 255);
    palette = [];
    for(var i = 0; i < 256; i++) {
      palette.push(color(i,300,120));
    }
  }

  draw(pixels) {
    var t1 = 0;
    var v = 0;
    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
	// [lines]
	// var v = map(sin((x+y+mouseX)/10), 0, 1, 0, 255);

	// [circles]
	// var v = map(sin(sqrt((x-width/2.0)*(x-width/2.0)+(y-height/2.0)*(y-height/2.0))/8.0),
	// 	    0, 1,
	// 	    0, 255);

	// [dots?]
	// var v2 = ceil((128.0 + (128.0*sin(x/16.0))
	// 	       + 128.0 + (128*sin(y/16.0)))/2.0) % 256;
	// var v = palette[min(255,v2)];
	// console.log(v);

	// another pattern
	// var t1 = millis()*0.1;
	// var v = palette[(floor(t1+128.0 + (128.0 * sin(x / 16.0))
	// 		       + 128.0 + (128.0 * sin(y / 32.0))
	// 		       + 128.0 + (128.0 *sin(sqrt((x-width/2.0)*(x-width/2.0)
	// 						  + (y-height/2.0)*(y-height/2.0)))/8.0)
	// 		       + 128.0 + (128.0*sin(sqrt(t1+x*x+y*y))/8.0))) % 256];

	t1 = millis()*0.1;
	v = palette[round(t1+128.0 + (128.0*sin(t1*0.001+x/16.0))
			  + 128.0 + (128.0*sin(t1*0.001+y/8.0))
			  + 128.0 + (128.0*sin((t1*0.01+x+y)/16.0))
			  + 128.0 + (128.0*sin(sqrt(x*x+y*y))/8.0)) % 256];

	try {
	  pixels[c1(x,y,0)] = red(v);
	  pixels[c1(x,y,1)] = green(v);
	  pixels[c1(x,y,2)] = blue(v);
	  pixels[c1(x,y,3)] = 255;
	} catch {
	  console.log("v: "+v);
	  console.log("palette.lenght: "+palette.length);
	}
      }
    }
  }
}

class Fire {
  setup() {
    colorMode(HSL, 255);
    palette = [];
    for(var i = 0; i < 256; i++) {
      // palette.push(lerpColor(from, to, i/256));
      palette.push(color(i/3.0, 255, min(255, i*2)));
    }
  }

  draw() { 
    for(var x = 0; x < width; x++)
      fire[height-1][x] = random(255);

    for(var y = 0; y < height-1; y++) {
      for(var x = 0; x < width; x++) {
	fire[y][x] = ((fire[(y+1) % height][(x-1+width) % width]
		       + fire[(y+1) % height][x % width]
		       + fire[(y+1) % height][(x+1) % width]
		       + fire[(y+2) % height][x % width])*(31/129.0));
	var p = palette[ceil(fire[y][x])];
	pixels[c1(x, y, 0)] = red(p);
	pixels[c1(x, y, 1)] = green(p);
	pixels[c1(x, y, 2)] = blue(p);
	pixels[c1(x, y, 3)] = 255;
      }
    }
  }
}

function setup() {
  createCanvas(w, h);
  pixelDensity(1);

  
  demos.push(new Fire());
  demos.push(new Plasma());
  cur_demo = 0;

  demos[cur_demo].setup();
}

function c1(x, y, c) {
  return 4*(x+y*width)+c;
}

function draw() {
  background(0);

  loadPixels();
  demos[cur_demo].draw(pixels);
  updatePixels();
}

function mouseClicked() {
  cur_demo = (cur_demo+1) % demos.length;
  demos[cur_demo].setup()
}
