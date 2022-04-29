class Entity {
	constructor() {
		this.position = {x: 0, y: 0};
		this.size;
		this.dx;
		this.dy;

		this.sprite;

		this.name;
		this.life;
		this.dir;
		this.health;

		this.obj;

		this.anim = new Animation();
	}

	render(ctx, offset) {
		this.anim.render(ctx, offset);
	}


}