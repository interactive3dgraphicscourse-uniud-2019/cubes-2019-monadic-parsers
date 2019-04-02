/**
 * Class to represent an instance of GOL3D
 * @param {*} height dimension of game matrix
 * @param {*} width  dimension of game matrix
 * @param {*} depth  dimension of game matrix
 * @param {*} AAmin  minimum number of alive neighbours for a cell to stay alive
 * @param {*} AAmax  maximum number of alive neighbours for a cell to stay alive
 * @param {*} DAmin  minimum number of alive neighbours for a cell to become alive
 * @param {*} DAmax  maximum number of alive neighbours for a cell to become alive
 * 
 * methods to be considered public:
 * 
 * setOptions (AAmin, AAmax, DAmin, DAmax); -> sets conditions for life and death of the cells
 * dispose (scene);                         -> remove this object from the scene 
 * addToScene(scene);                       -> adds this object to the scene
 * update ();                               -> updates the game and cube matrices to the next step of the simulation
 * 
 * use pivot,up,facs fields for rotations
 * 
 */
function GOL3D(height, width, depth, AAmin, AAmax, DAmin, DAmax) {
    /* METHODS */

    /* CREATION and DELATION */
    this.setOptions =
        function (AAmin, AAmax, DAmin, DAmax) {
            this.AAmin = AAmin;
            this.AAmax = AAmax;
            this.DAmin = DAmin;
            this.DAmax = DAmax;
        };

    /**
    * remove all cubes from the scene
    * @param scene
    */
    this.dispose =
        function (scene) {
            for (i = 0; i < this.gameMatrix.length; i++) {
                for (j = 0; j < this.gameMatrix[i].length; j++) {
                    for (k = 0; k < this.gameMatrix[i][j].length; k++) {
                        scene.remove(this.cubeMatrix[i][j][k]);
                    }
                }
            }
            scene.remove(this.pivot);	  
            this.update = function(){ return };
        };

    /**
    * initialize the game 3D matrix
    * @param height (number of cells for the game matrix) 
    * @param width  (number of cells for the game matrix) 
    * @param depth  (number of cells for the game matrix) 
    * @returns
    */
    this.initializeMatrices =

        function () {

            /* create new cube Geometry and Material */
            cubeG = new THREE.BoxBufferGeometry(1,1,1);
            cubeM = new THREE.MeshBasicMaterial({ color: 0x00AA00, wireframe: true });

            /* initialize the game matrix randomly */
            /* the game matrix is directly associated to a cube matrix */
            this.gameMatrix = [];
            this.cubeMatrix = [];
            for (i = 0; i < this.width; i++) {
                this.gameMatrix.push([])
                this.cubeMatrix.push([])
                for (j = 0; j < this.height; j++) {
                    this.gameMatrix[i].push([]);
                    this.cubeMatrix[i].push([]);
                    for (k = 0; k < this.depth; k++) {
                        this.gameMatrix[i][j].push(Math.random() >= 1.-spawnProbability);
                        this.cubeMatrix[i][j].push(new THREE.Mesh(cubeG, cubeM));
                        /* the cubes are displaced so that the 3D structure is centered in (0,0,0) */
                        this.cubeMatrix[i][j][k].position.x += i - (this.width / 2);
                        this.cubeMatrix[i][j][k].position.y += j - (this.height / 2);
                        this.cubeMatrix[i][j][k].position.z -= k - (this.depth / 2) +0.5;
                        this.pivot.add(this.cubeMatrix[i][j][k]);    // add the newly created cube to the pivot
                        this.cubeMatrix[i][j][k].visible = this.gameMatrix[i][j][k];
                    }
                }
            }

            this.updateCubesColor();

        };

    /**
     * adds this object to a scene
     */
    this.addToScene = function (scene) { scene.add(this.pivot); };

    /* UPDATE METHODS */

    /**
    * updates the visible cubes accordingly to the game matrix
    */
    this.updateCubesVisibility =
        function () {
            for (i = 0; i < this.gameMatrix.length; i++) {
                for (j = 0; j < this.gameMatrix[i].length; j++) {
                    for (k = 0; k < this.gameMatrix[i][j].length; k++) {
                        this.cubeMatrix[i][j][k].visible = this.gameMatrix[i][j][k]
                    }
                }
            }
        };

    /**
    * updates the color of the cubes accordingly to the number of neighbours
    */
    this.updateCubesColor =
        function () {
            for (i = 0; i < this.gameMatrix.length; i++) {
                for (j = 0; j < this.gameMatrix[i].length; j++) {
                    for (k = 0; k < this.gameMatrix[i][j].length; k++) {
                        if (this.cubeMatrix[i][j][k].visible) {
                            around = this.countAlive(i, j, k);
                            if (around >= this.AAmin && around <= this.AAmax) {
                                this.cubeMatrix[i][j][k].material = this.lifeMaterials[0];
                            } else if (around < this.AAmin) {
                                this.cubeMatrix[i][j][k].material = this.underMinMaterials[around];
                            } else if (around > this.AAmax) {
                                this.cubeMatrix[i][j][k].material = this.overMaxMaterials[around - this.AAmax - 1];
                            } else {
                                console.log("the number of alive cells around " + i + "," + j + "," + k + "is ill formed");
                            }
                        }
                    }
                }
            }
        };


    /*
    * sets the arrays lifeMaterials, underMinMaterials, overMaxMaterials with the correct materials according to AAmax, AAmin
    */
    this.setMaterials =
        function () {
            //set material for cells with right amount of neighbours 
            lifeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, transparent: true, opacity: this.opacity });
            lifeMat.color.setHSL(THREE.Math.mapLinear(this.colorLife, 0, 360, 0, 1), this.colorSaturation, this.colorLuminosity);
            this.lifeMaterials.push(lifeMat);

            //set materials for cells with not enough neighbours
            //assuming colorNoNeigh > colorBarelyNoNeigh
            let hueIncrement = 0;
            if ((this.AAmin - 1) > 0) {
                hueIncrement = (this.colorNoNeigh - this.colorBarelyNoNeigh) / (this.AAmin - 1);
            }
            for (let i = 0; i < this.AAmin; i++) {
                let mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, transparent: true, opacity: this.opacity });
                let hue = this.colorNoNeigh - hueIncrement * i;
                mat.color.setHSL(THREE.Math.mapLinear(hue, 0, 360, 0, 1), this.colorSaturation, this.colorLuminosity);
                this.underMinMaterials.push(mat);
            }

            //set materials for cells with too many neighbours
            //assuming colorBarelyTooNeigh > colorAllNeigh
            hueIncrement = 0;
            if ((26 - (this.AAmax - (-1) )) > 0) {
                hueIncrement = (this.colorBarelyTooNeigh - this.colorAllNeigh) / (26 - (this.AAmax - (-1) ));
            }
            for (let i = this.AAmax - (-1); i <= 26; i++) { //javascript sucks
                let mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, transparent: true, opacity: this.opacity });
                let hue = this.colorBarelyTooNeigh - hueIncrement * (i - (this.AAmax - (-1) ));
                mat.color.setHSL(THREE.Math.mapLinear(hue, 0, 360, 0, 1), this.colorSaturation, this.colorLuminosity);
                this.overMaxMaterials.push(mat);
            }
        };

    /**
    * counts how many cells are alive in the neighbourhood of cell (i,j,k)
    * @param i
    * @param j
    * @param k
    * @returns the number of alive cells surrounding (i,j,k)
    */
    this.countAlive =
        function (i, j, k) {
            var count = 0;
            for (ii = i - 1; ii <= i + 1; ii++) {
                if (ii >= 0 && ii < this.gameMatrix.length) {
                    for (jj = j - 1; jj <= j + 1; jj++) {
                        if (jj >= 0 && jj < this.gameMatrix[i].length) {

                            for (kk = k - 1; kk <= k + 1; kk++) {
                                if (kk >= 0 && kk < this.gameMatrix[i][j].length) {
                                    if (this.gameMatrix[ii][jj][kk] && (i != ii || j != jj || kk != k)) {
                                        count += 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return count;
        };

    /**
    * computes the next state of the simulation
    */
    this.update =
        function () {

            /* initialize new game matrix */
            newGameMatrix = [];
            for (i = 0; i < this.gameMatrix.length; i++) {
                newGameMatrix.push([]);
                for (j = 0; j < this.gameMatrix[i].length; j++) {
                    newGameMatrix[i].push([]);
                    for (k = 0; k < this.gameMatrix[i][j].length; k++) {
                        newGameMatrix[i][j].push(false);
                    }
                }
            }

            /* compute the next simulation step applying alive-dead transitions */
            for (i = 0; i < this.gameMatrix.length; i++) {
                for (j = 0; j < this.gameMatrix[i].length; j++) {
                    for (k = 0; k < this.gameMatrix[i][j].length; k++) {
                        living_neighbour = this.countAlive(i, j, k);
                        /* if alive */
                        if (this.gameMatrix[i][j][k]) {
                            if (living_neighbour >= this.AAmin && living_neighbour <= this.AAmax) {
                                newGameMatrix[i][j][k] = true;
                            }
                            /* if dead */
                        } else {
                            if (living_neighbour >= this.DAmin && living_neighbour <= this.DAmax) {
                                newGameMatrix[i][j][k] = true;
                            }
                        }
                    }
                }
            }

            this.gameMatrix = newGameMatrix;
            this.updateCubesVisibility();
            this.updateCubesColor();
        };


    /**
     * rotate this game object on a given axis of a given angle
     * @param axsis
     * @param angle
     */
    this.rotateAxis =
        function (axis, angle) {
            m = new THREE.Matrix4();
            m.makeRotationAxis(axis.normalize(), angle);
            this.pivot.matrix.multiply(m);
            this.pivot.rotation.setFromRotationMatrix(this.pivot.matrix);
        };

    /**
     * sets this game object rotations
     * @target a Vector3D containing the wanted rotation values
     */
    this.setRotation =
        function (target) {
            this.pivot.rotation.set(target.x, target.y, target.z);
        };

    /* FIELDS */

    /* center pivot in 0,0,0 */
    this.pivot = new THREE.Object3D();

    /* X,Y,Z local axses */
    this.Y = new THREE.Object3D();
    this.Y.position.y += 1;
    this.X = new THREE.Object3D();
    this.X.position.x += 1;
    this.Z = new THREE.Object3D();
    this.Z.position.z += 1;
    this.pivot.add(this.Y);
    this.pivot.add(this.X);
    this.pivot.add(this.Z);

    /* life death options */
    this.AAmin = AAmin;
    this.AAmax = AAmax;
    this.DAmin = DAmin;
    this.DAmax = DAmax;

    /* arrays for the materials */
    this.underMinMaterials = [];
    this.overMaxMaterials = [];
    this.lifeMaterials = [];

    /* material color (HSL) properties*/
    this.opacity = 0.8;
    this.colorLife = 110;          // green
    this.colorNoNeigh = 220;       // blue
    this.colorBarelyNoNeigh = 180; // sky blue
    this.colorAllNeigh = 0;        // red
    this.colorBarelyTooNeigh = 60; // yellow
    this.colorSaturation = 0.60;
    this.colorLuminosity = 0.50;

    this.setMaterials();

    /* size of the game matrix */
    this.height = height;
    this.width = width;
    this.depth = depth;

    /* game matrix ad cube matrix */
    this.gameMatrix;
    this.cubeMatrix;
    this.initializeMatrices();

    /*shortcut for rotation*/
    this.rotation = this.pivot.rotation;

};