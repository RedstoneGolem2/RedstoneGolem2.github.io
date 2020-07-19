let canvas = document.getElementById("ourCanvas");
let context = canvas.getContext("2d");  
canvas.width = 256; 
canvas.height = 512; 
BallX = canvas.width/3;
BallY = canvas.height/2;
let Y = 0;
let gravity = 0.1;
let death = false;
let radius = 15;
let isJumping = false;
let PW=50;
let PH=120;
let pipeSpeed = 0.7;
let Coins=0;
let megdu = 175;
let inPipe = false;
let isStarted = false;
let a = 1;
let BestCoins = 0;

let PLX=0;
let PLX2=256;
let PLX3=512;

let pipeUp = new Image();
let pipeDown = new Image();
let bg = new Image();
let road = new Image();
let jet = new Image();
let robo = new Image();
let tabl = new Image();
let restart = new Image();

let score = new Audio();
let fly = new Audio();
let ded = new Audio();

let mouseX = 0;
let mouseY = 0;

pipeUp.src = "img/pipeUp.png";
pipeDown.src = "img/pipeBottom.png";
bg.src = "img/back.png";
road.src = "img/road.png";
jet.src = "img/jet.png";
robo.src = "img/robocat.png";
tabl.src = "img/score.png";
restart.src = "img/restart.png";

score.src = "audio/score.mp3";
fly.src = "audio/fly2.mp3";
ded.src = "audio/dead.mp3";




RPY=Math.floor(Math.random()*(canvas.height-200));
RPY2=Math.floor(Math.random()*(canvas.height-200));
RPY3=Math.floor(Math.random()*(canvas.height-200));
PX=canvas.width;
PX2=canvas.width+megdu;
PX3=canvas.width+megdu*2;

function draw(){
	context.beginPath();
	
	// context.fillStyle = "skyblue";
	// context.fillRect(0,0,canvas.width,canvas.height);
	context.drawImage(bg,0,0);
	if(isStarted==false){
		context.font = "24px serif";
		context.fillText("press 'Space' to start",canvas.width/10,canvas.height/3);
		Y=0;
		gravity=0;
	}else{
		gravity=0.05;
	}
	if(BallY>(canvas.height-canvas.height/8)-radius){
		death=true;

		Y=0;
		BallY=(canvas.height-canvas.height/8)-radius
		gravity=0;
	}
	if(PX<(0-PW)){
		PX+=megdu*3;
	}else if(PX2<(0-PW)){
		PX2+=megdu*3;
	}else if(PX3<(0-PW)){
		PX3+=megdu*3;
	}
	if(PLX<-256){
		PLX=512;
	}else if(PLX2<-256){
		PLX2=512;
	}else if(PLX3<-256){
		PLX3=512;
	}
	if(PX==canvas.width){
		RPY=Math.floor(Math.random()*(canvas.height-200));
	}else if(PX2==canvas.width){
		RPY2=Math.floor(Math.random()*(canvas.height-200));
	}else if(PX3==canvas.width){
		RPY3=Math.floor(Math.random()*(canvas.height-200));
	}
	context.fillStyle = "lime";

	context.drawImage(pipeUp,PX,RPY-512);
	context.drawImage(pipeDown,PX,RPY+PH);
	context.drawImage(pipeUp,PX2,RPY2-512);
	context.drawImage(pipeDown,PX2,RPY2+PH);
	context.drawImage(pipeUp,PX3,RPY3-512);
	context.drawImage(pipeDown,PX3,RPY3+PH);
	if(BallX+radius>PX && BallX-radius<PX+PW){
		if(BallY+radius>RPY+PH){
			death=true;
		}else if(BallY-radius<=RPY){
			death=true;
		}else{
			if(inPipe==false){
				Coins++;
				score.play();
				inPipe=true;
			}
		}
	}else if(BallX+radius>PX2 && BallX-radius<PX2+PW){
		if(BallY+radius>RPY2+PH){
			death=true;
		}else if(BallY-radius<=RPY2){
			death=true;
		}else{
			if(inPipe==false){
				Coins++;
				score.play();
				inPipe=true;
			}
		}
	}else if(BallX+radius>PX3 && BallX-radius<PX3+PW){
		if(BallY+radius>RPY3+PH){
			death=true;
		}else if(BallY-radius<=RPY3){
			death=true;
		}else{
			if(inPipe==false){
				Coins++;
				score.play();
				inPipe=true;
			}
		}
	}else{
		inPipe=false;
	}
	Y+=gravity;
	BallY+=Y;
	if(Y<0){
		if(isJumping==true){
			context.drawImage(jet,BallX-10.5,BallY+radius);
			fly.play();
		}
	}
	context.drawImage(road,PLX,canvas.height-canvas.height/8);//road
	context.drawImage(road,PLX2,canvas.height-canvas.height/8);//road
	context.drawImage(road,PLX3,canvas.height-canvas.height/8);//road
	context.drawImage(robo,BallX-radius,BallY-radius);
	if(death==false){
		if(isStarted==true){
			PX-=pipeSpeed;
			PX2-=pipeSpeed;
			PX3-=pipeSpeed;
			PLX-=pipeSpeed;
			PLX2-=pipeSpeed;
			PLX3-=pipeSpeed;
		}
	}else{
		if(a==1){
			ded.play();
			a=0;
		}
		if(BestCoins<Coins){
			BestCoins=Coins;
		}
		inPipe=true;
		context.drawImage(tabl,42,102.4);//////////////tabl
		context.drawImage(restart,20,341.3);
		context.fillStyle = "black";
		context.font = "36px Britannic";
		context.fillText(Coins,canvas.width/2.1,200);
		context.fillText(BestCoins,canvas.width/2.1,285);


		if(mouseX>20&&mouseX<234&&mouseY>341.3&&mouseY<416.3){
			reset();
		}
	}
	context.fillStyle = "black";
	context.font = "36px serif";
	context.fillText(Coins,canvas.width/2.2,canvas.height-10);

	context.closePath();
}

