/**
 * Class that manages the explosion of the cube matrix
 * 
 * note that it is necessary to execute this.setMovementInfoOfCubes(); 
 * after adding all cubes to compute the explosion correctly
 * @param {*} game   cube matrix
 * @param {*} scene  the scene where this animation should be rendered
 */
function Explosion(game, scene){

    /**
     * exctract the visible cubes from the game 
     */
    this.getActiveCubes = function (game){

        for(let i = 0; i<game.cubeMatrix.length; i++){
            for(let j = 0; j<game.cubeMatrix[i].length; j++){
                for(let k = 0; k<game.cubeMatrix[i][j].length; k++){
                    if(game.cubeMatrix[i][j][k].visible){
                        this.cubes.push(game.cubeMatrix[i][j][k]);
                        scene.add(game.cubeMatrix[i][j][k]);
                    }
                }
            }
        }

    };

    /**
     * computes the starting speed vector for each cube 
     */
    this.setMovementInfoOfCubes = function () {
        for(let i = 0; i<this.cubes.length; i++){
            /* compute global positions and rotations */
            this.cubes[i].matrix = this.cubes[i].matrixWorld.clone();
            this.cubes[i].position.setFromMatrixPosition(this.cubes[i].matrix);
            this.cubes[i].rotation.setFromRotationMatrix(this.cubes[i].matrix);
            
            /* compute center to cube vector */
            let VIni = this.cubes[i].position.clone(); 
            VIni.normalize();
            
            /* pojects the vector onto the XZ plane */
            let PlainVec = VIni.clone();
            PlainVec.y = 0;
            PlainVec.normalize();
            let dot = VIni.dot(PlainVec);
            let angle = Math.acos(dot);

            /* decompose speed on the plane created by the speed vector and its projection */
            var VUp  = new THREE.Vector3();
            var VLat = new THREE.Vector3();
            VLat = Math.cos(angle);
            VUp  = (this.cubes[i].position.y>0?1.:-1.)*Math.cos(Math.PI/2-angle);
            var direction = PlainVec;
            /* info object: Lateral and Up velocites and direction of each cube */
            this.velocities.push( { VLat: VLat, VUp : VUp, direction:direction } );
        }
    }

    /**
     * updates the positions of each falling cube accordingly to bullets movement
     * @param delta the ammount of time to be simulated
     */
    this.doMovement = function(delta){
        for(let i = 0; i<this.cubes.length; i++){
            let cube = this.cubes[i];
            let info = this.velocities[i];
            
            /* uniform movement */
            let cosAngleX = info.direction.dot(new THREE.Vector3(1,0,0))
            let cosAngleZ = info.direction.dot(new THREE.Vector3(0,0,1))
            componentX = info.VLat*cosAngleX;
            componentZ = info.VLat*cosAngleZ;
            cube.position.x += componentX;
            cube.position.z += componentZ;

            /* accelerated movement */
            let vertSpace = 1/2*this.gravity.y*(delta)+info.VUp*(delta) 
            info.VUp = 1/2*this.gravity.y*(delta)+info.VUp;
            cube.position.y += vertSpace;
        }
    };

    /**
     * adds a list of cubes to be animated 
     * @param cubes list of cubes (could actually be any 3D object)
     */
    this.addCubes = function(cubes){
        for(let i=0; i<cubes.length; i++){
            this.cubes.push(cubes[i]);
        }
    };

    /**
     * remove every all the animated object from the given scene
     * @param scene 
     */
    this.dispose = function(scene){
        for (let i = 0; i<this.cubes.length; i++){
            scene.remove(this.cubes[i]);
        }
    }

    game.dispose(scene); 
    this.cubes = [];
    this.velocities = [];
    this.gravity = new THREE.Vector3(0,-9.8,0);
    this.getActiveCubes(game);
   
}