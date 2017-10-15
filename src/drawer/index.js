(function (window) {
    function Drawer(x, y, config) {
        this.startX = x || 0;
        this.startY = y || 0;
        this.endX = x || 0;
        this.endY = y || 0;
        this.mouseIsDown = 0;
        this.config = config
        this.drawShape = shapeCreater[config.shapeType]
    }
    Drawer.prototype = {
        init: function (target) {
            this.canvas = target;
            this.context = this.canvas.getContext("2d");
            this.canvas.addEventListener("mousedown", this.mouseDown.bind(this), false);
            this.canvas.addEventListener("mousemove", this.mouseXY.bind(this), false);
            this.canvas.addEventListener("mouseup", this.mouseUp.bind(this), false);

        },
        draw: function () {

        },
        clear: function () {

        },
        clearAll: function () {

        },

        mouseDown: function(eve) {
            this.mouseIsDown = 1;
            var pos = this.getMousePos(this.canvas, eve);
            this.startX = this.endX = pos.x;
            this.startY = this.endY = pos.y;
            this.drawShape()
        },
        mouseUp: function(eve) {
            if (this.mouseIsDown !== 0) {
                this.mouseIsDown = 0;
                var pos = this.getMousePos(this.canvas, eve);
                this.endX = pos.x;
                this.endY = pos.y;
                this.drawShape(); //update on mouse-up
            }
        },
        mouseXY: function(eve) {

            if (this.mouseIsDown !== 0) {
                var pos = this.getMousePos(this.canvas, eve);
                this.endX = pos.x;
                this.endY = pos.y;

                this.drawShape();
            }
        },
        getMousePos: function(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
    };

    var shapeCreater = {
        rectangle: function() {
            var w = this.endX - this.startX;
            var h = this.endY - this.startY;
            var offsetX = (w < 0) ? w : 0;
            var offsetY = (h < 0) ? h : 0;
            var width = Math.abs(w);
            var height = Math.abs(h);

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.context.beginPath();
            this.context.rect(this.startX + offsetX, this.startY + offsetY, width, height);
            this.context.fillStyle = "yellow";
            this.context.fill();
            this.context.lineWidth = 7;
            this.context.strokeStyle = 'black';
            this.context.stroke();
        }
    }
    window.Drawer = Drawer
})(window)