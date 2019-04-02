/*
    Animation rendering base structure: 

    var dlt = animationClock.getDelta();   // get elapsed time
    remainingAnimationTime-=dlt;           // decrease total animation time

    ... Animation stuff ...

    if(remainingAnimationTime<0){
        set exact final result of the animation 
        call finalization function
    }

*/

/**
 * gradually rotates the game object of the given angles
 */
function rotationRender() {
	var dlt = animationClock.getDelta();
	remainingAnimationTime -= dlt;
	game.rotation.x -= (angleX * dlt) / animationTime;
	game.rotation.y -= (angleY * dlt) / animationTime;
	game.rotation.z -= (angleZ * dlt) / animationTime;
	if (remainingAnimationTime < 0) {
		game.setRotation(finalResultOfRotation);
		endRotationAnimation();
	}
}

/**
 * gradually rotates the game object of the given angle on a given axis
 */
function rotationAxisRender() {
	var dlt = animationClock.getDelta();
	remainingAnimationTime -= dlt;
	game.rotateAxis(rotationAxis, (angleAxis * dlt) / animationTime);
	if (remainingAnimationTime < 0) {
		game.setRotation(finalResultOfRotation);
		endRotationAxisAnimation();
	}
}

