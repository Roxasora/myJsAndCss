var mainColor = "#000";
var brushWidth = 10;
var canvas;
var ctx;
var posx;
var posy;
var mouseDown = false;
var tool;
var color;
var width;
var alpha;
var clearBt;
var saveBt;
var GlobalAlp = 100;
var lastPosx;
var lastPosy;
window.onload = function(){
    hehe();
}

function hehe(){
        canvas = $(document).get(0).getElementById("canvas_bk1");
        ctx = canvas.getContext("2d");
        tool = document.getElementById("tools");
        color = document.getElementById("color_tool");
        width = document.getElementById("width");
        alpha = document.getElementById("alpha");
        clearBt = document.getElementById("clear");
        saveBt = document.getElementById("save");
}
function drawXY(posx,posy){
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.arc(posx,posy,5,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

$('#canvas_bk1').mousemove(function (e) {
                    posx = e.pageX-90;
                    posy = e.pageY-40-64;   
                    ctx.strokeStyle = color.value;
                    ctx.fillStyle = color.value;
                    ctx.lineWidth = width.value;
                    ctx.globalAlpha = (alpha.value)/100;
                    if(mouseDown == false){
                       //drawXY(posx,posy);
                    }
                    if(mouseDown == true && tools.value == "brush"){
                        ctx.lineTo(posx,posy);
                        ctx.strokeStyle = color.value;
                        ctx.stroke();

                        /*
                        ctx.beginPath();
                        ctx.moveTo(lastPosx,lastPosy);
                        ctx.lineTo(posx,posy);
                        ctx.stroke();
                        ctx.closePath();
                        lastPosx = posx;
                        lastPosy = posy;
                        */
                    }
                    });
            $('#canvas_bk1').mousedown(function(e){
                ctx.globalAlpha = (alpha.value)/100;
                var nowPosX = e.pageX-90;
                var nowPosY = e.pageY-104;
                mouseDown = true;
                if(tools.value == "brush"){
                    //lastPosx = nowPosX;
                    //lastPosy = nowPosY;
                    ctx.beginPath();
                    ctx.stroke();
                }
                if(tools.value == "line"){
                    ctx.beginPath();
                    ctx.moveTo(nowPosX,nowPosY);
                }
                if(tools.value == "rect"){
                    //ctx.beginPath();
                    //ctx.moveTo(nowPosX,nowPosY);
                    lastPosx = nowPosX;
                    lastPosy = nowPosY;
                }
                if(tools.value == "circle"){
                    lastPosx = nowPosX;
                    lastPosy = nowPosY;
                }
                    });
           $('#canvas_bk1').mouseup(function(e){
                 ctx.globalAlpha = (alpha.value)/100;
                var nowPosX = e.pageX-90;
                var nowPosY = e.pageY-104;
                    mouseDown = false;
                    if(tools.value == "brush"){
                        ctx.closePath();
                    }

                    if(tools.value == "line"){
                    ctx.lineTo(nowPosX,nowPosY);
                    ctx.stroke();
                    ctx.closePath();
                }
                    if(tools.value == "rect"){
                        ctx.fillRect(lastPosx,lastPosy,(nowPosX-lastPosx),(nowPosY-lastPosy));
                    }
                    if(tools.value == "circle"){
                        ctx.beginPath();
                        ctx.arc(lastPosx,lastPosy,(Math.sqrt(Math.pow((lastPosx-nowPosX),2) + Math.pow((lastPosy-nowPosY),2))),0,Math.PI*2,true);
                        ctx.fill();
                        ctx.closePath();
                    }
                    });


$('#clear').click(function(e){
    ctx.clearRect(0,0,800,480);
});

$('#save').click(function(e){
    window.location = canvas.toDataURL('img/png');
});
