/**
 * 
 * Gioco della vita 3D
 * 
 */

  var scene, camera, controls, renderer;
  
  
  /* game components*/
  var gameMatrix;
  var cubeMatrix;
  
  /* game settings (GM = game matrix) */
  var height=20;  //  GM height
  var width=20;   //  GM width
  var depth=1;    //  GM depth
  var AAmin=2;    //  Minimum number of alive neighbour for a cell to remain alive
  var AAmax=3;    //  Maximum number of alive neighbour for a cell to remain alive
  var DAmin=3;    //  Minimum number of alive neighbour for a cell to become alive
  var DAmax=3;    //  Maximum number of alive neighbour for a cell to become alive
  
  /* camera settings */
  var defaultPosition = new THREE.Vector3(0,0,20);
  
  /* other variables to manage game's behaviour */
  var auto=false;      // auto update of GM flag
  var stepTime = 250;  // auto update delta time (in ms)
  var step = stepTime; // variable measuring the remaining time before an auto update
  var defaultOperations = true;   // if the game is in the default mode 
  var settingsOperations = false; // if the game is in the settings screen (maybe)
  
  /* manage input for simulation management*/
  document.addEventListener('keydown', inputReader); // keyboard
  document.getElementById("opt_btn").addEventListener("click", setOptions); // set-option BTN
  document.getElementById("auto_btn").addEventListener("click", setAuto);   // set-auto BTN
  
  /**
   * Enables auto update of the game matrix and sets update time
   */
  function setAuto(){
	  delta = clock.getDelta(); // reset delta
	  stepTime = document.getElementById("auto_in").value / 1000; //ms conversion
	  step = stepTime;
	  auto = !auto;             // change auto status
	  if(auto){                 // update button text
		  document.getElementById("auto_btn").innerHTML = "STOP AUTO";
	  }else{
		  document.getElementById("auto_btn").innerHTML = "START AUTO";
	  }
  }
  
  /**
   * prints the active game settings onto the console
   */
  function logStatus(){
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
	  if(e.code == "KeyA"){ 
		  /* A: update game matrix manually */ 
		  console.log("Using:");
		  logStatus();
		  update();
	  }else if(e.code == "KeyR"){ 
		  /* R: reset game matrix */
		  reset();
	  }
  }
  
  /**
   * sets settings and resets the game
   */
  function setOptions(){
	  height = document.getElementById("height_in").value;
	  width = document.getElementById("width_in").value;
	  depth = document.getElementById("depth_in").value;
	  AAmin = document.getElementById("AAmin_in").value;
	  AAmax = document.getElementById("AAmax_in").value;
	  DAmin = document.getElementById("DAmin_in").value;
	  DAmax = document.getElementById("DAmax_in").value;
	  console.log("new Settings!");
	  logStatus();
	  reset();
  }
  
  /**
   * removes the previous game matrix and prepares a new one
   */
  function reset(){
	  deleteCubes();
	  initializeMatrices(height,width,depth);
	  drawGameMatrix();
  }
  
  /**
   * remove all the cubes of the previous game matrix from the scene
   */
  function deleteCubes(){
	  
	  for(i = 0; i<gameMatrix.length; i++){
		  for(j = 0; j<gameMatrix[i].length; j++){
			  for(k = 0; k<gameMatrix[i][j].length; k++){
				  scene.remove(cubeMatrix[i][j][k]);
			  }
		  }
	  }	  
  }
  
  /**
   * initialize the game 3D matrix
   * @param height (number of cells for the game matrix) 
   * @param width  (number of cells for the game matrix) 
   * @param depth  (number of cells for the game matrix) 
   * @returns
   */
  function initializeMatrices(height,width,depth){
	  
	  /* create new cube Geometry and Material */
	  cubeG = new THREE.CubeGeometry(1);
	  cubeM = new THREE.MeshBasicMaterial( { color:0x00AA00,wireframe: true } );
	  
	  /* initialize the game matrix randomly */
	  /* the game matrix is directly associated to a cube matrix */
	  gameMatrix = [];
	  cubeMatrix = [];
	  for(i = 0; i<width; i++){
		  gameMatrix.push([])
		  cubeMatrix.push([])
		  for(j = 0; j<height; j++){
			  gameMatrix[i].push([]);
			  cubeMatrix[i].push([]);
			  for(k = 0; k<depth; k++){
				  gameMatrix[i][j].push(Math.random() >= 0.5);
				  cubeMatrix[i][j].push(new THREE.Mesh(cubeG,cubeM));
				  /* the cubes are displaced so that the 3D structure is centered in (0,0,0) */
				  cubeMatrix[i][j][k].position.x+=i-(width/2);
				  cubeMatrix[i][j][k].position.y+=j-(height/2);
				  cubeMatrix[i][j][k].position.z-=k-(depth/2);
				  scene.add(cubeMatrix[i][j][k]); // add the newly created cube to the scene
				  cubeMatrix[i][j][k].visible = gameMatrix[i][j][k];
			  }
		  }
	  }
	  
	  /* reset camera position and compute new default */
	  maxZ = depth/2; // shift camera of half the depth of the cube matrix
	  defaultPosition = new THREE.Vector3(0,0,maxZ + 20);
	  camera.position.set(defaultPosition.x,defaultPosition.y,defaultPosition.z);
	  
	  
  }
  
  /**
   * updates the visible cubes accordingly to the game matrix
   */
  function drawGameMatrix(){	
	  for(i = 0; i<gameMatrix.length; i++){
		  for(j = 0; j<gameMatrix[i].length; j++){
			  for(k = 0; k<gameMatrix[i][j].length; k++){
				  cubeMatrix[i][j][k].visible = gameMatrix[i][j][k]
			  }
		  }
	  }  
  }
  
  /**
   * count how many cells are alive in the neighbourhood of cell (i,j,k)
   * @param i
   * @param j
   * @param k
   * @returns the number of alive cells surrounding (i,j,k)
   */
  function countAlive(i,j,k){
	  count = 0;
	  for(ii = i-1; ii<= i+1; ii++){
		  if(ii>=0 && ii<gameMatrix.length){
			  for(jj = j-1; jj<=j+1; jj++){
				  if(jj>=0 && jj<gameMatrix[i].length){
					  
					  for(kk=k-1; kk<=k+1; kk++){
						  if(kk>=0 && kk<gameMatrix[i][j].length){
							  if(gameMatrix[ii][jj][kk] && (i!=ii||j!=jj||kk!=k)){
								  count+=1;
							  }
						  }
					  }
				  }
			  }
		  }
	  }
	  return count;
  }
  
  
  /**
   * computes the next state of the simulation
   */
  function update(){
	  
	  /* initialize new game matrix */
	  newGameMatrix = [];
	  for(i = 0; i<gameMatrix.length; i++){
		  newGameMatrix.push([]);
		  for(j = 0; j<gameMatrix[i].length; j++){
			  newGameMatrix[i].push([]);
			  for(k = 0; k<gameMatrix[i][j].length; k++){
				  newGameMatrix[i][j].push(false);
			  }
		  }
	  }

	  /* compute the next simulation step applying alive-dead transitions */
	  for(i = 0; i<gameMatrix.length; i++){
		  for(j = 0; j<gameMatrix[i].length; j++){
			  for(k = 0; k<gameMatrix[i][j].length; k++){
				  living_neighbour = countAlive(i,j,k);
				  /* if alive */
				  if(gameMatrix[i][j][k]){
					  if(living_neighbour>=AAmin && living_neighbour<=AAmax){
						  newGameMatrix[i][j][k] = true;
					  }
				  /* if dead */
				  }else{ 
					  if(living_neighbour>=DAmin && living_neighbour<=DAmax){
						  newGameMatrix[i][j][k] = true;
					  }
				  }
			  }
		  }
	  }
	  
	  gameMatrix = newGameMatrix;
	  drawGameMatrix();
  }
  
  
  
  /* enable stats */
  var stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );
  
  /* clock and delta-time */ 
  var clock = new THREE.Clock();
  var delta = 0; 

  /* initialization: executed at page load */
  function Init(){
	  
	/*--- common operations --*/
  	scene    = new THREE.Scene();
  	/*                                    FOV              aspect ratio                min  max    distance for visible objects */
  	camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,        10000);
  	renderer = new THREE.WebGLRenderer();
  	renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new THREE.OrbitControls( camera , renderer.domElement);
    
    /* append renderer to page (might want to change to a well defined location on the page) */
    /* or to render directly the menu in THREEJS */
    document.body.appendChild(renderer.domElement); 
    
  	/*--- beigin init ---*/
  	camera.position.set(defaultPosition.x,defaultPosition.y,defaultPosition.z);
  	
  	initializeMatrices(height,width,depth);
  	
  	console.log("INIT END")
  }
  
  
  /* rendering loop */
  function Render(){
	  
  	requestAnimationFrame(Render);
  	controls.update();
	stats.begin();
	
	if(auto){
		/* update auto clock */
		delta = clock.getDelta();
		step-=delta;
		if(step<0){
			update();        /* update */
			step = stepTime; /* reset remaining time for next step */
		}
	}
  	
	renderer.render(scene, camera);
	stats.end();
  	
  	
  }
  
  Init();
  Render();