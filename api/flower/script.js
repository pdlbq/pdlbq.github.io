var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Scene = function() {
    function Scene() {
        var _this = this;

        _classCallCheck(this, Scene);

        this.PI = Math.PI;
        this.TAU = this.PI * 2;
        this.GOLDEN = (Math.sqrt(5) + 1) / 2;
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dpr = window.devicePixelRatio;
        this.reset();
        window.addEventListener('resize', function() {
            return _this.reset();
        });
        this.loop();
    }

    _createClass(Scene, [{
        key: 'reset',
        value: function reset() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.hwidth = this.width * 0.5;
            this.hheight = this.height * 0.5;
            this.canvas.width = this.width * this.dpr;
            this.canvas.height = this.height * this.dpr;
            this.ctx.scale(this.dpr, this.dpr);
            this.ctx.translate(~~this.hwidth, ~~this.hheight);
            this.ctx.globalCompositeOperation = 'lighter';
            this.tick = 320;
        }
    }, {
        key: 'loop',
        value: function loop() {
            var _this2 = this;

            requestAnimationFrame(function() {
                return _this2.loop();
            });
            this.tick++;
            this.ctx.clearRect(-this.hwidth, -this.hheight, this.width, this.height);
            var count = 150;
            var angle = this.tick * -0.001;
            var amp = 0;
            for (var i = 0; i < count; i++) {
                angle += this.GOLDEN * this.TAU + Math.sin(this.tick * 0.03) * 0.001;
                amp += (i - count / 2) * 0.01 + Math.cos(this.tick * 0.015) * 1;
                var x = Math.cos(angle) * amp + Math.cos(this.tick * 0.0075) * (count - i) * 0.3;
                var y = Math.sin(angle) * amp + Math.sin(this.tick * 0.0075) * (count - i) * 0.3;
                var radius = 0.1 + i * 0.02;
                var scale = 0.1 + amp * 0.1;
                var hue = this.tick + angle / this.TAU * 0.4 + 60;
                var saturation = 90;
                var lightness = 60;
                var alpha = 0.7 + Math.cos(this.tick * 0.03 + i) * 0.3;

                this.ctx.save();
                this.ctx.translate(x, y);
                this.ctx.rotate(angle);
                this.ctx.scale(scale, 1);
                this.ctx.rotate(this.PI * 0.25);
                this.ctx.fillStyle = 'hsla(' + hue + ', ' + saturation + '%, ' + lightness + '%, ' + alpha + ')';
                this.ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
                this.ctx.restore();

                this.ctx.beginPath();
                this.ctx.arc(x, y, radius * 12, 0, this.TAU);
                this.ctx.fillStyle = 'hsla(' + hue + ', ' + saturation + '%, ' + lightness + '%, ' + alpha * 0.05 + ')';
                this.ctx.fill();
            }
        }
    }]);

    return Scene;
}();

var scene = new Scene();