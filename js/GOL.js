/**
 * 3D Game of Life 
 * TODO fai in modo di separare nettamente le azioni sul menu e sulla scena principale usando i flag (menuMode) 
 * (per i bottoni)
 */

/* --- GLOBAL VARIABLES --- */

/* visualization */
var scene, camera, controls, renderer;
var hudScene, hudCamera;
var helpScene;

var hudEnabled = true;
var hudCounter = 1.;
var OK_hud = false;
var frameCount = 0;
var helpEnabled = false;


/* enable stats */
//var stats = new Stats();
//stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
//document.body.appendChild(stats.dom);

/* clock and delta-time (used to compute the time duration of each frame) */
var clock = new THREE.Clock();
var delta = 0;

/* game settings (GM = game matrix) */
var height = 20;  //  GM height
var width = 20;   //  GM width
var depth = 1;    //  GM depth
var AAmin = 2;    //  Minimum number of alive neighbour for a cell to remain alive
var AAmax = 3;    //  Maximum number of alive neighbour for a cell to remain alive
var DAmin = 3;    //  Minimum number of alive neighbour for a cell to become alive
var DAmax = 3;    //  Maximum number of alive neighbour for a cell to become alive

/* game components*/
var game;

/* camera settings */
var defaultPosition = new THREE.Vector3(0, 0, 20);

/* other variables to manage game's behaviour (settings) */
var auto = false;      // auto update of GM flag
var stepTime = 0.250;  // auto update delta time (in ms)
var step = stepTime; // variable measuring the remaining time before an auto update

/* active mode */
var normalOperations = true;   // if the game is in the default mode 
var settingsOperations = false; // if the game is in the settings screen (maybe)

/* manage input for simulation management*/
document.addEventListener('keydown', inputReader); // keyboard

/* animation variables (to be reused among differen timed animations) */
var animationClock = new THREE.Clock();
var angleX, angleY, angleZ;    /* target rotation angles */
var angleAxsis;                /* angle for rotation on a given axis */
var rotationAxis;              /* axis for rotation */
var animationTime;             /* animation total duration */
var remainingAnimationTime;    /* remaining time before the end of animation */
var finalResultOfRotation; /* used to fix approximation errors made at the end of the animation */

/*--- animation types and dedicated variables ---*/
var rotationAnimation = false;

var rotationAxisAnimation = false;

/*--- explosions ---*/
var exploding = false;

var ExpolsionObject;

/**
* Enables auto update of the game matrix and sets update time
*/
function setAuto() {
	delta = clock.getDelta(); // reset delta
	step = stepTime;
	auto = !auto;             // change auto status
}

/**
* prints the active game settings onto the console
*/
function logStatus() {
	console.log("height = " + height);
	console.log("width = " + width);
	console.log("depth = " + depth);
	console.log("AAmin = " + AAmin);
	console.log("AAmax = " + AAmax);
	console.log("DAmin = " + DAmin);
	console.log("DAmax = " + DAmax);
}

/**
* reads keyboard input 
* @param e (event)
*/
function inputReader(e) {

	if (e.code == "Enter") {
		/* A: update game matrix manually */
		//console.log("Using:");
		//logStatus();
		game.update();
	} else if (e.code == "KeyR") {
		/* R: reset game matrix */
		reset();
	} else if (e.code == "Period") {
		/* Reset camera position to default */
		alignToCamera();
	} else if (e.code == "ArrowRight") {
		/* R: reset game matrix */
		rotateRight45();
	} else if (e.code == "ArrowLeft") {
		/* R: reset game matrix */
		rotateLeft45();
	} else if (e.code == "ArrowUp") {
		/* R: reset game matrix */
		rotateUp45();
	} else if (e.code == "ArrowDown") {
		/* R: reset game matrix */
		rotateDown45();
	} else if (e.code == "KeyE") {
		/* explode */
		explosion();
	} else if (e.code == "KeyX") {
		/* toggle hud */
		hudEnabled = !hudEnabled;
	} else if (e.code == "KeyH") {
		/* toggle help */
		helpEnabled = !helpEnabled;
		HelpObj.visible = !HelpObj.visible;
	} else if (e.code == "KeyA") {
		/* enable auto update */
		setAuto();
	} 

}

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
	OK_hud = false;
	hudScene.remove(HUD_obj);
	VoxelHUD();
	hudScene.add(HUD_obj);
}

function anyAnimation() {
	return rotationAnimation || rotationAxisAnimation;
}

var charA;





