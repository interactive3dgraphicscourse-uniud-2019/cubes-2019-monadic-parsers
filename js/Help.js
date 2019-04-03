/**
 * async load of help message box
 * uses global variable helpReady to know if it is necessary to reload it
 * (to be used in the rendering loop)
 */
function Help() {
   if (!helpReady) { // help must not be loaded (change this flag for updates)
      try {

         HelpObj.children = [];
         HelpObj.position.z = 20; // necessary for ortographic camera

         /* use window variables to make interface adaptive to real space */
         let baseHeight = window.innerHeight * 0.01;
         let baseWidth = window.innerWidth * 0.01

         /* help messages (reverse order)*/
         var keys = ["H:", "X:", "", "R:", "E:", "A:", "N:", "", "P:", "Arrows:", "(.):","", "--- HELP ---"];
         var commands = ["show help", "toggle HUD", "", "reset game", "explode game", "auto update", "single step", "", "change camera", "rotate game", "align camera","", ""];

         /* center message vertically */
         var verticalPos = -(keys.length-1)*baseHeight * lineOffset/2;
         var maxlen = 0;

         /* prepare and position text messages */
         for (let i = 0; i < keys.length; i++) {
            let str = prepareString((keys[i] + " " + commands[i]).toUpperCase());
            str.object.position.y += verticalPos;
            str.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
            verticalPos += baseHeight * lineOffset;

            maxlen = Math.max(maxlen,str.length*TextScaleFactor);
            HelpObj.add(str.object);
         }

         /* add semi-transparent black background plane */
         rectX = maxlen + baseWidth*2;
         rectY = (2+keys.length) * baseHeight * lineOffset ;
         
         var geometry = new THREE.PlaneGeometry( rectX, rectY, 0 );
         var material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 0.7} );
         var HelpBG   = new THREE.Mesh(geometry, material);
         
         /* add bg to object */
         HelpObj.add(HelpBG);

         /* set flags for async load */
         helpReady = true;

      } catch(e){
         // avoid problems if resources are not ready
      }
   }
};



