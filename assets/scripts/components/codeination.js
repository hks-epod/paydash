'use strict';
var s = window.screen;
var q = document.getElementById('animator');
if (q) {
    setTimeout(function() {
        q.style.opacity = 1;
    }, 1500);

    var width = q.width = s.width;
    var height = q.height = 750;
    var yPositions = Array(Math.floor(width / 10)).join(0).split('');
    var ctx = q.getContext('2d');

    var draw = function() {
        // ctx.fillStyle = 'rgba(0,0,0,.05)';
        // ctx.fillStyle = 'rgba(255,255,255,.05)';
        ctx.fillStyle = 'rgba(21, 21, 37, 0.04)';
        ctx.fillRect(0, 0, width, height);
        // ctx.fillStyle = '#000';
        // ctx.fillStyle = '#8E9CcF';
        ctx.fillStyle = '#1FBAD6';

        ctx.font = '8pt monospace';
        yPositions.map(function(y, index) {
            // debugger;
            var text = String.fromCharCode(1e2 + Math.random() * 33);
            text = Math.random() > 0.5 ? 0 : 1;
            var x = (index * 10) + 10;
            q.getContext('2d').fillText(text, x, y);
            if (y > 100 + Math.random() * 1e4) {
                yPositions[index] = 0;
            } else {
                yPositions[index] = y + 10;
            }
        });
    };
    setInterval(draw, 33);
}
