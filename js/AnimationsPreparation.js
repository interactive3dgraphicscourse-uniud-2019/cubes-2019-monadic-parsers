/*
    Remeber to:
    1- set all the global variables accordingly to your animation.
    2- put normalOperations at false and disable camera rotation (OrbitControls)
    3- enable the right animation flag
    4- set finalResultOfRotation correctly so that the animation ends exactly as expected
    5- to reset the animationClock and the remainingAnimationTime variable
*/

/**
 *  rotation animation: align game matrix to camera
 */
function alignToCamera() {
    if (!anyAnimation()) {
        rotationAnimation = true;
        normalOperations = false;
        angleX = game.rotation.x - camera.rotation.x;
        angleY = game.rotation.y - camera.rotation.y;
        angleZ = game.rotation.z - camera.rotation.z;
        animationTime = 500 / 1000;           // 500 ms;
        remainingAnimationTime = animationTime;
        animationClock.getDelta();            // initialize Clock
        controls.enableRotation = false;
        finalResultOfRotation = camera.rotation;
    }
}

/**
 * Simulates the rotation of the game matrix on a given axsis
 * @param {*} rotationAxis rotation axis 
 * @param {*} angleAxis    angle of rotation
 */
function simulateRotationOnAxis(rotationAxis, angleAxis) {
    m = new THREE.Matrix4();
    var axis = rotationAxis.clone();
    m.makeRotationAxis(axis.normalize(), angleAxis);
    pMatrix = game.pivot.matrix.clone();
    pMatrix.multiply(m);
    rotValues = new THREE.Euler(0, 0, 0, "XYZ");
    rotValues.setFromRotationMatrix(pMatrix);
    return rotValues;
}

/* --- 45° rotations --- */

function rotateRight45() {
    if (!anyAnimation()) {
        rotationAxisAnimation = true;
        normalOperations = false;
        /* compute rotation given the camera position */

        angleAxis = Math.PI / 4;
        rotationAxis = game.Y.position;

        animationTime = 500 / 1000;           // 500 ms;
        remainingAnimationTime = animationTime;
        animationClock.getDelta();            // initialize Clock
        controls.enableRotation = false;
        /* fix loss of accuracy due to the animation clock */
        var rotValues = simulateRotationOnAxis(rotationAxis, angleAxis);
        finalResultOfRotation = new THREE.Vector3(rotValues.x, rotValues.y, rotValues.z);
    }
}

function rotateLeft45() {
    if (!anyAnimation()) {
        rotationAxisAnimation = true;
        normalOperations = false;
        /* compute rotation given the camera position */

        angleAxis = -Math.PI / 4;
        rotationAxis = game.Y.position;

        animationTime = 500 / 1000;           // 500 ms;
        remainingAnimationTime = animationTime;
        animationClock.getDelta();            // initialize Clock
        controls.enableRotation = false;
        /* fix loss of accuracy due to the animation clock */
        var rotValues = simulateRotationOnAxis(rotationAxis, angleAxis);
        finalResultOfRotation = new THREE.Vector3(rotValues.x, rotValues.y, rotValues.z);
    }
}

function rotateUp45() {
    if (!anyAnimation()) {
        rotationAxisAnimation = true;
        normalOperations = false;
        /* compute rotation given the camera position */

        angleAxis = -Math.PI / 4;
        rotationAxis = game.X.position;

        animationTime = 500 / 1000;           // 500 ms;
        remainingAnimationTime = animationTime;
        animationClock.getDelta();            // initialize Clock
        controls.enableRotation = false;
        /* fix loss of accuracy due to the animation clock */
        var rotValues = simulateRotationOnAxis(rotationAxis, angleAxis);
        finalResultOfRotation = new THREE.Vector3(rotValues.x, rotValues.y, rotValues.z);
    }
}

function rotateDown45() {
    if (!anyAnimation()) {
        rotationAxisAnimation = true;
        normalOperations = false;
        /* compute rotation given the camera position */

        angleAxis = Math.PI / 4;
        rotationAxis = game.X.position;

        animationTime = 500 / 1000;           // 500 ms;
        remainingAnimationTime = animationTime;
        animationClock.getDelta();            // initialize Clock
        controls.enableRotation = false;
        /* fix loss of accuracy due to the animation clock */
        var rotValues = simulateRotationOnAxis(rotationAxis, angleAxis);
        finalResultOfRotation = new THREE.Vector3(rotValues.x, rotValues.y, rotValues.z);
    }
}
