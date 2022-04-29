class Interact {
	constructor() {
		this.position = {x: 0, y: 0};
		this.size = {w: 0, h: 0};

		this.sprite = null;
		this.currentfraim = 0;
		this.frames = 0;
		this.animateSpeed = 0;

		this.anim = new Animation();
	}

	init(position, size) {
		this.position = position;
		this.size = size;

		this.anim.create(this.sprite,
						{position: this.position,
						size: this.size,
						frames: 3,
						speed: 10});
	}

	setSprite(sprite, frames, animateSpeed) {
		this.sprite = sprite;
		this.frames = frames;
		this.animateSpeed = animateSpeed;
	}

	update(dt) {
		this.anim.update(dt, this.animateSpeed);
	}

	intersect(player) {
		if (utils.overlap(player.position.x, player.position.y, player.size.w, player.size.h,
			this.position.x, this.position.y, this.size.w, this.size.h))
			return true;
		return false;
	}

	render(ctx, offset) {
		this.anim.render(ctx, offset);
	}
}