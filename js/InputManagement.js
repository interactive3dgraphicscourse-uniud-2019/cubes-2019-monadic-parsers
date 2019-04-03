/* manage input for simulation management*/
document.addEventListener('keydown', inputReader); // keyboard

/**
* Enables auto update of the game matrix and sets update time
*/
function setAuto() {
	delta = clock.getDelta(); // reset delta
	step = stepTime;
	auto = !auto;             // change auto status
}

/**
* reads keyboard input 
* @param e (event)
*/
function inputReader(e) {
	if (e.code == "KeyN") {
		/* A: update game matrix manually */
		game.update();
	} else if (e.code == "KeyR") {
		/* R: reset game matrix */
		reset();
	} else if (e.code == "Period") {
		/* Reset camera position to default */
		if(!exploding)
			alignToCamera();
	} else if (e.code == "ArrowRight") {
		/* R: reset game matrix */
		if(!exploding)
			rotateRight45();
	} else if (e.code == "ArrowLeft") {
		/* R: reset game matrix */
		if(!exploding)
			rotateLeft45();
	} else if (e.code == "ArrowUp") {
		/* R: reset game matrix */
		if(!exploding)
			rotateUp45();
	} else if (e.code == "ArrowDown") {
		/* R: reset game matrix */
		if(!exploding)
			rotateDown45();
	} else if (e.code == "KeyE") {
		/* explode */
		explosion();
	} else if (e.code == "KeyX") {
		/* toggle hud */
		showHUD();
	} else if (e.code == "KeyH") {
		/* toggle help */
		showHelp();
		e.stopPropagation();
	} else if (e.code == "KeyA") {
		/* enable auto update */
		setAuto();
	} else if (e.code == "KeyP") {
		/* change camera */
		changeCamera();
	}
}

/* action functions */

/**
 * switches between ortographic and perspective cameras
 */
function changeCamera(){

	if (camera.isPerspectiveCamera){
		pos_per = camera.position.clone(); 
		rot_per = camera.rotation.clone();
		camera = new THREE.OrthographicCamera(-window.innerWidth/2 , window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, -30000, 30000);
		camera.position.set(pos_orto.x,pos_orto.y,pos_orto.z);
		camera.rotation.set(rot_orto.x,rot_orto.y,rot_orto.z);
		camera.zoom = zoom_orto;
	} else {
		pos_orto = camera.position.clone(); 
		rot_orto = camera.rotation.clone();
		zoom_orto = camera.zoom;
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.position.set(pos_per.x,pos_per.y,pos_per.z);
		camera.rotation.set(rot_per.x,rot_per.y,rot_per.z);
	}
	camera.updateProjectionMatrix();
	/* update controls */
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableKeys = false;
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
	/* update main camera */
	if(camera.isPerspectiveCamera){
    	camera.aspect = window.innerWidth / window.innerHeight;
	}else{
		var camFactor = camera.zoom; 
		camera.left = -window.innerWidth/2 ;
        camera.right = window.innerWidth/2 ;
        camera.top = window.innerHeight/2 ;
        camera.bottom = -window.innerHeight/2;
        camera.updateProjectionMatrix();
	}
	camera.updateProjectionMatrix();
	/* reset HUD camera */
	var camFactor = hudCamera.zoom; 
	hudCamera.left = -window.innerWidth/2 ;
	hudCamera.right = window.innerWidth/2 ;
	hudCamera.top = window.innerHeight/2 ;
	hudCamera.bottom = -window.innerHeight/2 ;
	hudCamera.updateProjectionMatrix();
	/* set flag for HUD update */
	OK_hud = false;
	helpReady = false;
	/* reset renderer */
    renderer.setSize( window.innerWidth, window.innerHeight );

}


/**
 * sets flag to view the HUD
 */
function showHUD(){
	hudEnabled = !hudEnabled;
	if (!hudEnabled) {
		helpEnabled = false;
		HelpObj.visible = false;
	}
}

/**
 * sets flags to show help
 */
function showHelp(){
	if (!hudEnabled && !helpEnabled) {
		hudEnabled = true;
	}
	helpEnabled = !helpEnabled;
	HelpObj.visible = !HelpObj.visible;
}

/**
 * executes explosion animation
 */
function explosion() {
	if (!exploding) {
		animationClock.getDelta();
		ExpolsionObject = new Explosion(game, scene);
		ExpolsionObject.addCubes(currentTerrainCubes);
		ExpolsionObject.setMovementInfoOfCubes()
		exploding = true;
	}
}

/**
 * removes the previous game matrix and prepares a new one
 */
function reset() {
	game.dispose(scene);
	game = new GOL3D(height, width, depth, AAmin, AAmax, DAmin, DAmax);
	game.addToScene(scene);
	if (exploding) {
		ExpolsionObject.dispose(scene);
		terrain.removeFromScene(scene);
		terrain = new Terrain("res/heightmap15.png");
		terrain.addToScene(scene);
		exploding = false;
	}
	OK_hud = false; /* set HUD for update */
}

/**
 * @returns true if any animation is ongoing
 */
function anyAnimation() {
	return rotationAnimation || rotationAxisAnimation;
}

/**
 * updates the game matrix automatically (each stepTime seconds)
 */
function autoUpdate() {
	step -= delta;
	if (step < 0) {
		game.update();        /* update */
		step = stepTime;      /* reset remaining time for next step */
	}
}
