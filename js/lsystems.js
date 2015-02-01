window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    main(ctx);
    }

console.log("test");

angle = 0;

function parseRuleset(string) {
    var next = "";
    for(var i = 0; i < string.length; ++i) {
        var c = string.charAt(i);
        
        // Begin Rulset ParMath.sing
        switch(c) {
            case "X": {
                next += "F-[[X]+X]+[+FX][++FX][-FX]";
            } break;

            case "F": {
                next += "FF";
            } break;

            default: {
                next += c;
            } break;
        }
    }

    return next;
}

function main(ctx) {

    s = "X";
    for(var i = 0; i < 6; ++i) {
        console.log("I: " + i + " ");
        s = parseRuleset(s);
    }
    
    console.log(s);
    
    //drawSystem(ctx, s);

    animate(ctx);
}

function animate(ctx) {

    ctx.clearRect(0,0,1000,1000);
    if(angle < 30) {
        angle += 1.0;
    }
    console.log(angle);
    // Draw
    drawSystem(ctx, s, angle);

    window.requestAnimationFrame(function(){animate(ctx);});
}

function drawSystem(ctx, string, angle) {
    // Code Here
    var stack = [];
    var pos, rot;
    pos = [500, 500];
    rot = -Math.PI/2;

    var radius = 2;
    for(var i = 0; i < string.length; ++i) {
        // Follow Current Draw Instruction
        var c = string.charAt(i);

        ctx.beginPath();

        switch(c) {
            case "+": {
                rot += -angle * Math.PI / 180;
            } break;

            case "-": {
                rot += angle * Math.PI / 180;
            } break;

            case "F": {
                // Same as A
                // Get the value off the top of the stack
                ctx.moveTo(pos[0], pos[1]);

                pos[0] += radius * Math.cos(rot);
                pos[1] += radius * Math.sin(rot);

                ctx.lineTo(pos[0], pos[1]);
            } break;

            case "[": {
                stack.push({"pos":{x: pos[0], y: pos[1]}, "rot":rot});
            } break;

            case "]": {
                var dump = stack.pop();
                pos[0] = dump.pos.x;
                pos[1] = dump.pos.y;
                rot = dump.rot;
            } break;
        }

        ctx.stroke();
    }
}
