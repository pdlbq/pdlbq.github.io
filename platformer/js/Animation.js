class Animation {
	constructor() {
		this.sprite;
		this.position;
		this.size;

		this.frames;
		this.currentFrame;
		this.speed;

		this.loop;
		this.isPlaying;
		this.flip;

		this.nameAnimation;

		this.rowAnim;
	}

	create(sprite, param, rowAnim=0, flip=false, loop=true) {
		this.sprite = sprite;
		//this.nameAnimation = nameAnimation;

		this.position = param.position;
		this.size = param.size;
		this.frames = param.frames;
		this.speed = param.speed;

		this.currentFrame = 0;
		this.loop = loop;
		this.flip = flip;
		this.isPlaying = true;
		this.rowAnim = rowAnim;
	}

	set(rowAnim, frames, speed) {
		this.rowAnim = rowAnim;
		this.frames = frames;
		this.speed = speed;
	}

	setFlip(flip = 1) {
		this.flip = flip;
	}

	play() {
		this.isPlaying = true;
	}

	pause() {
		this.isPlaying = false;
	}


	update(dt, speed=10) {
		if(!this.isPlaying) return;

		this.speed = speed;

		this.currentFrame += this.speed * dt;
		if(this.currentFrame >= this.frames) {
			this.currentFrame = 0;
			if(!this.loop) {
				this.isPlaying = false;
			}
		}
	}

	render(ctx, offset) {
		let {x, y} = this.position;
		let {w, h} = this.size;

		if(this.flip) {
			ctx.save();
			ctx.scale(-1, 1);
			ctx.drawImage(this.sprite, Math.floor(this.currentFrame)*w, this.rowAnim*h, w, h, -(x - offset.x + w), y - offset.y, w, h);
			ctx.restore();
		}
		else {
			ctx.drawImage(this.sprite, Math.floor(this.currentFrame)*w, this.rowAnim*h, w, h, x - offset.x, y - offset.y, w, h);
		}
	}
}