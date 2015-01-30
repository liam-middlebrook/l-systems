window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    main(ctx);
    }

console.log("test");

function parseRuleset(string) {
    var next = "";
    for(var i = 0; i < string.length; ++i) {
        var c = string.charAt(i);
        
        // Begin Rulset ParMath.sing
        switch(c) {
            case "A": {
                next += "AA";
            } break;

            case "B": {
                next += "A[B]B";
            } break;

            default: {
                next += c;
            } break;
        }
    }

    return next;
}

function main(ctx) {

    var s = "B";
    for(var i = 0; i < 8; ++i) {
        console.log("I: " + i + " " + s);
        s = parseRuleset(s);
    }
    
    console.log(s);

    drawSystem(ctx, s);
}

function drawSystem(ctx, string) {
    // Code Here
    var stack = [];
    var pos, rot;
    pos = [0, 200];
    rot = 0;

    var radius = 2;
    for(var i = 0; i < string.length; ++i) {
        // Follow Current Draw Instruction
        var c = string.charAt(i);

        ctx.beginPath();

        switch(c) {
            case "B":
            case "A": {
                // Same as A
                // Get the value off the top of the stack
                ctx.moveTo(pos[0], pos[1]);

                pos[0] += radius * Math.cos(rot);
                pos[1] += radius * Math.sin(rot);

                ctx.lineTo(pos[0], pos[1]);
            } break;

            case "[": {
                stack.push({"pos":{x: pos[0], y: pos[1]}, "rot":rot});
                rot += 45 * Math.PI / 180;
                // Push [pos&angle] turn left 45deg
            } break;

            case "]": {
                var dump = stack.pop();
                pos[0] = dump.pos.x;
                pos[1] = dump.pos.y;
                rot = dump.rot;
                rot += -45 * Math.PI / 180;
                // Pop [pos&angle] turn right 45deg
            } break;
        }

        ctx.stroke();
    }
}
