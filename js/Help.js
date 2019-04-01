// https://www.evermade.fi/pure-three-js-hud/
/*
* 
h open help
p open options
x toggle HUD
---
r restart game
e explode game
a enable auto update
enter single step
----
arrows rotate cube
. align game to camera

*/

var HelpObj = new THREE.Object3D();
var helpReady = false;


function Help() {
   if (!helpReady) {
      try {

         let baseHeight = window.innerHeight * 0.01;
         let baseWidth = window.innerWidth * 0.01

         var keys = ["H:", "X:", "", "R:", "E:", "A:", "Enter:", "", "Arrows:", "(.):","", "--- HELP ---"];
         var commands = ["show help", "toggle HUD", "", "reset game", "explode game", "auto update", "single step", "", "rotate game", "align camera","", ""];

         var verticalPos = -(keys.length-1)*baseHeight * 3/2;

         
         var maxlen = 0;

         for (let i = 0; i < keys.length; i++) {
            let str = prepareString((keys[i] + " " + commands[i]).toUpperCase());
            
            str.object.position.y += verticalPos;
            str.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
            verticalPos += baseHeight * 3;
            maxlen = Math.max(maxlen,str.length*TextScaleFactor);
            HelpObj.add(str.object);
         }

         rectX = maxlen + baseWidth*2;
         rectY = (2+keys.length) *baseHeight * 3
         /* prepare background rectangle for help message */
         var geometry = new THREE.PlaneGeometry( rectX, rectY, 0 );
         var material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: 0.7} );
         var HelpBG   = new THREE.Mesh(geometry, material);

         HelpObj.add(HelpBG);

         helpReady = true;
         HelpObj.visible = false;

      } catch(e){
         console.log(e)
      }
   }
};



