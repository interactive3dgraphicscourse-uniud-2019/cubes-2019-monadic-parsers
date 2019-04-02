/**
 * 3D Game of Life 
 * TODO refactoring
 *      size bug
 *      resizing dinamico
 *      volpi
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
	} else if (e.code == "KeyA") {
		/* enable auto update */
		setAuto();
	} else if (e.code == "KeyP") {
		/* change camera */
		changeCamera();
	}

}

let pos_per = new THREE.Vector3(); 
let rot_per = new THREE.Vector3();
let pos_orto = new THREE.Vector3();
let rot_orto = new THREE.Vector3();
let zoom_orto = new THREE.Vector3();

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

function showHUD(){
	hudEnabled = !hudEnabled;
}

function showHelp(){
	helpEnabled = !helpEnabled;
	HelpObj.visible = !HelpObj.visible;
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

	pos_per = defaultPosition.clone(); 
	rot_per = camera.rotation.clone();
	pos_orto = defaultPosition.clone(); 
	rot_orto = camera.rotation.clone();
	zoom_orto = 10;

	

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
		Auto_step_time:stepTime,
		Explode: function(){  explosion(); },
		Set_auto: function(){  setAuto(); },
		Reset: function() { reset(); },
		Toggle_Hud:  function() { showHUD(); },
		View_Help:  function() { showHelp(); },
		Switch_camera: function() { changeCamera(); }   
	};

	var sizeFolder = gui.addFolder('Game matrix dimensions');
	var lifeFolder = gui.addFolder('Options for life and death');

	sizeFolder.add( effectController, 'width', 1, 30,  1 ).onChange(function(){ width = effectController.width; reset(); });
	sizeFolder.add( effectController, 'height', 1, 30,  1 ).onChange(function(){ height = effectController.height; reset(); });
	sizeFolder.add( effectController, 'depth', 1, 30, 1 ).onChange(function(){ depth = effectController.depth; reset(); });
	lifeFolder.add( effectController, 'Stay_alive_min', 0, 26, 1 ).onChange(function(){ AAmin = effectController.Stay_alive_min; reset(); });
	lifeFolder.add( effectController, 'Stay_alive_max', 0, 26, 1 ).onChange(function(){ AAmax = effectController.Stay_alive_max; reset(); });
	lifeFolder.add( effectController, 'Become_alive_min', 0, 26, 1 ).onChange(function(){ DAmin = effectController.Become_alive_min; reset(); });
	lifeFolder.add( effectController, 'Become_alive_max', 0, 26, 1 ).onChange(function(){ DAmax = effectController.Become_alive_max; reset(); });
	gui.add( effectController, 'Auto_step_time', 0.050, 2.00, 0.050 ).onChange(function(){ stepTime = effectController.Auto_step_time; reset(); });
	var miscFolder = gui.addFolder('Miscellaneous');
	miscFolder.add(effectController, 'Explode');
	miscFolder.add(effectController, 'Set_auto');
	miscFolder.add(effectController, 'Reset');
	miscFolder.add(effectController, 'Toggle_Hud');
	miscFolder.add(effectController, 'View_Help');
	miscFolder.add(effectController, 'Switch_camera');
	//var info1 = gui.addFolder('Press H to view keyboard shortcuts');
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

