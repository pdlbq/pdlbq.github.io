class Map {
	constructor() {
		this.tw;
		this.th;
		this.tile;
		this.data;
		this.offset;
		this.sprite;
	}

	init(param, data) {
		this.tw = param.tw;
		this.th = param.th;
		this.tile = param.tile;

		this.data = data;
	}

	setSprite(sprite) {
		this.sprite = sprite;
	}

	setOffset(offset) {
		this.offset = offset;
	}

	update() {

	}

	render(ctx, offset) {
		for(let y = 0 ; y < this.th ; y++) {
			for(let x = 0 ; x < this.tw ; x++) {
				ctx.fillStyle = 'grey';
				ctx.fillRect(x * this.tile - offset.x, y * this.tile - offset.y, this.tile, this.tile);
		        let cell = utils.tcell(x, y, this.tw, this.data);

		        if (cell) {

		          	ctx.drawImage(this.sprite, ((cell-1)%4)*this.tile, (Math.floor((cell-1)/4))*this.tile, this.tile, this.tile, x * this.tile - offset.x, y * this.tile - offset.y, this.tile, this.tile);
	        	}


     		}
		}
	}
}