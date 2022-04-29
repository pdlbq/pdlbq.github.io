class Player extends Entity{
	constructor(controller, width, height) {
		super();
	    this.offset = {x: 0, y: 0};
	    this.controller = controller;
	    this.STATES = {walk: 0, jump: 1};
	    this.state;
	    this.fallign;

	    this.startPosition;

	    this.coin = 0;

	    this.buttonLeft = new Button(null, '<==', 50, height-75, 50, 50);
	    this.buttonRight = new Button(null, '==>', 125, height-75, 50, 50);
	    this.buttonUp = new Button(null, '^', width-75, height-150, 50, 50);
	    this.buttonDown = new Button(null, 'V', width-75, height-75, 50, 50);

	}

	init(position, size, obj) {
		this.position = position;
		this.startPosition = {x: position.x, y: position.y};
		this.size = {w: size.x, h: size.y};

		this.obj = obj;

		this.state = this.STATES.jump;

		this.dy = 0;
		this.dx = 0;

		this.anim.create(this.sprite,
						{position: this.position,
						size: this.size,
						frames: 3,
						speed: 10});
	}

	setSprite(sprite) {
		this.sprite = sprite;

	}

	update(dt) {
		if(this.controller.left || (this.controller.leftClick && this.buttonLeft.intersect(this.controller.getPositionClick()))) {
			if(this.state != this.STATES.jump) {
				this.state = this.STATES.walk;
			}
			this.dx = -100;
        	this.anim.setFlip(true);
	    }

	    if(this.controller.right || (this.controller.leftClick && this.buttonRight.intersect(this.controller.getPositionClick()))) {
	    	this.dx = 100;
	    	if(this.state != this.STATES.jump) {
				this.state = this.STATES.walk;
			}
	        this.anim.setFlip(false);
	    }

	    if(this.controller.down || (this.controller.leftClick && this.buttonDown.intersect(this.controller.getPositionClick()))) {
	    	this.dy += 200 * dt;
	    }

	    if((this.controller.jump || (this.controller.leftClick && this.buttonUp.intersect(this.controller.getPositionClick()))) && this.state != this.STATES.jump) {
	        this.dy = -200;
	        this.state = this.STATES.jump;
	    }


		if(this.position.x > 200) {
			this.offset.x = this.position.x - 200;
		}
		if(this.position.y > 200) {
			//this.offset.y = this.position.y - 200;
		}

		//this.map.setOffset(this.offset);

		//this.updateEntity(dt);

		//this.currentFraim += dt*Math.abs(this.dir.x) / 10;
		this.dy += 200 * dt;

		this.position.x += this.dx * dt;
		this.collision(0);

		this.position.y += this.dy * dt;
		this.collision(1);

		this.anim.update(dt, 10);
		this.dx = 0;
	}

	collision(num) {
		for(let i = 0; i < this.obj.length; i++) {
			if(this._intersect(this.obj[i])) {
				if(this.obj[i].name == 'solid') {
					if(this.dy>0 && num==1) {
						this.position.y = this.obj[i].y - this.size.h;
						this.state = this.STATES.walk;
						this.fallign = false;
						this.dy = 0;
					}
					if(this.dy<0 && num==1) {
						this.position.y = this.obj[i].y + this.obj[i].height;
						this.dy = 0;
					}
					if(this.dx>0 && num==0) {
						this.position.x = this.obj[i].x - this.size.w;
					}
					if(this.dx<0 && num==0) {
						this.position.x = this.obj[i].x + this.obj[i].width;
					}
				}

				if(this.obj[i].name == 'stakes')
				{
					this.dead();
				}

				if(this.obj[i].name == 'magma')
				{
					this.dead();
				}
			}
			else if(this.dy > 20){
				this.state = this.STATES.jump;
			}
		}
	}

	_intersect(entity) {
		if (utils.overlap(entity.x, entity.y, entity.width, entity.height,
			this.position.x, this.position.y, this.size.w, this.size.h))
			return true;
		return false;
	}

	killEnemy(entity) {
		if (utils.overlap(entity.position.x, entity.position.y, entity.size.w, entity.size.h,
			this.position.x, this.position.y, this.size.w, this.size.h)) {
			if(this.dy > 0 && this.state == this.STATES.jump) {
				return true;
			}
			else {
				this.dead();
				return false;
			}
		}
	}

	setCoin() {
		this.coin++;
		console.log('coin - ', this.coin);
	}

	exit(ctx, levelCoins) {
		if(levelCoins != 0) {
			ctx.font = "64px serif";
			ctx.fillStyle = 'red';
 	 		ctx.fillText("Соберите все монеты!", 100, 100);

 	 		return false;
		}
		else {
			return true;
		}
	}

	getOffset() {
		return this.offset;
	}

	dead() {
		const {x, y} = this.startPosition;

		this.position = {x: x, y: y};

		this.offset = {x: 0, y: 0};

    	this.dx = 0;
    	this.dy = 0;

    	this.anim.create(this.sprite,
						{position: this.position,
						size: this.size,
						frames: 3,
						speed: 10});
    	console.log('Game over')
	}

	renderInterface(ctx, levelCoins) {
		ctx.font = "24px serif";
		ctx.fillStyle = 'blue';
 	 	ctx.fillText("Монеты - " + this.coin + " / Осталось - " + levelCoins, 100, 50);
	}

	renderButton(ctx) {
		ctx.globalAlpha = 0.5;
		this.buttonLeft.render(ctx);
		this.buttonRight.render(ctx);
		this.buttonUp.render(ctx);
		this.buttonDown.render(ctx);
		ctx.globalAlpha = 1;
	}
}