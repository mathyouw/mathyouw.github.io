// demo.js 
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for context 
var c = canvas.getContext('2d');
var cirArray = [];
var mouse = {
	x: undefined,
	y: undefined
}
var MAXradius = 40;

var color = [
'blue',
'red',
'orange',
'green',
'yellow',
];

//event listeners
window.addEventListener('mousemove',
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;

})
window.addEventListener('resize', 
	function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		init();

});

//circle object
function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.MiniRadius = radius;
	this.radius = radius;
	this.color = color[Math.floor(Math.random() * color.length)];
	//Draws all the circles.
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius,0, Math.PI * 2, false);
		c.strokeStyle = 'blue';
		c.stroke();
		c.fillStyle = this.color;
		c.fill();
	}
	// Updates the changes in the circles.
	this.update = function(){
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
		this.dx = -this.dx;
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
		// interact 
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
			if(this.radius < MAXradius){
				this.radius += 1;
			}
			
		}
		else if (this.radius > this.MiniRadius){
			this.radius -= 1;
		}
		this.draw();
	}
}


//Initalizes mainly for resize
function init(){
		cirArray = [];
		for (var i = 800; i >= 0; i--) {
			var radius = (Math.random() * 3) + 1;
			var x = Math.random() * (innerWidth - radius * 2) + radius;
			var y = Math.random() * (innerHeight - radius * 2) + radius;
			var dx = (Math.random() - 0.5) * 2;
			var dy = (Math.random() - 0.5) * 2;
			cirArray.push(new Circle(x, y, dx, dy, radius));
		}

}

//amimation
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0, innerWidth, innerHeight);
	for(var i = 0; i < cirArray.length; i++){
		cirArray[i].update();
	}
}

// Have to call them.
init();
animate();