/**
 * 3D Game of Life 
 */

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

function prepareGUI(){
	var gui = new dat.GUI({ hideable: false });

	/* elements */
	effectController = {
		width: width,
		height: height,
		depth: depth,
		Stay_alive_min: AAmin,
		Stay_alive_max: AAmax,
		Become_alive_min: DAmin,
		Become_alive_max: DAmax,
		Auto_step_time: stepTime,
		Explode: function () { explosion(); },
		Set_auto: function () { setAuto(); },
		Reset: function () { reset(); },
		Toggle_Hud: function () { showHUD(); },
		Help: function () { showHelp(); },
		Switch_camera: function () { changeCamera(); },
		HUD_scale:TextScaleFactor
	};
	/* size options */
	var sizeFolder = gui.addFolder('Game matrix dimensions');
	sizeFolder.add(effectController, 'width', 1, 30, 1).onChange(function () { width = effectController.width; reset(); });
	sizeFolder.add(effectController, 'height', 1, 30, 1).onChange(function () { height = effectController.height; reset(); });
	sizeFolder.add(effectController, 'depth', 1, 30, 1).onChange(function () { depth = effectController.depth; reset(); });
	/* game option */
	var lifeFolder = gui.addFolder('Options for life and death');
	lifeFolder.add(effectController, 'Stay_alive_min', 0, 26, 1).onChange(function () { AAmin = effectController.Stay_alive_min; reset(); });
	lifeFolder.add(effectController, 'Stay_alive_max', 0, 26, 1).onChange(function () { AAmax = effectController.Stay_alive_max; reset(); });
	lifeFolder.add(effectController, 'Become_alive_min', 0, 26, 1).onChange(function () { DAmin = effectController.Become_alive_min; reset(); });
	lifeFolder.add(effectController, 'Become_alive_max', 0, 26, 1).onChange(function () { DAmax = effectController.Become_alive_max; reset(); });
	/* auto time */
	gui.add(effectController, 'Auto_step_time', 0.050, 2.00, 0.050).onChange(function () { stepTime = effectController.Auto_step_time; reset(); });
	/* misc */
	var miscFolder = gui.addFolder('Miscellaneous');
	miscFolder.add(effectController, 'Explode');
	miscFolder.add(effectController, 'Set_auto');
	miscFolder.add(effectController, 'Reset');
	miscFolder.add(effectController, 'Toggle_Hud');
	miscFolder.add(effectController, 'Switch_camera');
	miscFolder.add(effectController, 'HUD_scale', 0.2, 2.8, 0.1).onChange(function () { TextScaleFactor = effectController.HUD_scale; OK_hud=false; helpReady=false;});
	/* help button */
	gui.add(effectController, 'Help');
}

/* initialization: executed at page load */
function Init() {
	prepareFontMatrices(fontsMatrices);

	/*--- prepare scenes and cameras (for HUD and game) --*/
	scene = new THREE.Scene();
	hudScene = new THREE.Scene();

	hudCamera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, -30, 30);
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

	/* prepare renderer */
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.autoClear = false; // to display the HUD
	renderer.setSize(window.innerWidth, window.innerHeight); // TODO: dinamically resize renderer
	renderer.setPixelRatio(1)   // use full resolution

	/* initialize camera positions */
	pos_per = defaultPosition.clone();
	rot_per = camera.rotation.clone();
	pos_orto = defaultPosition.clone();
	rot_orto = camera.rotation.clone();
	zoom_orto = 10;
	camera.position.set(defaultPosition.x, defaultPosition.y, defaultPosition.z);

	/* orbit controls */
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableKeys = false;
	controls.enablePan = false;

	/* append renderer to page */
	document.body.appendChild(renderer.domElement);

	/* inizialize first game matrix */
	game = new GOL3D(height, width, depth, AAmin, AAmax, DAmin, DAmax);
	game.addToScene(scene);

	/* initialize terrain */
	terrain = new Terrain("res/heightmap15.png");
	terrain.addToScene(scene);

	/* add HUD and Help object to the scene */
	hudScene.add(HUD_obj);
	hudScene.add(HelpObj);
	HelpObj.visible = false;

	/* prepare dat GUI */
	prepareGUI();
}

/* menu variables */
var menuScene;
var menuCamera;

/* rendering loop */
function Render() {
	requestAnimationFrame(Render);
	delta = clock.getDelta(); // compute frame time
	Help(hudScene);           // async load of help msg
	VoxelHUD();              // async load of HUD

	frameCount++;
	hudCounter -= delta;

	/* fps counter and hud preparation */
	if (hudCounter < 0) {
		
		UpdateFPS(); 
		hudCounter = 1.; // computes FPS each second
		frameCount = 0;
	}

	controls.update();   // update orbit controls

	/* auto update procedure */
	if (auto) {
		autoUpdate();
	}

	/* look at camera animation */ 
	if (rotationAnimation) {
		rotationRender();
	}

	/* rotation on game matix axes */
	if (rotationAxisAnimation) {
		rotationAxisRender();
	}

	/* explosioin animation */
	if (exploding) {
		var dlt = animationClock.getDelta();
		ExpolsionObject.doMovement(dlt);
	}

	/* render scenes */
	renderer.render(scene, camera);
	if (hudEnabled) {
		renderer.render(hudScene, hudCamera);
	}
}

Init();
Render();

