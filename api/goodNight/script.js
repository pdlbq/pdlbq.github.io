//global
var WIDTH;
var HEIGHT;
var ctx;
var canvas;
var x1 = 0, y1 = -90;
var angle = 0;

const text = document.querySelector('.text');
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

let letters = document.querySelectorAll('span');
let i = 0;
let go1 = setInterval(() => {
    test();
}, 1000);
let go;
function test() {
    clearInterval(go1);
    go = setInterval(()=>{
        letters[getRandomInt(letters.length)].classList.add('active');
        i++;
        if(i>20) {
            stop();
        }
    }, 200);
}


function stop(){
    clearInterval(go);
    createCanvas(800, 600, "#111");
    ctx.translate(WIDTH/2, HEIGHT/2);
    start();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



function createCanvas(WIDTH_, HEIGHT_, COLOR, IMG = false)
{
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	WIDTH = WIDTH_;
	HEIGHT = HEIGHT_;
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.style.position = 'fixed';
	canvas.style.left = 0;
	canvas.style.top = 0;
	document.body.appendChild(canvas);
    canvas.style.background = COLOR;
    if(IMG)
    {
    	canvas.style.background = "url(" + IMG + ")";
    }

}
function cls()
{
	ctx.clearRect(-WIDTH/2, -HEIGHT/2, WIDTH*2, HEIGHT*2);
}

function rect(x, y)
{

	ctx.strokeStyle = "#f00";

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	x1 = x;
	y1 = y;
	ctx.lineTo(x, y);
	ctx.stroke();
}
function start()
{
	//cls();
	//update();
	draw();
	requestAnimationFrame(start);
}

function draw()
{
    x = 16*Math.pow(Math.sin(angle),3)*18;
    y = (13*Math.cos(angle) - 5*Math.cos(2*angle) - 2*Math.cos(3*angle)-Math.cos(4*angle))*18;
    ///console.log((13*Math.cos(0) - 5*Math.cos(2*0) - 2*Math.cos(3*0)-Math.cos(4*0))*18)
    rect(x, -y);
    angle += 0.005;

}