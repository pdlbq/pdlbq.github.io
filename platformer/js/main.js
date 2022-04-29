const setupData = {
	tw: 50,
	th: 20,
	tile: 32,
};

const STATEGAME = {mainMenu: 0, game: 1};
let stateGame = STATEGAME.mainMenu;


const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fps = 60;
const step = 1 / fps;
let dt = 0;
let now, last = utils.timestamp();


const controller = new Controller();

console.log(controller)

const menu = new Menu();
menu.init(controller, canvas.width, canvas.height);

const player = new Player(controller, canvas.width, canvas.height);
const map = new Map();
const enemy = [];
const exit = new Interact();
const coin = [];
const stakes = [];
const magma = [];

let DATA;


function update(dt) {
	player.update(dt);

	for(let i = 0; i < enemy.length; i++) {
		enemy[i].update(dt);
		if(player.killEnemy(enemy[i])) {
			console.log('kill enemy');
			enemy.splice(i, 1);
		}
	}

	for(let i = 0; i < coin.length; i++) {
		coin[i].update(dt);

		if(coin[i].intersect(player)) {
			coin.splice(i, 1);
			player.setCoin();
		}
	}




}

function render(ctx) {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	map.render(ctx, player.getOffset());
	player.render(ctx, player.getOffset());
	player.renderButton(ctx);

	for(let i = 0; i < enemy.length; i++) {
		enemy[i].render(ctx, player.getOffset());
	}

	for(let i = 0; i < coin.length; i++) {
		coin[i].render(ctx, player.getOffset());
	}

	player.renderInterface(ctx, coin.length);

	if(exit.intersect(player)) {
		if(player.exit(ctx, coin.length)){
			stateGame = STATEGAME.mainMenu;
			console.log(stateGame)
			menu.init(controller, canvas.width, canvas.height);
		}
	}

}

function animate() {

	switch(stateGame) {
		case STATEGAME.mainMenu:
			menu.update();
			if(menu.getStart()) {
				DATA = 0;
				stateGame = STATEGAME.game;
				start(6);

				return;
			}
			ctx.clearRect(0,0,canvas.width, canvas.height);
			menu.render(ctx);
			break;
		case STATEGAME.game:
			now = utils.timestamp();
			dt = dt + Math.min(1, (now - last) / 1000);
			while(dt > step) {
				dt -= step;
				update(step);
			}

			render(ctx);
			last = now;
			break;
	}



	requestAnimationFrame(animate);
}

animate();

function setup(mapData) {

	map.init(setupData, mapData.layers[0].data) ;

    let objects = mapData.layers[1].objects;
    for(let i = 0 ; i < objects.length ; i++) {
		let obj = objects[i];
		switch(obj.name) {
			case "player"   : player.init({x: obj.x, y: obj.y}, {x: obj.width, y: obj.height}, objects); break;
			case "enemy"  :
				let lastIndex = enemy.length;
				enemy.push(new Enemy());
				enemy[lastIndex].setSprite(resources.get('images/player.png'));
				enemy[lastIndex].init({x:obj.x, y:obj.y}, {x: obj.width, y: obj.height}, objects);
				break;
			case 'exit':
				exit.init({x: obj.x, y: obj.y}, {w: obj.width, h: obj.height});
				break;
			case 'coin':
				let lastIndexCoin = coin.length;
				coin.push(new Interact());
				coin[lastIndexCoin].setSprite(resources.get('images/coin.png'));
				coin[lastIndexCoin].init({x: obj.x, y: obj.y}, {w: 20, h: obj.height});
				break;
			case 'stakes':
				let lastIndexStakes = stakes.length;
				stakes.push(new Interact());
				stakes[lastIndexStakes].init({x: obj.x, y: obj.y}, {w: obj.width, h: obj.height});
				break;
			case 'magma':
				let lastIndexMagma = magma.length;
				magma.push(new Interact());
				magma[lastIndexMagma].init({x: obj.x, y: obj.y}, {w: obj.width, h: obj.height});
				break;
		}
    }


    animate();


}


