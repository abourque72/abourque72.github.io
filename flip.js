let poly;
let inp;
let poly_c = false;

function setup() {
	createCanvas(720, 720);
	
	inp = createInput();
	inp.position(0,50);
	let bu = createButton('submit');
	bu.position(inp.width, 50);
	bu.mousePressed(init_poly);
	
}

function draw() {
	background(0);
	
	stroke(0);
	fill(255, 255, 255);
	textAlign(LEFT);
	textSize(30);
	text('input number of sides', 0, 40);
	
	if (poly_c) {
		poly.draw_poly();
		poly.draw_diagonals();
	}
}

function init_poly() {
	let n = int(inp.value());
	if (n < 3) {
		n = 3;
	}
	else if (n > 100) {
		n = 100;
	}
	poly = new Polyy(n, 300);
	poly_c = true;
}

class Polyy {
	constructor(sides, radius) {
		this.sides = sides;
		this.radius = radius;
		this.points = this.get_points();
		this.triangles = this.get_triangles();
		this.diagonals = this.get_diagonals();
	}
	draw_poly() {
		stroke(0);
		translate(width * 0.5, height * 0.5);
		beginShape();
		for (let i = 0; i < this.sides; i++) {
			vertex(this.points[i][0],this.points[i][1]);
		}
		endShape(CLOSE);
	}
	draw_diagonals() {
		for (let i = 0; i < this.sides - 3; i++) {
			stroke(0, 0, 255);
			strokeWeight(2);
			line(this.diagonals[i][0][0], this.diagonals[i][0][1], this.diagonals[i][1][0], this.diagonals[i][1][1]); 
		}
	}
	get_points() {
		let points = [];
		let angle = TWO_PI / this.sides;
		for (let a = 0; a < TWO_PI; a += angle) {
			let sx = cos(a) * this.radius;
			let sy = sin(a) * this.radius;
			append(points, [sx,sy]);
		}
		return points;
	}
	get_triangles() {
		let triangles = [];
		for (let i = 1; i < this.sides - 1; i++) {
			append(triangles, [this.points[0], this.points[i], this.points[i+1] ]);
		}
		return triangles;
	}
	get_diagonals() {
		let diagonals = [];
		for (let i = 2; i < this.sides - 1; i++) {
			append(diagonals, [this.points[0], this.points[i]]);
		}
		return diagonals;
	}
	flip(i) {
		let p3_1;
		let p3_2;
		let t_1;
		let t_2;
		let tr_1;
		let tr_2;
		let first = false;
		
		let di = this.diagonals[i];
		
		for (let t = 0; t < this.sides - 2; t++) {
			if (subs(di, this.triangles[t]) && !first) {
				t_1 = t;
				tr_1 = this.triangles[t];
				first = true;
			}
			else if (subs(di, this.triangles[t]) && first) {
				t_2 = t;
				tr_2 = this.triangles[t];
			}
		}
		
		p3_1 = get_other(tr_1, di);
		p3_2 = get_other(tr_2, di);

		this.diagonals.splice(i,1);
		this.triangles.splice(t_2,1);
		this.triangles.splice(t_1,1);
		
		append(this.diagonals, [p3_1,p3_2]);
		append(this.triangles, [di[0], p3_1, p3_2]);
		append(this.triangles, [di[1], p3_1, p3_2]);
	}
}

function cont(a, o) { //does a contain o
	for (let i = 0; i < a.length; i++) {
		if (a[i] == o) {
			return true;
		}
	}
	return false;
}

function subs(a, b) { //is a "subset" of b
	let r = true;
	for (let i = 0; i < a.length; i++) {
		if (!cont(b,a[i])) {
			r = false;
		}
	}
	return r;
}

function are_points_equal(p1, p2) {
	return (p1[0] == p2[0] && p1[1] == p2[1]);
}

function get_other(t, d) {
	for (let i = 0; i < 3; i++) {
		if (!are_points_equal(t[i], d[0]) && !are_points_equal(t[i], d[1])) {
			return t[i];
		}
	}
}

//note: I am obviously aware that this is NOT the actual distance of a point to a line
function dist_to_line(di, p) {
	let d = dista(di[0], di[1]);
	let d1 = dista(p, di[0]);
	let d2 = dista(p, di[1]);
	return abs(d1+d2-d);
}

function dista(p1, p2) {
	return sqrt(sq(p1[0]-p2[0]) + sq(p1[1]-p2[1]));
}

function mouseClicked() {
	if (poly_c) {
		let d = 1;
		let m = [mouseX - 0.5 * width, mouseY - 0.5 * height];
		for (let i = 0; i < poly.sides - 3; i++) {
			if (dist_to_line(poly.diagonals[i], m) < d) {
				poly.flip(i);
				break;
			}
		}
	}
}