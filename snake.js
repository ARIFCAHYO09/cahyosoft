window.onload=function() {
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	setInterval(game,1000/15);
}
score=0;
hiscore=0;
px=py=0;
gs=tc=20;
ax=ay=10;
xv=yv=0;
trail=[];
tail = 5;
class titik {
	constructor(id,x,y,block,parentid) {
		this.id=id;
		this.x=x;
		this.y=y;
		this.block=block;
		this.parentid=parentid;
	}	
}
openlist = [];
closelist = [];
node = [];
rute= [];

function game() {
	
	px+=xv;
	py+=yv;
	if(px<0) {
		px= tc-1;
	}
	if(px>tc-1) {
		px= 0;
	}
	if(py<0) {
		py= tc-1;
	}
	if(py>tc-1) {
		py= 0;
	}
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);

	ctx.fillStyle="lime";
	for(var i=0;i<trail.length;i++) {
		ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
		if(trail[i].x==px && trail[i].y==py) {
			tail = 5;
			score=0;
		}
	}
	trail.push({x:px,y:py});
	while(trail.length>tail) {
	trail.shift();
	}

	
	ctx.fillStyle="red";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
	node=[];
	tot=0
	for(i=0;i<20;i++) {
		for(j=0;j<20;j++) {
			node[node.length] = new titik(tot,i,j,0,null);
			ctx.fillStyle="lightblue";
			ctx.fillText((tot),(node[tot].x*20),(node[tot].y*20+10));
			tot++;
		}
	}
	for(i=0;i<node.length;i++) {
		if(trail[trail.length-1].x==node[i].x && trail[trail.length-1].y==node[i].y) {
			s=node[i].id;
		}
		if(ax==node[i].x && ay==node[i].y) {
			d=node[i].id;
		}
	}
	tes=[];

	closelistsatu();
	cari_rute(s,d);
	makan();
	bertahan();
	if(ax==px && ay==py) {
		score++;
		if(score>hiscore)
			hiscore=score;
		document.getElementById("score").innerHTML=score;
		document.getElementById("hiscore").innerHTML=hiscore;
		tail++;
		food=node[Math.floor(Math.random()*399)];
		ax=food.x;
		ay=food.y;
		while(food.block==1) {
		food=node[Math.floor(Math.random()*399)];
		ax=food.x;
		ay=food.y;
		}
	}
	for(i=0;i<node.length;i++) {
		if(node[i].block==1)
			tes[tes.length]=node[i].id;
	}
	console.log(tes);
}

function makan() {
	if(rute[1]!=null) {
		if(node[s+1]!=null) {
			if(s+1==rute[1] && node[s+1].x==node[s].x && node[s+1].y==node[s].y+1) {
				xv=0;
				yv=1;
			}
		}
		if(node[s-1]!=null) {
			if(s-1==rute[1] && node[s-1].x==node[s].x && node[s-1].y==node[s].y-1) {
				xv=0;
				yv=-1;
			}
		}
		if(node[s-20]!=null) {
			if(s-20==rute[1] && node[s-20].x==node[s].x-1 && node[s-20].y==node[s].y) {
				xv=-1;
				yv=0;
			}
		}
		if(node[s+20]!=null) {
			if(s+20==rute[1] && node[s+20].x==node[s].x+1 && node[s+20].y==node[s].y) {
				xv=1;
				yv=0;
			}
		}
	}

}

function bertahan() {
	if(rute[1]==null) {
		if(node[s+1]!=null) {
			if(node[s+1].block==0 && node[s+1].x==node[s].x && node[s+1].y==node[s].y+1) {
				xv=0;
				yv=1;
			}
		}
		if(node[s-1]!=null) {
			if(node[s-1].block==0 && node[s-1].x==node[s].x && node[s-1].y==node[s].y-1) {
				xv=0;
				yv=-1;
			}
		}
		if(node[s-20]!=null) {
			if(node[s-20].block==0 && node[s-20].x==node[s].x-1 && node[s-20].y==node[s].y) {
				xv=-1;
				yv=0;
			}
		}
		if(node[s+20]!=null) {
			if(node[s+20].block==0 && node[s+20].x==node[s].x+1 && node[s+20].y==node[s].y) {
				xv=1;
				yv=0;
			}
		}
	}

}

function closelistsatu() {
	for(i=0;i<node.length;i++) {
			for(j=0;j<trail.length-1;j++) {
				if(node[i].x==trail[j].x && node[i].y==trail[j].y)
					node[i].block=1;
			}
		}
}

function keyPush(evt) {
	switch(evt.keyCode) {
		case 37:
			xv=-1;yv=0;
			break;
		case 38:
			xv=0;yv=-1;
			break;
		case 39:
			xv=1;yv=0;
			break;
		case 40:
			xv=0;yv=1;
			break;
	}
}