function jump(){
	Y-=2.5;
}

function rand(){
	RPY=Math.floor(Math.random()*(canvas.height-100))+100;
	RPY2=Math.floor(Math.random()*(canvas.height-100))+100;
	RPY3=Math.floor(Math.random()*(canvas.height-100))+100;
}

addEventListener("keydown", startMove);

function startMove(e){
	if(isStarted==true){
		if(death==false){
			if(e.keyCode == 32){
				if(isJumping==false){
					Y=0;
					jump();
					isJumping=true;
				}
			}
		}
	}
	if(isStarted==false){
		if(e.keyCode == 32){
			Y=0;
			jump();
			isStarted=true;
			isJumping=true;
		}
	}

}

addEventListener("keyup", stopMove);

function stopMove(e){
	if(e.keyCode == 32){
		isJumping=false;
	}
}

addEventListener("click", onClick);

function onClick(e){
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
}

function reset(){
	BallX = canvas.width/3;
	BallY = canvas.height/2;
	Y = 0;
	gravity = 0.05;
	death = false;
	radius = 15;
	isJumping = false;
	PW=50;
	pipeSpeed = 0.7;
	Coins=0;
	megdu = 150;
	inPipe = false;
	isStarted = false;
	a = 1;
	PLX=0;
	PLX2=256;
	PLX3=512;
	mouseY=0;
	mouseX=0;
	RPY=Math.floor(Math.random()*(canvas.height-200));
	RPY2=Math.floor(Math.random()*(canvas.height-200));
	RPY3=Math.floor(Math.random()*(canvas.height-200));
	PX=canvas.width;
	PX2=canvas.width+megdu;
	PX3=canvas.width+megdu*2;
}



setInterval(draw, 10);



//context.strokeStyle = "red";
//context.fillStyle = "red";
//context.strokeRect(x,y,x1,y1);
//context.fillRect(x,y,x1,y1);

//context.lineWidth = 5;
// context.moveTo(x,y);
// context.lineTo(x,y);
// context.stroke();
