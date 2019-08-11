const maDivA = document.getElementById('canvas1');
const maDivB = document.getElementById('canvas2');
const maDivC = document.getElementById('canvas3');
const maDivD = document.getElementById('canvas4');
const maDivE = document.getElementById('canvas5');
const maDivF = document.getElementById('canvas6');
const maDivG = document.getElementById('canvas7');
const maDivH = document.getElementById('canvas8');
const maDivI = document.getElementById('canvas9');
const maDivJ = document.getElementById('canvas10');

function machin(argId, argP, arAngle, argTech) {
    var canvas = argId;
    var ctx = canvas.getContext('2d');
    var color = '#0C9BE2';
    var width = canvas.width;// width of canvas
    canvas.height = width + 50;
    var height = canvas.height;
    var percent = argP;
    var status = argTech;
    var counter = 0;
    // ---- End defination of variables ---
    // ------------------------------------
    function baseCir() {
        ctx.beginPath();
        ctx.lineWidth = width / 23;
        ctx.strokeStyle = "#FFF";
        ctx.arc(width / 2, width / 2, width / 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
    // ----------------------------
    // ---- Drawing the circle Begin ----
    setTimeout(function draw() {

        var angle = Math.PI * 1.5 + Math.PI * arAngle * counter / 100;
        ctx.clearRect(0, 0, width, height);
        baseCir();
        ctx.beginPath();
        ctx.lineWidth = width / 14;
        ctx.arc(width / 2, width / 2, width / 3, 1.5 * Math.PI, angle);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
        // ---- Drawing the circle End ----
        // --------------------------------
        // ---- fill the text Begin ----
        ctx.fillStyle = color;
        ctx.font = width / 6 + "px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(counter + "%", width / 2, width / 2);
        ctx.fillText(status, width / 2, height - 25);
        counter++;
        if (counter <= percent) {
            setTimeout(draw, 20);
        }
    }, 20);
}

machin(maDivA, 70, 2, "html");
machin(maDivB, 55, 2.6, "CSS/sass");
machin(maDivC, 30, 2.6, "js");
machin(maDivD, 30, 2.6, "react");
machin(maDivE, 30, 2.6, "angular");
machin(maDivF, 30, 2.6, "nodeJS");
machin(maDivG, 30, 2.6, "MongoDB");
machin(maDivH, 30, 2.6, "Bootstrap");
machin(maDivI, 30, 2.6, "Wordpress");
machin(maDivJ, 30, 2.6, "PHP");