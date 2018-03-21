var cvs = document.getElementById("myCanvas");
var ctx = cvs.getContext("2d");

var cvs = document.getElementById('mycanvas');

const box=25;

ctx.fillStyle = "#ffc34d";
ctx.fillRect(0,0,24*box,24*box);
ctx.fillStyle = "#ffb31a";
ctx.fillRect(0,0,24*box,2*box);
ctx.fillStyle = "#ffb31a";
ctx.fillRect(0,0,box,24*box);
ctx.fillStyle = "#ffb31a";
ctx.fillRect(0,23*box,24*box,box);

ctx.fillStyle = "#ffb31a";
ctx.fillRect(23*box,0,box,24*box);


snake = [];
snake[0] = {
	x : 11*box,
	y : 10*box
}
snake[1] = {
	x:snake[0].x-box,
	y:snake[0].y
}
snake[2] = {
	x:snake[1].x,
	y:snake[1].y-box
}

var score = 0;

var d = "right";

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "right"){
        d = "left";
    }else if(key == 38 && d != "down"){
        d = "up";
    }else if(key == 39 && d != "left"){
        d = "right";
    }else if(key == 40 && d != "up"){
        d = "down";
    }
}

food = {
	x : 0,
	y : 0
}
var snake_color = 1;
function make_food() {
	var cheak=1;
	while(cheak){
		food.x = Math.floor(Math.random()*22+1) * box;
		food.y = Math.floor(Math.random()*21+2) * box;
		for (var i = 0; i < snake.length; i++) {
			if(food.x==snake[i].x&&food.y==snake[i].y)
			{
				cheak=1;
			}else{
				cheak = 0;
			}
		}
	}
	ctx.fillStyle = "green";
	ctx.fillRect(food.x,food.y,box,box);
}
make_food();

function collision() {
	for (var i = 1; i < snake.length; i++) {
		if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y)
		{
			return true;
		}
	}
	return false;
}

function draw_snake() {

	ctx.fillStyle = "#ffc34d";
	ctx.fillRect(0,0,24*box,24*box);
	ctx.fillStyle = "#ffb31a";
	ctx.fillRect(0,0,24*box,2*box);
	ctx.fillStyle = "#ffb31a";
	ctx.fillRect(0,0,box,24*box);
	ctx.fillStyle = "#ffb31a";
	ctx.fillRect(0,23*box,24*box,box);
	ctx.fillStyle = "#ffb31a";
	ctx.fillRect(23*box,0,box,24*box);
	ctx.fillStyle = "green";
	ctx.fillRect(food.x,food.y,box,box);
	

	if (snake[0].x > 22*box||snake[0].y>22*box||snake[0].x<box||snake[0].y<2*box||collision()) {
		clearInterval(game);
		snake_color = 0;
	
	}

	if (snake[0].x == food.x && snake[0].y == food.y) {
		make_food();
		score++;
	}else{
		snake.pop();
	}
	for (var i = 0; i < snake.length; i++) {
		if (snake_color == 0) {
			ctx.fillStyle = "black";
		}
		else if(i == 0){
			ctx.fillStyle = "red";
		}else{
			ctx.fillStyle = "white";
		}
		
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
	}
	ctx.fillStyle = "red";
	ctx.fillRect(snake[0].x,snake[0].y,box,box);
	snakex = snake[0].x;
	snakey = snake[0].y;

	if (d == "right") {
		snakex +=box;
	}else if(d == "left"){
		snakex -=box;
	}else if(d == "up"){
		snakey -=box;
	}else if(d == "down"){
		snakey +=box;
	}

	newhead = {
		x : snakex ,
		y : snakey
	}
	
	snake.unshift(newhead);

	ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText("Score:-"+score,2*box,1.6*box);

    ctx.fillStyle = "#3333ff";
    ctx.font = "25px Changa one";
    ctx.fillText("Dveloper : Jugal Kishore Chanda",5*box,23.6*box);
}

let game = setInterval(draw_snake,100);



