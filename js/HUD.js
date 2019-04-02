/**
 * updates the fps counter (to be used in the rendering loop)
 */
function UpdateFPS() {
   if (OK_hud) { // HUD must be loaded
      /* prepare text */
      let FPS = prepareString("FPS: " + frameCount);
      /* positioning */
      applyTransformationToChars(FPS, function(x) { x.rotation.x += Math.PI/8; x.rotation.y += Math.PI/8 });
      FPS.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
      let baseHeight = window.innerHeight * 0.01;
      let baseWidth = window.innerWidth * 0.01
      offFPS = (TextScaleFactor*FPS.length / 2);
      FPS.object.position.x += -baseWidth * 48 + offFPS;
      FPS.object.position.y += baseHeight * (47-lineOffset);
      /* update HUD object (FPS counter is in position 2)*/   
      HUD_obj.remove(HUD_content[2].object);
      HUD_content[2] = FPS;
      HUD_obj.add(HUD_content[2].object);
   }
}

/**
 * prepares or updates the HUD (to be used in the rendering loop)
 */
function VoxelHUD() {
   if (!OK_hud) { // HUD must not be loaded (change this flag for updates)
      try {

         /* reset HUD objects */
         HUD_obj.children = [];
         HUD_content = [];
         /* for ortographic camera */
         HUD_obj.position.z = 10;

         /* use window variables to make interface adaptive to real space */
         let baseHeight = window.innerHeight * 0.01;
         let baseWidth = window.innerWidth * 0.01

         /* prepare HUD objects texts */
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
         let Name = prepareString("GAME OF LIFE 3D!");
         applyTransformationToChars(Name, function(x) { x.rotation.x += Math.PI/8; x.rotation.y += Math.PI/8 });


         /* scaling */
         offOpt = TextScaleFactor*(OptP.length / 2);
         //if((baseWidth * 45 + offOpt) > window.innerWidth/2){
         //   TextScaleFactor = 1.5;
         //}
         OptP.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
         HelpH.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
         dims.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
         options.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
         FPS.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);
         Name.object.scale.set(TextScaleFactor,TextScaleFactor,TextScaleFactor);

         /* positioning */
         offOpt = TextScaleFactor*(OptP.length / 2);
         OptP.object.position.x += baseWidth * 45 - offOpt;
         OptP.object.position.y += baseHeight * 47;

         offHelp = TextScaleFactor*HelpH.length / 2;
         HelpH.object.position.x += baseWidth * 45 - offHelp;
         HelpH.object.position.y += baseHeight * (47-lineOffset);

         dims.object.position.x += 0;
         dims.object.position.y += baseHeight * 47;
         options.object.position.x += 0;
         options.object.position.y += baseHeight * (47-lineOffset);

         offName = (TextScaleFactor*Name.length/2 );
         Name.object.position.x += -baseWidth * 48 + offName;
         Name.object.position.y += baseHeight * 47;

         offFPS = (TextScaleFactor*FPS.length/2 );
         FPS.object.position.x += -baseWidth * 48 + offFPS;
         FPS.object.position.y += baseHeight * (47-lineOffset);

         /* add to HUD objects */
         //HUD_content.push(OptP);
         //HUD_content.push(HelpH);
         HUD_content.push(dims);
         HUD_content.push(options);
         HUD_content.push(FPS);
         HUD_content.push(Name);

         for (let i = 0; i < HUD_content.length; i++) {
            HUD_obj.add(HUD_content[i].object);
         }
         OK_hud = true; // set flag to signal the success of async loading
      } catch (e){
         // ignore errors due to resource loading 
      }
   }

}


