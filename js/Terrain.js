/**
 * Class used to represent the terrain underlying the cube matrix
 * @param {*} filepath path to heightmap image in png format
 */
function Terrain(filepath) {


   /**
    * creates the terrain of a fixed dimension using the data array information containing the heightmap values
    */
   initializeTerrain =
      function () {
         let cubeG = new THREE.BoxGeometry(scalingFactor, scalingFactor, scalingFactor);
         let cubeM = new THREE.MeshBasicMaterial({ color: cubeColor, wireframe: false, transparent: true, opacity: cubeOpacity });

         for (let i = 0; i < imgsize; i++) {
            for (let j = 0; j < imgsize; j++) {
               /* read height */
               let value = data[i * imgsize + j];
               let scaledValue = THREE.Math.mapLinear(value, 0, 255, 1, 30.0/scalingFactor);
               /* prepare voxel */
               let cube = new THREE.Mesh(cubeG, cubeM);
               cube.position.set(
                  i * scalingFactor - imgsize/2 * scalingFactor, 
                  -imgsize/2 * scalingFactor + scaledValue * scalingFactor - imgsize / 2, 
                  j * scalingFactor - imgsize/2*scalingFactor
               );
               /* add to terrain objects */
               currentTerrainCubes.push(cube);
               terrainObject.add(cube);
            }
         }
         
      };

   /**
    * populates the fields data with the colors of the png image
    */
   function getHeightData() {

      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      imgsize = img.width;
      var context = canvas.getContext('2d');

      var size = img.width * img.height;
      data = new Float32Array(size);

      context.drawImage(img, 0, 0);

      for (var i = 0; i < size; i++) {
         data[i] = 0
      }

      var imgd = context.getImageData(0, 0, img.width, img.height);
      var pix = imgd.data;

      var j = 0;
      for (var i = 0; i < pix.length; i += 4) {
         var all = pix[i] + pix[i + 1] + pix[i + 2];  // all is in range 0 - 255*3
         data[j] = all / 3;
         j++;
      }

   }

   this.addToScene = function (scene) { scene.add(terrainObject); };
   this.removeFromScene = function (scene) { scene.remove(terrainObject); };

   let terrainObject = new THREE.Object3D();
   terrainObject.position.set(1.5,-3,2);
   let scalingFactor = 4; //use 4 for heightmap 15x15 and 2 for heightmap 30x30
   let cubeOpacity = 0.2;
   let cubeColor = 0xCCF1F4;
   let imgsize;
   let img = new Image();
   let data = [];
   /* async loading of png heightmap */
   img.onload = function () {
      getHeightData();
      initializeTerrain();
   }
   img.src = filepath;

}
