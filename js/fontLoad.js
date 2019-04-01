var fontsMatrices = [];
var charList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
				 "(", ")", "!", "-", ".", ":",
				 "1","2","3","4","5","6","7","8","9","0",
				  "UpArrow", "DownArrow", "LeftArrow", "RightArrow"];
for (let i = 0; i < charList.length; i++) {
	fontsMatrices.push([{matrix:undefined, object: undefined}]);
}

function loadFont(letter, out_variable) {
	var fileToLoad = "res/fonts/" + letter + ".jjba";
	var loader = new THREE.FileLoader();
	//load a text file and output the result to the console
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
			//console.log( 'loading...' );
		},
		// onError callback
		function (err) {
			console.error('An error happened');
		}
	);
}

function buildMatrix(myData) {
	var matrix = [];
	var x = myData[0];
	var y = myData[2];
	var z = myData[4];
	var count = 6;
	for (let i = 0; i < y; i++) {
		matrix.push([]);
		for (let j = 0; j < x; j++) {
			matrix[i].push(myData[count]);
			count += 2;
		}
	}
	return matrix
}

function prepareFontMatrices(fontsMatrices) {
	for (let i = 0; i < charList.length; i++) {
		loadFont(charList[i], fontsMatrices[i]);
	}
}

function prepareFontObject( matrix ){
	let center = new THREE.Object3D();
	let final_Geometry = new THREE.Geometry({wireframe:true});
	let cg = new THREE.CubeGeometry(1);
	let cm = new THREE.MeshBasicMaterial();
	let cubes = [];
	for(let i = 0; i<matrix.length; i++){
		for(let j = 0; j<matrix[i].length; j++){
			if(matrix[i][j] == "1"){
				let cube = new THREE.Mesh(cg,cm);
				cubes.push(cube);
				//center.add(cube);
				cube.position.x -= (7/2-j);
				cube.position.y += 7/2-i;
				THREE.GeometryUtils.merge(final_Geometry, cube);
			}
			
		}
	}

	center = new THREE.Mesh(final_Geometry, cm);
	
	return center;
}


function find(v, el){
	for(i = 0; i<v.length; i++){
		if (v[i] == el){
			return i;
		}
	}
	return -1;
}


/**
 * 
 * @param {*} text 
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
	return {object:center, chars:chars, length : chars.length*7+(chars.length-1)};
}

function applyTransformationToChars(word, transformation){
	for(let i = 0; i<word.chars.length; i++){
		transformation(word.chars[i]);
	}
}

function getArrow(type){
	let str = type+"Arrow"
	let pos = find(charList, str);
	if(pos!=-1){
		return fontsMatrices[pos].object.clone();
	}else{
		console.log("Error in loading arrow type: " + str);
	}
}