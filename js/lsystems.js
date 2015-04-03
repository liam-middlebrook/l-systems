window.onload = function() {
    main();
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
                next += "X+X-X-X+X";
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
    for(var i = 0; i < 3; ++i) {
        console.log("I: " + i + " ");
        s = parseRuleset(s);
    }
    
    console.log(s);
    
    //drawSystem(ctx, s);

    var container;

    var camera, scene, renderer;

    init(s);
    animate();

}

function drawSystem(string) {
    // Code Herep
    var object = new THREE.Group();
    var group = object;
    materials = [
        new THREE.MeshLambertMaterial(),
        new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 } )
    ];

                var radius = 50;
                var length = 250;
                var points = [];
                for(var i = 0; i < Math.PI * 2; i += Math.PI/4.0) {
                    points.push(new THREE.Vector3(radius * Math.cos(i), 0, radius * Math.sin(i)));
                    points.push(new THREE.Vector3(radius * Math.cos(i), length, radius * Math.sin(i)));
                }
    object = THREE.SceneUtils.createMultiMaterialObject( new THREE.ConvexGeometry( points ), materials );
    object.position.set( 0, 250, 0);
    group.add(object);
    for(var idx = 0; idx < string.length - 1; ++idx) {
        // Follow Current Draw Instruction
        var c = string.charAt(idx);

        switch(c) {
            case "+": {
                // corner piece + rotation
                console.log("rotate+");
                object.rotation.x += Math.PI / 2;
            } break;

            case "-": {
                // corner piece + rotation
                console.log("rotate-");
                object.rotation.x += -Math.PI / 2;
            } break;

            case "X": {
                // straight line
                parentObj = object;
                object = THREE.SceneUtils.createMultiMaterialObject( new THREE.ConvexGeometry( points ), materials );
                object.position.set( 0, 250, 0);
                parentObj.add(object);
            } break;
        }
    }

    return group;
}

function init(str) {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 200000 );
    camera.position.y = 4000;

    scene = new THREE.Scene();

    var light, object, materials;

    scene.add( new THREE.AmbientLight( 0x404040 ) );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 0 );
    scene.add( light );



    // tetrahedron

    scene.add( drawSystem(str) );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    render();
}

function render() {

    var timer = Date.now() * 0.0001;

    //camera.position.x = Math.cos( timer ) * 800;
    //camera.position.z = Math.sin( timer ) * 800;

    camera.lookAt( scene.position );

    for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

        var object = scene.children[ i ];

        //object.rotation.x = timer * 5;
        object.rotation.z = Math.PI / 2;
    }

    object.position.x = 1000;
    renderer.render( scene, camera );

}
