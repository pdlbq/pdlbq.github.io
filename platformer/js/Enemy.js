class Enemy extends Entity{
	constructor() {
		super();
	    this.STATES = {walk: 0, jump: 1};
	    this.state;

	}

	init(position, size, obj) {
		this.position = position;
		this.startPosition = {x: position.x, y: position.y};
		this.size = {w: size.x, h: size.y};

		this.obj = obj;

		this.state = this.STATES.jump;

		this.dy = 0;
		this.dx = 100;

		this.anim.create(this.sprite,
						{position: this.position,
						size: this.size,
						frames: 2,
						speed: 8}, 1);
	}

	setSprite(sprite) {
		this.sprite = sprite;
	}

	update(dt) {

		//if(this.state == this.STATES.jump)
			this.dy += 300 * dt;

		this.position.x += this.dx * dt;
		this.collision(0);

		this.position.y += this.dy * dt;
		this.collision(1);

		this.anim.update(dt, 10);

		//this.dx = 0;
	}

	collision(num) {
		for(let i = 0; i < this.obj.length; i++) {
			if(this.intersect(this.obj[i])) {
				if(this.obj[i].name == 'solid' || this.obj[i].name == 'solidEnemy') {
					if(this.dy>0 && num==1) {
						this.position.y = this.obj[i].y - this.size.h;
						this.state = this.STATES.walk;
						this.dy = 0;
						//this.dx = 100;
					}
					else if(this.dy<0 && num==1) {
						this.position.y = this.obj[i].y + this.obj[i].height;
						this.dy = 0;
					}
					if(this.dx>0 && num==0) {
						this.dx = -100;
						this.position.x = this.obj[i].x - this.size.w;
					}
					else if(this.dx<0 && num==0) {
						this.position.x = this.obj[i].x + this.obj[i].width;
						this.dx = 100;
					}
				}
			}
		}
	}

	intersect(entity) {
		if (utils.overlap(entity.x, entity.y, entity.width, entity.height,
			this.position.x, this.position.y, this.size.w, this.size.h))
			return true;
		return false;
	}

}