class Button {
	constructor(sprite, name, x, y, w, h) {
		this.position = {x:x, y:y};
		this.size = {w:w, h:h};

		this.sprite = sprite;
		this.name = name;
	}

	intersect(position) {
		let {x, y} = this.position;
		let {w, h} = this.size;

		if(position.x > x && position.x < x + w && position.y > y && position.y < y + h)
			return true;
		return false;
	}

	render(ctx) {
		let {x, y} = this.position;
		let {w, h} = this.size;

		ctx.fillStyle = "yellow";
		ctx.fillRect(x, y, w, h);
		ctx.font = "24px serif";
		ctx.fillStyle = 'black';

		let xName = this.name.length * 30 / 2;
 		ctx.fillText(this.name, x+w-xName, y+h-18);
	}
}