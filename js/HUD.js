var globalFont;
var HUD_obj = new THREE.Object3D();
var HUD_content = [];
var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
let TextScaleFactor = 1.5;

function UpdateFPS() {
   if (OK_hud) {
      let FPS = prepareString("FPS: " + frameCount);
      applyTransformationToChars(FPS, function(x) { x.rotation.x += Math.PI/8; x.rotation.y += Math.PI/8 });
      FPS.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
      let baseHeight = window.innerHeight * 0.01;
      let baseWidth = window.innerWidth * 0.01
      offFPS = (TextScaleFactor*FPS.length / 2);
      FPS.object.position.x += -baseWidth * 48 + offFPS;
      FPS.object.position.y += baseHeight * 45.5;
      HUD_obj.remove(HUD_content[5]);
      HUD_content[5] = FPS.object;
      HUD_obj.add(HUD_content[5]);
   }
}

function VoxelHUD() {
   if (!OK_hud) {
      try {
         let baseHeight = window.innerHeight * 0.01;
         let baseWidth = window.innerWidth * 0.01

         let OptP = prepareString("Press P for options".toUpperCase());
         applyTransformationToChars(OptP, function(x) { x.rotation.x += Math.PI/8; x.rotation.y += Math.PI/8 });
         let HelpH = prepareString("Press H for Help".toUpperCase());
         applyTransformationToChars(HelpH, function(x) { x.rotation.x += Math.PI/8; x.rotation.y += Math.PI/8 });
         let dims = prepareString("height: ".toUpperCase() + height + " width: ".toUpperCase() + width + " depth: ".toUpperCase() + depth);
         applyTransformationToChars(dims, function(x) { x.rotation.x += Math.PI/8; x.rotation.y += Math.PI/8 });
         let options = prepareString("Stay alive: (".toUpperCase() + AAmin + "-" + AAmax + ")  Become alive: (".toUpperCase() + DAmin + "-" + DAmax + ")");
         applyTransformationToChars(options, function(x) { x.rotation.x += Math.PI/8; x.rotation.y += Math.PI/8 });
         let FPS = prepareString("FPS: " + frameCount);
         applyTransformationToChars(FPS, function(x) { x.rotation.x += Math.PI/8; x.rotation.y += Math.PI/8 });

         offOpt = TextScaleFactor*(OptP.length / 2);
         if((baseWidth * 45 + offOpt) > window.innerWidth/2){
            TextScaleFactor = 1.;
         }

         OptP.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
         HelpH.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
         dims.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
         options.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
         FPS.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);

         offOpt = TextScaleFactor*(OptP.length / 2);
         OptP.object.position.x += baseWidth * 45 - offOpt;
         OptP.object.position.y += baseHeight * 47;
         offHelp = TextScaleFactor*HelpH.length / 2;
         HelpH.object.position.x += baseWidth * 45 - offHelp;
         HelpH.object.position.y += baseHeight * 44;

         dims.object.position.x += 0;
         dims.object.position.y += baseHeight * 47;
         options.object.position.x += 0;
         options.object.position.y += baseHeight * 44;

         offFPS = (TextScaleFactor*FPS.length / 2);
         FPS.object.position.x += -baseWidth * 48 + offFPS;
         FPS.object.position.y += baseHeight * 45.5;

         HUD_content.push(OptP);
         HUD_content.push(HelpH);
         HUD_content.push(dims);
         HUD_content.push(OptP);
         HUD_content.push(options);
         //HUD_content.push(FPS); //5
         for (let i = 0; i < HUD_content.length; i++) {
            HUD_obj.add(HUD_content[i].object);
         }
         OK_hud = true;
      } catch{

      }
   }

}








// https://www.evermade.fi/pure-three-js-hud/

/*
function HUD() {
   let scalefactor = 1;
   var hudCanvas = document.createElement('canvas');
   hudCanvas.width = window.innerWidth*scalefactor;
   hudCanvas.height = window.innerHeight*scalefactor;
   hudCanvas.getContext('2d').scale(scalefactor,scalefactor);
   var hudBitmap = hudCanvas.getContext('2d');

   let fontsize = window.innerHeight * 0.025;
   hudBitmap.font = "Bold "+ fontsize + "px Arial";
   hudBitmap.textAlign = 'right';
   hudBitmap.fillStyle = "rgba(245,245,245,1)";
   let verticalPos = 0.05;
   hudBitmap.fillText("Press P for options", window.innerWidth*0.97, window.innerHeight*verticalPos);
   verticalPos += 0.03;
   hudBitmap.fillText("Press H for help", window.innerWidth*0.97, window.innerHeight*verticalPos);

   verticalPos = 0.05;
   hudBitmap.textAlign = 'center';
   hudBitmap.fillText("height: " + height + ", width: " + width + ", depth: " + depth, window.innerWidth*0.5, window.innerHeight*verticalPos);
   verticalPos += 0.03;
   hudBitmap.fillText("Stay alive: [" + AAmin + ".." + AAmax + "]  Become alive: [" + DAmin + ".." + DAmax + "]", window.innerWidth*0.5, window.innerHeight*verticalPos);

   verticalPos = 0.05;
   hudBitmap.textAlign = 'left';
   hudBitmap.fillText("FPS: " + frameCount, window.innerWidth*0.03, window.innerHeight*verticalPos);


   var hudTexture = new THREE.Texture(hudCanvas)
   hudTexture.needsUpdate = true;
   var material = new THREE.MeshBasicMaterial({ map: hudTexture, side: THREE.DoubleSide });
   material.transparent = true;

   var planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
   var plane = new THREE.Mesh(planeGeometry, material);
   return plane;
};
*/

