window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    main(ctx);
    }

console.log("test");

angle = 20;

function parseRuleset(string) {
    var next = "";
    for(var i = 0; i < string.length; ++i) {
        var c = string.charAt(i);
        
        // Begin Rulset ParMath.sing
        switch(c) {
            case "X": {
                next += "F(0.23)-[[X]+X]+[+F(2.2)X][++F(1.7)X][-F(" + Math.random() + ")X]";
            } break;

            case "F": {
                ++i;
                var str = string.substring(++i);
                str = str.split(")")[0];

                for(var j = 0; j < str.length; ++j) {
                    ++i;
                }

                var plus = "";
//                for(var j = 0; j < Math.floor((str+1)/100); ++j) {
//                    plus += "+";
//                }
                next += "F(" + (str * Math.random()) + ")F(1.5)" + plus;
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
    for(var i = 0; i < 5; ++i) {
        console.log("I: " + i + " ");
        s = parseRuleset(s);
    }
    
    console.log(s);
    
    //drawSystem(ctx, s);

    animate(ctx);
}

function animate(ctx) {

    ctx.clearRect(0,0,1000,1000);

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
                ++i;
                var str = string.substring(++i);
                str = str.split(")")[0];

                for(var j = 0; j < str.length; ++j) {
                    ++i;
                }

                // Same as A
                // Get the value off the top of the stack
                ctx.moveTo(pos[0], pos[1]);

                pos[0] += radius * Math.cos(rot) * (str + 0);
                pos[1] += radius * Math.sin(rot) * (str + 0);

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
