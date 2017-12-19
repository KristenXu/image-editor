var target = document.getElementById('draw_rectangle');
var drawer = new Drawer(0, 0, {
    shapeType: 'bezierEllipse'
} )
drawer.init(target)

var onShapeChange = function (shapeType) {
    drawer.setShapeType(shapeType)
    drawer.clearAll()
}

var zoomInArea = function () {
    drawer.zoomIn()
}

var zoomOutArea = function () {
    drawer.zoomOut()
}