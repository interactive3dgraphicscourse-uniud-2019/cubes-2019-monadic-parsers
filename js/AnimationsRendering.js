	/**
	 * gradually aligns the game matrix to the camera
	 */
	function alignRender(){
		var dlt = animationClock.getDelta();
		remainingAnimationTime-=dlt;
		game.rotation.x-=(angleX*dlt)/animationTime;
		game.rotation.y-=(angleY*dlt)/animationTime;
		game.rotation.z-=(angleZ*dlt)/animationTime;
		if(remainingAnimationTime<0){
			game.setRotation(camera.rotation);
			endAlignAnimation();
		}
	}

    /**
     * gradually rotates the game object of the given angles
     */
	function rotationRender(){
		var dlt = animationClock.getDelta();
		remainingAnimationTime-=dlt;
		game.rotation.x-=(angleX*dlt)/animationTime;
		game.rotation.y-=(angleY*dlt)/animationTime;
		game.rotation.z-=(angleZ*dlt)/animationTime;
		if(remainingAnimationTime<0){
			game.setRotation(finalResultOfRotation);
			endRotationAnimation();
		}
	}

