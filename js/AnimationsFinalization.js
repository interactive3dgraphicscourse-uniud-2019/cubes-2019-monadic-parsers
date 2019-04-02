/*
	Remember to:
	1- enable camera rotation with OrbitControls
	2- enable normalOperations
	3- disable the animation flag 
*/

/**
* resumes normal execution after an alignment animation
*/
function endRotationAnimation() {
	controls.enableRotation = true;
	normalOperations = true;
	rotationAnimation = false;
}

/**
 * resumes normal execution after a rotation animation
  * (valid for any rotation)
 */
function endRotationAxisAnimation() {
	controls.enableRotation = true;
	normalOperations = true;
	rotationAxisAnimation = false;
}