function start(level) {




		DATA = { "compressionlevel":-1,
 "height":20,
 "infinite":false,
 "layers":[
        {
         "data":[11, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 11,
            11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11,
            11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11,
            11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 2, 2, 4, 0, 0, 0, 0, 0, 1, 1, 8, 8, 1, 1, 1, 1, 0, 0, 0, 0, 11,
            11, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 8, 8, 2, 7, 6, 6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11,
            11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 3, 3, 3, 3, 0, 0, 0, 0, 4, 4, 0, 0, 0, 6, 6, 2, 2, 8, 8, 2, 0, 0, 0, 7, 0, 0, 0, 0, 2, 0, 0, 0, 0, 11,
            11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 7, 0, 0, 0, 0, 4, 0, 0, 0, 0, 11,
            11, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 4, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 6, 0, 0, 0, 0, 0, 0, 0, 2, 7, 0, 0, 2, 2, 4, 2, 2, 2, 2, 11,
            11, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 4, 7, 2, 8, 8, 3, 3, 3, 3, 0, 0, 11, 6, 0, 0, 0, 0, 0, 0, 2, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11,
            11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 3, 3, 3, 3, 3, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 0, 0, 0, 0, 0, 2, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11,
            11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 0, 0, 0, 2, 2, 5, 6, 11, 7, 4, 2, 2, 2, 2, 2, 2, 0, 0, 11,
            11, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 3, 3, 3, 3, 3, 3, 3, 7, 7, 2, 2, 0, 0, 0, 5, 6, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 11,
            11, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 3, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 5, 6, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 11,
            11, 7, 7, 8, 8, 2, 2, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 9, 10, 0, 0, 0, 0, 2, 2, 8, 8, 2, 2, 2, 11,
            11, 0, 7, 7, 7, 7, 0, 0, 4, 4, 7, 4, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 0, 0, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11,
            11, 0, 0, 0, 0, 0, 0, 0, 4, 4, 7, 2, 2, 2, 0, 0, 0, 0, 0, 7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11,
            11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 7, 0, 4, 4, 0, 0, 0, 0, 0, 0, 7, 3, 0, 0, 0, 0, 0, 9, 10, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 11,
            11, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 5, 6, 0, 0, 0, 0, 0, 0, 1, 6, 0, 0, 0, 11,
            7, 7, 7, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 7, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 9, 10, 0, 0, 0, 0, 0, 1, 6, 6, 0, 0, 0, 11,
            6, 6, 5, 5, 6, 10, 10, 10, 3, 3, 8, 8, 8, 8, 1, 1, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 4, 4, 3, 3, 3, 3, 8, 5, 6, 5, 6, 4, 4, 4, 4, 4, 9, 9, 9, 9, 9, 10, 11],
         "height":20,
         "id":1,
         "name":"\u0421\u043b\u043e\u0439 \u0442\u0430\u0439\u043b\u043e\u0432 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":50,
         "x":0,
         "y":0
        },
        {
         "draworder":"topdown",
         "id":2,
         "name":"\u0421\u043b\u043e\u0439 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 1",
         "objects":[
                {
                 "height":640,
                 "id":1,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":0,
                 "y":0
                },
                {
                 "height":32,
                 "id":3,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":32,
                 "y":544
                },
                {
                 "height":32,
                 "id":4,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":160,
                 "x":96,
                 "y":576
                },
                {
                 "height":32,
                 "id":5,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":256,
                 "y":608
                },
                {
                 "height":96,
                 "id":7,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":32,
                 "y":352
                },
                {
                 "height":32,
                 "id":8,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":192,
                 "x":160,
                 "y":416
                },
                {
                 "height":32,
                 "id":9,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":320,
                 "y":480
                },
                {
                 "height":32,
                 "id":10,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":64,
                 "y":448
                },
                {
                 "height":32,
                 "id":11,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":448,
                 "y":608
                },
                {
                 "height":96,
                 "id":12,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":512,
                 "y":512
                },
                {
                 "height":32,
                 "id":13,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":96,
                 "x":32,
                 "y":128
                },
                {
                 "height":32,
                 "id":14,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":32,
                 "y":256
                },
                {
                 "height":32,
                 "id":15,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":256,
                 "x":128,
                 "y":224
                },
                {
                 "height":96,
                 "id":16,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":352,
                 "y":256
                },
                {
                 "height":64,
                 "id":17,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":224,
                 "x":384,
                 "y":288
                },
                {
                 "height":32,
                 "id":18,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":224,
                 "x":384,
                 "y":160
                },
                {
                 "height":352,
                 "id":19,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":608,
                 "y":160
                },
                {
                 "height":32,
                 "id":20,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":640,
                 "y":256
                },
                {
                 "height":32,
                 "id":21,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":736,
                 "y":128
                },
                {
                 "height":32,
                 "id":23,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":832,
                 "y":128
                },
                {
                 "height":96,
                 "id":24,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":864,
                 "y":0
                },
                {
                 "height":64,
                 "id":25,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":864,
                 "y":96
                },
                {
                 "height":32,
                 "id":26,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":736,
                 "y":256
                },
                {
                 "height":8,
                 "id":29,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":672,
                 "y":280
                },
                {
                 "height":32,
                 "id":30,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":672,
                 "y":384
                },
                {
                 "height":32,
                 "id":31,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":352,
                 "x":704,
                 "y":352
                },
                {
                 "height":192,
                 "id":32,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":928,
                 "y":160
                },
                {
                 "height":32,
                 "id":33,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":992,
                 "y":160
                },
                {
                 "height":32,
                 "id":34,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":160,
                 "x":992,
                 "y":192
                },
                {
                 "height":32,
                 "id":35,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1120,
                 "y":160
                },
                {
                 "height":32,
                 "id":36,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":320,
                 "x":640,
                 "y":480
                },
                {
                 "height":32,
                 "id":37,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":928,
                 "y":512
                },
                {
                 "height":32,
                 "id":38,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":192,
                 "x":640,
                 "y":576
                },
                {
                 "height":32,
                 "id":39,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":928,
                 "y":608
                },
                {
                 "height":96,
                 "id":40,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":1088,
                 "y":544
                },
                {
                 "height":32,
                 "id":42,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":192,
                 "x":1088,
                 "y":320
                },
                {
                 "height":192,
                 "id":43,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1152,
                 "y":352
                },
                {
                 "height":32,
                 "id":44,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1152,
                 "y":288
                },
                {
                 "height":32,
                 "id":45,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1184,
                 "y":256
                },
                {
                 "height":32,
                 "id":46,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1216,
                 "y":224
                },
                {
                 "height":192,
                 "id":47,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1248,
                 "y":128
                },
                {
                 "height":32,
                 "id":48,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1184,
                 "y":96
                },
                {
                 "height":32,
                 "id":49,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":1312,
                 "y":96
                },
                {
                 "height":32,
                 "id":50,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1408,
                 "y":160
                },
                {
                 "height":32,
                 "id":51,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":160,
                 "x":1440,
                 "y":224
                },
                {
                 "height":32,
                 "id":52,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1344,
                 "y":224
                },
                {
                 "height":32,
                 "id":54,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":192,
                 "x":1312,
                 "y":320
                },
                {
                 "height":8,
                 "id":55,
                 "name":"solid ",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1280,
                 "y":120
                },
                {
                 "height":32,
                 "id":56,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1344,
                 "y":416
                },
                {
                 "height":32,
                 "id":57,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":1472,
                 "y":416
                },

                {
                 "height":32,
                 "id":58,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":96,
                 "x":1248,
                 "y":512
                },
                {
                 "height":32,
                 "id":59,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1376,
                 "y":576
                },
                {
                 "height":32,
                 "id":60,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1408,
                 "y":544
                },
                {
                 "height":32,
                 "id":61,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":96,
                 "x":1440,
                 "y":512
                },
                {
                 "height":64,
                 "id":62,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1440,
                 "y":544
                },
                {
                 "height":32,
                 "id":63,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":224,
                 "x":1376,
                 "y":608
                },
                {
                 "height":608,
                 "id":64,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1568,
                 "y":0
                },
                {
                 "height":32,
                 "id":67,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1056,
                 "y":448
                },
                {
                 "height":8,
                 "id":68,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1408,
                 "y":440
                },
                {
                 "height":16,
                 "id":69,
                 "name":"stakes",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1408,
                 "y":424
                },
                {
                 "height":16,
                 "id":70,
                 "name":"stakes",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1248,
                 "y":104
                },
                {
                 "height":24,
                 "id":71,
                 "name":"stakes",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1056,
                 "y":168
                },
                {
                 "height":24,
                 "id":72,
                 "name":"stakes",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1056,
                 "y":616
                },
                {
                 "height":16,
                 "id":73,
                 "name":"stakes",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":672,
                 "y":264
                },
                {
                 "height":24,
                 "id":74,
                 "name":"stakes",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":768,
                 "y":136
                },
                {
                 "height":24,
                 "id":75,
                 "name":"stakes",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":96,
                 "y":424
                },
                {
                 "height":24,
                 "id":76,
                 "name":"stakes",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":128,
                 "x":320,
                 "y":616
                },
                {
                 "height":64,
                 "id":77,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":256,
                 "y":448
                },
                {
                 "height":32,
                 "id":78,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":352,
                 "y":448
                },
                {
                 "height":32,
                 "id":79,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":32,
                 "y":0
                },
                {
                 "height":32,
                 "id":80,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":160,
                 "x":448,
                 "y":192
                },
                {
                 "height":64,
                 "id":81,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":576,
                 "y":224
                },
                {
                 "height":32,
                 "id":82,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":672,
                 "y":512
                },
                {
                 "height":32,
                 "id":83,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":768,
                 "y":160
                },
                {
                 "height":32,
                 "id":84,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":896,
                 "y":0
                },
                {
                 "height":32,
                 "id":85,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":96,
                 "x":832,
                 "y":608
                },
                {
                 "height":96,
                 "id":86,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1024,
                 "y":384
                },
                {
                 "height":64,
                 "id":87,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":992,
                 "y":96
                },
                {
                 "height":32,
                 "id":88,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":224,
                 "x":1344,
                 "y":0
                },
                {
                 "height":64,
                 "id":89,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1408,
                 "y":192
                },
                {
                 "height":64,
                 "id":90,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1280,
                 "y":320
                },
                {
                 "height":32,
                 "id":91,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":160,
                 "x":1216,
                 "y":608
                },
                {
                 "height":32,
                 "id":92,
                 "name":"player",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":32,
                 "y":480
                },
                {
                 "height":32,
                 "id":93,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":192,
                 "y":384
                },
                {
                 "height":32,
                 "id":94,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":160,
                 "y":544
                },
                {
                 "height":32,
                 "id":95,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":160,
                 "y":192
                },
                {
                 "height":32,
                 "id":96,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":448,
                 "y":256
                },
                {
                 "height":29,
                 "id":97,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":578,
                 "y":258
                },
                {
                 "height":26,
                 "id":98,
                 "name":"solid",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1436,
                 "y":195
                },
                {
                 "height":32,
                 "id":99,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":512,
                 "y":128
                },
                {
                 "height":32,
                 "id":100,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":800,
                 "y":320
                },
                {
                 "height":32,
                 "id":101,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":800,
                 "y":224
                },
                {
                 "height":32,
                 "id":102,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":768,
                 "y":544
                },
                {
                 "height":32,
                 "id":103,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":960,
                 "y":576
                },
                {
                 "height":32,
                 "id":104,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1280,
                 "y":480
                },
                {
                 "height":32,
                 "id":105,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1472,
                 "y":192
                },
                {
                 "height":32,
                 "id":106,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1216,
                 "y":64
                },
                {
                 "height":32,
                 "id":107,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1344,
                 "y":64
                },
                {
                 "height":32,
                 "id":108,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1344,
                 "y":288
                },
                {
                 "height":32,
                 "id":109,
                 "name":"enemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1472,
                 "y":480
                },

                {
                 "height":32,
                 "id":110,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":32,
                 "y":64
                },
                {
                 "height":32,
                 "id":111,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":64,
                 "y":64
                },
                {
                 "height":32,
                 "id":112,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":224,
                 "y":128
                },
                {
                 "height":32,
                 "id":113,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":32,
                 "y":288
                },
                {
                 "height":32,
                 "id":114,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":192,
                 "y":480
                },
                {
                 "height":32,
                 "id":116,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":512,
                 "y":256
                },
                {
                 "height":32,
                 "id":117,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":544,
                 "y":256
                },
                {
                 "height":32,
                 "id":118,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":448,
                 "y":64
                },
                {
                 "height":32,
                 "id":119,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":512,
                 "y":64
                },
                {
                 "height":32,
                 "id":120,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":576,
                 "y":64
                },
                {
                 "height":32,
                 "id":121,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":832,
                 "y":64
                },
                {
                 "height":32,
                 "id":122,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":864,
                 "y":192
                },
                {
                 "height":32,
                 "id":123,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":992,
                 "y":416
                },
                {
                 "height":32,
                 "id":124,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":640,
                 "y":512
                },
                {
                 "height":32,
                 "id":125,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":736,
                 "y":512
                },
                {
                 "height":32,
                 "id":126,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1248,
                 "y":32
                },
                {
                 "height":32,
                 "id":127,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1280,
                 "y":32
                },
                {
                 "height":32,
                 "id":128,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1536,
                 "y":128
                },
                {
                 "height":32,
                 "id":129,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1248,
                 "y":448
                },
                {
                 "height":32,
                 "id":130,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":32,
                 "x":1536,
                 "y":448
                },
                {
                 "height":64,
                 "id":131,
                 "name":"exit",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1472,
                 "y":544
                },
                {
                 "height":29,
                 "id":132,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":384,
                 "y":256
                },
                {
                 "height":29,
                 "id":133,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":384,
                 "y":192
                },
                {
                 "height":29,
                 "id":134,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":128,
                 "y":192
                },
                {
                 "height":29,
                 "id":135,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":256,
                 "y":544
                },
                {
                 "height":29,
                 "id":136,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":352,
                 "y":384
                },
                {
                 "height":29,
                 "id":137,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":160,
                 "y":384
                },
                {
                 "height":29,
                 "id":138,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":384,
                 "y":128
                },
                {
                 "height":29,
                 "id":139,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":640,
                 "y":128
                },
                {
                 "height":29,
                 "id":140,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":736,
                 "y":224
                },
                {
                 "height":29,
                 "id":141,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":864,
                 "y":224
                },
                {
                 "height":29,
                 "id":142,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":704,
                 "y":320
                },
                {
                 "height":29,
                 "id":143,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":928,
                 "y":576
                },
                {
                 "height":29,
                 "id":144,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1056,
                 "y":576
                },
                {
                 "height":29,
                 "id":145,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":832,
                 "y":544
                },
                {
                 "height":29,
                 "id":146,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1184,
                 "y":64
                },
                {
                 "height":29,
                 "id":147,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1248,
                 "y":64
                },
                {
                 "height":29,
                 "id":148,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1312,
                 "y":64
                },
                {
                 "height":29,
                 "id":149,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1440,
                 "y":64
                },
                {
                 "height":29,
                 "id":150,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1312,
                 "y":288
                },
                {
                 "height":29,
                 "id":151,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1504,
                 "y":288
                },
                {
                 "height":29,
                 "id":152,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1440,
                 "y":480
                },
                {
                 "height":29,
                 "id":153,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1536,
                 "y":480
                },
                {
                 "height":29,
                 "id":154,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1344,
                 "y":480
                },
                {
                 "height":29,
                 "id":155,
                 "name":"solidEnemy",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":2,
                 "x":1248,
                 "y":480
                },
                {
                 "height":32,
                 "id":156,
                 "name":"magma",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":16,
                 "x":1280,
                 "y":384
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":4,
 "nextobjectid":157,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.8.4",
 "tileheight":32,
 "tilesets":[
        {
         "columns":4,
         "firstgid":1,
         "image":"..\/images\/block2.png",
         "imageheight":96,
         "imagewidth":128,
         "margin":0,
         "name":"block2",
         "spacing":0,
         "tilecount":12,
         "tileheight":32,
         "tilewidth":32,
         "transparentcolor":"#ff00ff"
        }],
 "tilewidth":32,
 "type":"map",
 "version":"1.8",
 "width":50
};
		game();




}



function initSprite() {
	map.setSprite(resources.get('images/block2.png'));
	player.setSprite(resources.get('images/player.png'));

	setup(DATA);
}

//Загрузчик

function game() {

resources.isDelete();

resources.load([
	'images/test.png',
	'images/platform.png',
	'images/block2.png',
	'images/player.png',
	'images/level2.png',
	'images/coin.png'
]);
resources.onReady(initSprite);
}

(function()
{
	var resourceCache = {};
	var loading = [];
	var readyCallbacks = [];

	function load(urlOrArr)
	{
		if(urlOrArr instanceof Array)
		{
			urlOrArr.forEach(function(url)
			{
				_load(url);
			})
		}
		else
		{
			_load(urlOrArr);
		}
	}

	function _load(url)
	{
		if(resourceCache[url])
		{
			return resourceCache[url];
		}
		else
		{
			var img = new Image();
			img.onload = function()
			{
				resourceCache[url] = img;

				if(isReady())
				{
					readyCallbacks.forEach(function(func) { func(); });
				}
			};
			resourceCache[url] = false;
			img.src = url;
		}
	}

	function get(url)
	{
		return resourceCache[url];
	}

	function isReady()
	{
		var ready = true;
		for(var k in resourceCache)
		{
			if(resourceCache.hasOwnProperty(k) && !resourceCache[k])
				ready = false;
		}
		return ready;
	}

	function onReady(func)
	{
		readyCallbacks.push(func);
	}

	function isDelete() {
		resourceCache = {};
		loading = [];
		readyCallbacks = [];
	}

	window.resources =
	{
		load: load,
		get: get,
		onReady: onReady,
		isReady: isReady,
		isDelete: isDelete
	};
})();
