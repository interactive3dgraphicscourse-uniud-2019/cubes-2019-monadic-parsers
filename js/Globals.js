/*--- visualization ---*/
var scene, camera, controls, renderer;
var hudScene, hudCamera;
var helpScene;

/*--- HUD AND HELP ---*/
var hudEnabled = true; // flag for HUD visualization
var hudCounter = 1.;   // wait a second for FPS computation
var OK_hud = false;    // true if hud was loaded (async) 
var frameCount = 0;    // Frame count for FPS
var helpEnabled = false;             // true if the help message should be shown on screen
var HelpObj = new THREE.Object3D();  // help 3D object
var helpReady = false;               // true if help was loaded (async)
var HUD_obj = new THREE.Object3D();  // HUD 3D object 
var HUD_content = [];                // object componsing the HUD
let TextScaleFactor = 1.5;           // text scale factor for HUD and help
let lineOffset = 3*TextScaleFactor/1.5; // line offset to divide HUD elements vertically

/*--- clock and delta-time (used to compute the time duration of each frame) ---*/
var clock = new THREE.Clock();
var delta = 0;

/*--- game settings (GM = game matrix) ---*/
var height = 20;  //  GM height
var width = 20;   //  GM width
var depth = 1;    //  GM depth
var AAmin = 2;    //  Minimum number of alive neighbour for a cell to remain alive
var AAmax = 3;    //  Maximum number of alive neighbour for a cell to remain alive
var DAmin = 3;    //  Minimum number of alive neighbour for a cell to become alive
var DAmax = 3;    //  Maximum number of alive neighbour for a cell to become alive

/*--- game components ---*/
var game;

/*--- camera settings ---*/
var defaultPosition = new THREE.Vector3(0, 0, 20);

/* other variables to manage game's behaviour (settings) ---*/
var auto = false;      // auto update of GM flag
var stepTime = 0.250;  // auto update delta time (in s)
var step = stepTime;   // variable measuring the remaining time before an auto update

/*--- active mode ---*/
var normalOperations = true;     // if the game is in the default mode 
var settingsOperations = false;  // if the game is in the settings screen (maybe)

/*--- animation variables (to be reused among differen timed animations) */
var animationClock = new THREE.Clock();
var angleX, angleY, angleZ;    /* target rotation angles */
var angleAxsis;                /* angle for rotation on a given axis */
var rotationAxis;              /* axis for rotation */
var animationTime;             /* animation total duration */
var remainingAnimationTime;    /* remaining time before the end of animation */
var finalResultOfRotation;     /* used to fix approximation errors made at the end of the animation */

/*--- animation types and dedicated variables ---*/
var rotationAnimation = false;  

var rotationAxisAnimation = false;

/*--- explosions ---*/
var exploding = false;        // states if the explosion animation was triggered
var ExpolsionObject;          // object managing the cubes during the explosion
var currentTerrainCubes = []; // cubes of the terrain (necessary to add them to the explosion animation)

/*--- multiple camera state management ---*/
let pos_per = new THREE.Vector3(); 
let rot_per = new THREE.Vector3();
let pos_orto = new THREE.Vector3();
let rot_orto = new THREE.Vector3();
let zoom_orto = new THREE.Vector3();

/*--- random spawn probability ---*/
let spawnProbability = 0.5;

/*--- font variables ---*/
/* list of characters objects */ 
var fontsMatrices = [];
/* supported characters */
var charList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
				 "(", ")", "!", "-", ".", ":",
				 "1","2","3","4","5","6","7","8","9","0",
                  "UpArrow", "DownArrow", "LeftArrow", "RightArrow"];
/* prepares structures for async font loading */
for (let i = 0; i < charList.length; i++) {
	fontsMatrices.push([{matrix:undefined, object: undefined}]);
}