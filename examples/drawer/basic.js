var target = document.getElementById('draw_rectangle');
var drawer = new Drawer(0, 0, {
    shapeType: 'rectangle'
} )
console.log('target', target)
drawer.init(target)