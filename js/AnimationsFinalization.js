
    /**
	 * resumes normal execution after an alignment animation
	 */
	function endAlignAnimation(){
		controls.enableRotation = true;
		normalOperations = true;
		alignAnimation = false;
	}

	/**
	 * resumes normal execution after a rotation animation
     * (valid for any rotation)
	 */
	function endRotationAnimation(){
		controls.enableRotation = true;
		normalOperations = true;
		rotationAnimation = false;
	}