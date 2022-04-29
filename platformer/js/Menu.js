class Menu {
	constructor() {
		this.controller;
		this.width;
		this.height;

		this.start = false;

		this.buttonStart
	}

	init(controller, width, height) {
		this.controller = controller;
		this.width = width;
		this.height = height;

		this.start = false;

		this.buttonStart = new Button(null, 'Старт', this.width/2-50, this.height/2-25, 100, 50);
	}

	update() {

		if(this.controller.leftClick) {
			if(this.buttonStart.intersect(this.controller.getPositionClick())) {
				this.start = true;
			}
		}
		else {
			this.start = false;
		}
	}

	getStart() {
		return this.start;
	}

	render(ctx) {
		this.buttonStart.render(ctx);
	}
}