(function (window) {
    function Drawer(x, y, config) {
        this.startX = x || 0;
        this.startY = y || 0;
        this.endX = x || 0;
        this.endY = y || 0;
        this.mouseIsDown = 0;
        this.config = config
        this.drawShape = shapeCreater[config.shapeType || 'freeline']
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
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },

        setShapeType: function (shapeType) {
            this.drawShape = shapeCreater[shapeType || 'freeline']
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
        },
        zoomIn: function () {

        },
        zoomOut: function () {

        },
    };

    var shapeCreater = {
        freeline:function () {
            var x =  this.endX,
                y =  this.endY;
            this.context.lineTo(x,y);
            console.log('x', x)
            //style
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'black';
            this.context.stroke();
        },
        rectangle: function() {
            //core algorithm
            var w = this.endX - this.startX;
            var h = this.endY - this.startY;
            var offsetX = (w < 0) ? w : 0;
            var offsetY = (h < 0) ? h : 0;
            var width = Math.abs(w);
            var height = Math.abs(h);

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.beginPath();
            this.context.rect(this.startX + offsetX, this.startY + offsetY, width, height);
            this.context.closePath();

            //style
            this.context.fillStyle = "rgba(255,255,255,0.2)";
            this.context.fill();
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'black';
            this.context.stroke();
        },
        bezierEllipse: function() {
            //core algorithm
            var k = .5522848,
                x =  this.endX,
                y =  this.endY,
                a = this.endX - this.startX,
                b = this.endY - this.startY,
                ox = a * k, // 水平控制点偏移量
                oy = b * k; // 垂直控制点偏移量
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.beginPath();
            //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
            this.context.moveTo(x - a, y);
            this.context.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
            this.context.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
            this.context.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
            this.context.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
            this.context.closePath();
            //style
            this.context.fillStyle = "rgba(255,255,255,0.2)";
            this.context.fill();
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'black';
            this.context.stroke();
        },
        circle: function (context, x, y, w, h, color, lineWidth) {
            context = this.context;
            x =  this.startX;
            y =  this.startY;
            w = this.endX - this.startX;
            h = this.endY - this.startY;
            color = 'rgba(255, 0, 0, 1)';
            lineWidth = 1;
            var radius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2))

            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.stroke();
        }
    }
    window.Drawer = Drawer
})(window)