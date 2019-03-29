	/**
	 *  rotation animation: align game matrix to camera
	 */
	function alignToCamera(){
		if(!anyAnimation()){
			alignAnimation = true;
			normalOperations = false;
			angleX = game.rotation.x-camera.rotation.x;
			angleY = game.rotation.y-camera.rotation.y;
			angleZ = game.rotation.z-camera.rotation.z;
			animationTime = 500 / 1000;           // 500 ms;
			remainingAnimationTime = animationTime;
			animationClock.getDelta();            // initialize Clock
			controls.enableRotation = false;
		}
	}

    /* --- 45° rotations --- */

	function rotateRight45(){
		if(!anyAnimation()){
			rotationAnimation = true;
			normalOperations = false;
			angleX = 0;
			angleY = -(45*Math.PI/180);
			angleZ = 0;
			animationTime = 500 / 1000;           // 500 ms;
			remainingAnimationTime = animationTime;
			animationClock.getDelta();            // initialize Clock
            controls.enableRotation = false;
            /* fix loss of accuracy due to the animation clock */
			finalResultOfRotation = new THREE.Vector3(game.rotation.x-angleX,game.rotation.y-angleY,game.rotation.z-angleZ);
		}
	}

	function rotateLeft45(){
		if(!anyAnimation()){
			rotationAnimation = true;
			normalOperations = false;
			angleX = 0;
			angleY = (45*Math.PI/180);
			angleZ = 0;
			animationTime = 500 / 1000;           // 500 ms;
			remainingAnimationTime = animationTime;
			animationClock.getDelta();            // initialize Clock
            controls.enableRotation = false;
            /* fix loss of accuracy due to the animation clock */
			finalResultOfRotation = new THREE.Vector3(game.rotation.x-angleX,game.rotation.y-angleY,game.rotation.z-angleZ);
		}
	}

	function rotateUp45(){
		if(!anyAnimation()){
			rotationAnimation = true;
			normalOperations = false;
			angleX = (45*Math.PI/180);
			angleY = 0;
			angleZ = 0;
			animationTime = 500 / 1000;           // 500 ms;
			remainingAnimationTime = animationTime;
			animationClock.getDelta();            // initialize Clock
            controls.enableRotation = false;
            /* fix loss of accuracy due to the animation clock */
			finalResultOfRotation = new THREE.Vector3(game.rotation.x-angleX,game.rotation.y-angleY,game.rotation.z-angleZ);
		}
	}

	function rotateDown45(){
		if(!anyAnimation()){
			rotationAnimation = true;
			normalOperations = false;
			angleX = -(45*Math.PI/180);
			angleY = 0;
			angleZ = 0;
			animationTime = 500 / 1000;           // 500 ms;
			remainingAnimationTime = animationTime;
			animationClock.getDelta();            // initialize Clock
            controls.enableRotation = false;
            /* fix loss of accuracy due to the animation clock */
			finalResultOfRotation = new THREE.Vector3(game.rotation.x-angleX,game.rotation.y-angleY,game.rotation.z-angleZ);
		}
	}