/* initialization: executed at page load */
function Init() {
	prepareFontMatrices(fontsMatrices);

	/*--- common operations --*/
	scene = new THREE.Scene();
	hudScene = new THREE.Scene();
	helpScene = new THREE.Scene();
	hudCamera = new THREE.OrthographicCamera(-window.innerWidth/2 , window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, -30, 30);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.autoClear = false; // to display the HUD
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(1)

	/* controls */
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableKeys = false;

	/* append renderer to page (might want to change to a well defined location on the page) */
	/* or to render directly the menu in THREEJS */
	document.body.appendChild(renderer.domElement);

	/*--- beigin init ---*/
	camera.position.set(defaultPosition.x, defaultPosition.y, defaultPosition.z);
	game = new GOL3D(height, width, depth, AAmin, AAmax, DAmin, DAmax);
	game.addToScene(scene);

	terrain = new Terrain("res/heightmap15.png");
	terrain.addToScene(scene);

	//hud.position.x += window.innerWidth/2;
	//hud.position.y += 10;
	hudScene.add(HUD_obj);
	hudScene.add(HelpObj);

	//console.log("INIT END")
	var gui = new dat.GUI({hideable: false});

	effectController = {
		width:width,
		height:height,
		depth:depth,
		Stay_alive_min:AAmin,
		Stay_alive_max:AAmax,
		Become_alive_min:DAmin,
		Become_alive_max:DAmax,
		Auto_step_time:stepTime
		
	}

	var sizeFolder = gui.addFolder('Game matrix dimensions');
	var lifeFolder = gui.addFolder('Options for life and death');

	sizeFolder.add( effectController, 'width', 1, 30,  1 ).onChange(function(){ width = effectController.width });
	sizeFolder.add( effectController, 'height', 1, 30,  1 ).onChange(function(){ height = effectController.height });
	sizeFolder.add( effectController, 'depth', 1, 30, 1 ).onChange(function(){ depth = effectController.depth });
	lifeFolder.add( effectController, 'Stay_alive_min', 0, 26, 1 ).onChange(function(){ AAmin = effectController.Stay_alive_min });
	lifeFolder.add( effectController, 'Stay_alive_max', 0, 26, 1 ).onChange(function(){ AAmax = effectController.Stay_alive_max });
	lifeFolder.add( effectController, 'Become_alive_min', 0, 26, 1 ).onChange(function(){ DAmin = effectController.Become_alive_min });
	lifeFolder.add( effectController, 'Become_alive_max', 0, 26, 1 ).onChange(function(){ DAmax = effectController.Become_alive_max });
	gui.add( effectController, 'Auto_step_time', 0.050, 2.00, 0.050 ).onChange(function(){ stepTime = effectController.Auto_step_time });
	var info = gui.addFolder('Press H to view keyboard shortcuts');
	var info = gui.addFolder('Press R to apply changes and reset');
}

/* RENDERING FUNCTIONS */

/**
 * updates the game matrix automatically 
 */
function autoUpdate() {
	/* update auto clock */
	//delta = clock.getDelta();
	step -= delta;
	if (step < 0) {
		game.update();        /* update */
		step = stepTime;      /* reset remaining time for next step */
	}
}

/* menu variables */

var menuScene;
var menuCamera;
var menuMode = false;

function init_menu() {
	if (menuMode) {
		menuMode = false;
	} else {
		menuScene = new THREE.Scene();
		menuCamera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, -1000, 1000);
		menuMode = true;
		//pageS  = preparePageSettings(menuScene);
		pageLD = preparePageLifeAndDeath(menuScene);

	}

}



/* rendering loop */
function Render() {
	
	if (menuMode) {
		requestAnimationFrame(Render);
		renderer.render(menuScene, menuCamera);
	} else {
		Help(hudScene);
		delta = clock.getDelta();
		frameCount++;
		hudCounter -= delta;
		
		if (hudCounter < 0) {
			VoxelHUD();
			UpdateFPS();
			hudCounter = 1.;
			frameCount = 0;
		}
		
		requestAnimationFrame(Render);
	
		//stats.begin();
		controls.update();

		if (auto) {
			autoUpdate();
		}

		if (rotationAnimation) {
			rotationRender();
		}

		if (rotationAxisAnimation) {
			rotationAxisRender();
		}

		if (exploding) {
			var dlt = animationClock.getDelta();
			ExpolsionObject.doMovement(dlt);
		}


		renderer.render(scene, camera);
		if (hudEnabled) {
			renderer.render(hudScene, hudCamera);
		}
		if (helpEnabled) {
			renderer.render(helpScene, hudCamera);
		}

		//stats.end();
	}
}



Init();
Render();

