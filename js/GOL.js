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

document.addEventListener('PaperGUIReady', function(e) {
	prepareGUI();
});

function prepareGUI(){
	var gui = new PaperGUI({hidable:false});//({ hideable: false });

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
		HUD_scale:TextScaleFactor,
		Spawn_probability:spawnProbability
	};
	/* size options */
	//var sizeFolder = gui.addFolder('Game matrix dimensions');
	gui.add(effectController, 'Help');
	gui.add(effectController, 'width').name("Width").min(1.).max(30.0).step(1.).onChange(function () { width = effectController.width; reset(); });
	gui.add(effectController, 'height').name("Height").min(1.).max(30.0).step(1.).onChange(function () { height = effectController.height; reset(); });
	gui.add(effectController, 'depth').name("Depth").min(1.).max(30.0).step(1.).onChange(function () { depth = effectController.depth; reset(); });
	gui.add(effectController, 'Spawn_probability', 0., 1., 0.005).name("Change auto update time (ns)").min(0.).max(1.0).step(0.005).onChange(function () { spawnProbability = effectController.Spawn_probability; });
	gui.add(effectController, 'Reset').name("Generate new game");
	/* game option */
	//var lifeFolder = gui.addFolder('Options for life and death');
	gui.add(effectController, 'Stay_alive_min').name("Stay-alive minimum").min(0.).max(26.0).step(1.).onChange(function () { AAmin = effectController.Stay_alive_min; reset(); });
	gui.add(effectController, 'Stay_alive_max').name("Stay-alive maximum").min(0.).max(26.0).step(1.).onChange(function () { AAmax = effectController.Stay_alive_max; reset(); });
	gui.add(effectController, 'Become_alive_min').name("Become-alive minimum").min(0.).max(26.0).step(1.).onChange(function () { DAmin = effectController.Become_alive_min; reset(); });
	gui.add(effectController, 'Become_alive_max').name("Become-alive maximum").min(0.).max(26.0).step(1.).onChange(function () { DAmax = effectController.Become_alive_max; reset(); });
	/* auto time */
	gui.add(effectController, 'Set_auto').name("auto update");
	gui.add(effectController, 'Auto_step_time').name("Change auto update time (ns)").min(0.05).max(2.0).step(0.05).onChange(function () { stepTime = effectController.Auto_step_time; });
	/* misc */
	//var miscFolder = gui.addFolder('Miscellaneous');
	gui.add(effectController, 'Toggle_Hud').name("Enable-disable HUD");
	
	gui.add(effectController, 'HUD_scale').name("HUD scaling").min(0.2).max(2.8).step(0.1).onChange(function () {
		TextScaleFactor = effectController.HUD_scale;
		OK_hud=false; 
		helpReady=false;
		lineOffset = 3*TextScaleFactor/1.5;
	});
	gui.add(effectController, 'Switch_camera').name("Change camera type");
	gui.add(effectController, 'Explode').name("Explosion animation");
	/* help button */
	
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

}

/* menu variables */
var menuScene;
var menuCamera;

/* rendering loop */
function Render() {
	requestAnimationFrame(Render);
	delta = clock.getDelta(); // compute frame time
	Help();           // async load of help msg
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






	/*
								Monadic Parsers

			_                ___       _.--.  _,-=._            /|_/|
			\`.|\..----...-'`   `-._.-'_.-'``-.}   `=._,.-=-._.,  0 0._,
			/  ' `         ,       __.--'   	`._ _,-.   )      _,.-'
			)/' _/     \   `-_,   /             	`    G.m-"^m`m'      
			`-'" `"\_  ,_.-;_.-\_ ',     _.--~~~~~~~--._
				_.-'_./   {_.'   ; /    /~ ___           ~-._ 
				{_.-``-'         {_/   ( /~   > /-._   _, o  )~\\
										\\    \<    ~<<==\(\_| '''
										 )    '''     \\  `~'     
													  '''									
	*/



















