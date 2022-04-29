class Controller {
	constructor() {
		this.left = false;
		this.right = false;
		this.down = false;
		this.jump = false;

		this.leftClick = false;
		this.positionClick;

		this.#addKeyboardListeners();
	}

	#addKeyboardListeners() {
		document.onkeydown = (event) => {
			switch(event.key) {
				case 'ArrowLeft':
					this.left = true;
					break;
				case 'ArrowRight':
					this.right = true;
					break;
				case 'ArrowDown':
					this.down = true;
					break;
				case ' ':
					this.jump = true;
					break;
			}
		};

		document.onkeyup = (event) => {
			switch(event.key) {
				case 'ArrowLeft':
					this.left = false;
					break;
				case 'ArrowRight':
					this.right = false;
					break;
				case 'ArrowDown':
					this.down = false;
					break;
				case ' ':
					this.jump = false;
					break;
			}
		};

		document.onmousedown = (event) => {
			switch(event.button) {
				case 0: this.leftClick = true; this.positionClick = {x: event.offsetX, y: event.offsetY}; break;
			}
		}

		document.onmouseup = (event) => {
			switch(event.button) {
				case 0: this.leftClick = false; this.positionClick = {x: -100, y: -100};break;
			}
		}

		document.addEventListener('touchstart', (event) => {
			this.leftClick = true;
			this.positionClick = {x: event.touches[0].clientX, y: event.touches[0].clientY};
		});

		document.addEventListener('touchend', (event) => {
				this.leftClick = false;

		});
	}

	getPositionClick() {
		return this.positionClick;
	}
}