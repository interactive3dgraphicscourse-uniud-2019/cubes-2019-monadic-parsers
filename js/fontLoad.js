/**
 * request to load a single character from the resources
 * @param {*} letter char to be loaded
 * @param {*} out_variable where to put the character object when it is ready (async loading)
 */
function loadFont(letter, out_variable) {
	/* name exceptions */
	if(letter == "!"){ letter="bang"; }
	if(letter == "."){ letter="dot"; }
	if(letter == ":"){ letter="column"; }
	if(letter == "-"){ letter="minus"; }
	var fileToLoad = "res/fonts/" + letter + ".jjba"; // is this a JoJo reference?
	var loader = new THREE.FileLoader();
	
	loader.load(
		// resource URL
		fileToLoad,
		// onLoad callback
		function (data) {
			// output the text to the console
			out_variable.matrix = buildMatrix(data);
			out_variable.object = prepareFontObject(out_variable.matrix);
			
		},
		// onProgress callback
		function (xhr) {
			//just do nothing
		},
		// onError callback
		function (err) {
			console.error('Error loading char: ' + letter);
		}
	);
}

/**
 * prepare a siple 2D matrix from the .jjba formatted text
 * @param {*} fontText string representing a .jjba file 
 * @returns the 2D matrix representig the read character
 */
function buildMatrix(fontText) {
	var matrix = [];
	/* read dimension */
	var x = fontText[0];
	var y = fontText[2];
	var z = fontText[4];
	var count = 6;
	/* use only first layer (2D)*/
	for (let i = 0; i < y; i++) {
		/* read lines */
		matrix.push([]);
		for (let j = 0; j < x; j++) {
			matrix[i].push(fontText[count]);
			count += 2;
		}
	}
	return matrix
}

/**
 * prepares the 2D matrices for each character of the font
 * @param {*} fontsMatrices where to put the loaded character objects (async)
 */
function prepareFontMatrices(fontsMatrices) {
	for (let i = 0; i < charList.length; i++) {
		loadFont(charList[i], fontsMatrices[i]);
	}
}

/**
 * prepares a character object (a 3D object) from a 2D matrix
 * @param {*} matrix a 2D matrix
 * @return an Object3D representing a character made of voxels
 */
function prepareFontObject( matrix ){
	let center = new THREE.Object3D();
	/* for efficiency we merge all the cube geometries in a single one */
	let final_Geometry = new THREE.Geometry({wireframe:true});
	let cg = new THREE.CubeGeometry(1);
	let cm = new THREE.MeshBasicMaterial();
	let cubes = [];
	/* read matrix */
	for(let i = 0; i<matrix.length; i++){
		for(let j = 0; j<matrix[i].length; j++){
			if(matrix[i][j] == "1"){
				/* create new cube */
				let cube = new THREE.Mesh(cg,cm);
				cubes.push(cube);
				cube.position.x -= (7/2-j);
				cube.position.y += 7/2-i;
				/* merge geometries */
				THREE.GeometryUtils.merge(final_Geometry, cube);
			}
			
		}
	}

	center = new THREE.Mesh(final_Geometry, cm);
	return center;
}

/**
 * finds an element in an array (linear search)
 * @param {*} v 
 * @param {*} el 
 * @returns the first index at which el occurs in v, -1 if it is not present
 */
function find(v, el){
	for(i = 0; i<v.length; i++){
		if (v[i] == el){
			return i;
		}
	}
	return -1;
}


/**
 * prepares a 3D object representing a string 
 * @param {*} text the string to be represented
 * @returns an object containing: a 3D string, the list of the 3D characters composing it and its length (width)
 * NOTE: unknown characters will be interpreted as spaces
 */
function prepareString(text){
	let center = new THREE.Object3D();
	let chars = [];
	for(var i = 0; i<text.length; i++){
		let pos = find(charList, text[i]);
		if(pos != -1){
			let char3D = fontsMatrices[pos].object.clone();
			center.add(char3D);
			chars.push(char3D);
			let coord = i*7 + 7/2 + i; // char size + half last char size + spaces
			char3D.position.x += coord - (text.length*7+(text.length-1))/2; 
		}	
	}
	return {object:center, chars:chars, length : chars.length*9+(chars.length-1)};
}

/**
 * Applies a given tranformation an all the characters of a string
 * @param {*} word the string
 * @param {*} transformation the action to be accomplished on each character (must be a function taking one argument)
 */
function applyTransformationToChars(word, transformation){
	for(let i = 0; i<word.chars.length; i++){
		transformation(word.chars[i]);
	}
}

/**
 * creates an arrow object
 * @param {*} type (Up-Down-Left-Right)
 * @returns a 3D arrow pointing the given direction
 */
function getArrow(type){
	let str = type+"Arrow"
	let pos = find(charList, str);
	if(pos!=-1){
		return fontsMatrices[pos].object.clone();
	}else{
		console.log("Error in loading arrow type: " + str);
	}
}