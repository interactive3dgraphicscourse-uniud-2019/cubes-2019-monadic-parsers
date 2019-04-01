function preparePageSettings (scene){

    let h=window.innerHeight;
    let w=window.innerWidth;

    let subTitle = prepareString("DIMENSIONS OPTIONS");
    subTitle.object.scale.set(h/120,h/120,h/120);
    subTitle.object.position.y =  h/2 - (7*h/120);
    currentPosY = subTitle.object.position.y - (7*h/30);
    /*sector = prepareString("DIMENSIONS");
    sector.object.scale.set(h/120,h/120,h/120);
    sector.object.position.y += currentPosY - (7*h/70);
    currentPosY = sector.object.position.y - (7*h/50);*/
    //applyTransformationToChars(testWord, function(x){ x..y += Math.PI/2; });

    let optX = prepareString("WIDTH");
    optX.object.scale.set(h/130,h/130,h/130);
    optX.object.position.y += currentPosY;
    optX.object.position.x = - w/3; 
    let optY = prepareString("HEIGHT");
    optY.object.scale.set(h/130,h/130,h/130);
    optY.object.position.y = currentPosY;
    optY.object.position.x = 0; 
    let optZ = prepareString("DEPTH");
    optZ.object.scale.set(h/130,h/130,h/130);
    optZ.object.position.y += currentPosY;
    optZ.object.position.x =  w/3; 

    currentPosY -= (7*h/70);
    let upX = getArrow("Up");
    upX.scale.set(h/130,h/130,h/130);
    upX.position.y = 7*h/70;
    upX.position.x = - w/3; 
    let upY = getArrow("Up");
    upY.scale.set(h/130,h/130,h/130);
    upY.position.y = 7*h/70;
    upY.position.x = 0; 
    let upZ = getArrow("Up");
    upZ.scale.set(h/130,h/130,h/130);
    upZ.position.y = 7*h/70;;
    upZ.position.x = w/3; 
    currentPosY -= (7*h/70);

    let otto = prepareString("38");
    otto.object.scale.set(h/50,h/50,h/50);
    otto.object.position.y = 0;
    otto.object.position.x = 0;
    scene.add(otto.object);

    //INSERIMENTO OPZIONI X Y Z
    
    currentPosY -= (7*h/70);

    let downX = getArrow("Down");
    downX.scale.set(h/130,h/130,h/130);
    downX.position.y = - 7*h/70;;
    downX.position.x = - w/3; 
    let downY = getArrow("Down");
    downY.scale.set(h/130,h/130,h/130);
    downY.position.y = -7*h/70;;
    downY.position.x = 0; 
    let downZ = getArrow("Down");
    downZ.scale.set(h/130,h/130,h/130);
    downZ.position.y = -7*h/70;;
    downZ.position.x = w/3;
    /*
    currentPosY -= (7*h/50);

    autoUp = prepareString("AUTO UPDATE DELAY");
    autoUp.object.scale.set(h/130,h/130,h/130);
    autoUp.object.position.y += currentPosY;
    autoUp.object.position.x = 0; 

    currentPosY -= (7*h/70);
    upAuto = getArrow("Up");
    upAuto.scale.set(h/130,h/130,h/130);
    upAuto.position.y += currentPosY;
    upAuto.position.x = 0;
    currentPosY -= (7*h/100);
    //PRENDI VALORE

    currentPosY -= (7*h/100);
    downAuto = getArrow("Down");
    downAuto.scale.set(h/130,h/130,h/130);
    downAuto.position.y += currentPosY;
    downAuto.position.x = 0;  
    */
    let nextPage = getArrow("Right");
    nextPage.scale.set(h/50,h/50,h/50);
    nextPage.position.y = 0;
    nextPage.position.x = w/2 - (4*h/50); 
    let prevPage = getArrow("Left");
    prevPage.scale.set(h/50,h/50,h/50);
    prevPage.position.y = 0;
    prevPage.position.x = - w/2 + (4*h/50); 

    let confirm = prepareString("PRESS P TO CONFIRM");
    confirm.object.scale.set(h/120,h/120,h/120);
    confirm.object.position.y =  - h/2 + (7*h/120);


    scene.add(nextPage);
    scene.add(prevPage);
    scene.add(confirm.object);
    //scene.add(upAuto);
    //scene.add(downAuto);
    scene.add(upX);
    scene.add(upY);
    scene.add(upZ);
    scene.add(downX);
    scene.add(downY);
    scene.add(downZ);
    scene.add(subTitle.object);
    scene.add(optX.object);
    scene.add(optY.object);
    scene.add(optZ.object);
    //scene.add(autoUp.object);
    

}

function preparePageAuto(scene){

    

    let h=window.innerHeight;
    let w=window.innerWidth;

    let subTitle = prepareString("AUTORUN OPTIONS");
    console.log(subTitle);
    subTitle.object.scale.set(h/120,h/120,h/120);
    subTitle.object.position.y =  h/2 - (7*h/120);
    let currentPosY = subTitle.object.position.y - (7*h/30);

    let autoUpd = prepareString("AUTO UPDATE DELAY");
    autoUpd.object.scale.set(h/130,h/130,h/130);
    autoUpd.object.position.y = currentPosY;
    autoUpd.object.position.x = 0; 

    currentPosY -= (7*h/70);
    let upAuto = getArrow("Up");
    upAuto.scale.set(h/130,h/130,h/130);
    upAuto.position.y += currentPosY;
    upAuto.position.x = 0;
    currentPosY -= (7*h/70);

    let otto = prepareString("9038");
    otto.object.scale.set(h/50,h/50,h/50);
    otto.object.position.y = 0;
    otto.object.position.x = 0;
    scene.add(otto.object);
    //PRENDI VALORE

    currentPosY -= (7*h/70);
    let downAuto = getArrow("Down");
    downAuto.scale.set(h/130,h/130,h/130);
    downAuto.position.y += currentPosY;
    downAuto.position.x = 0;  
    
    let nextPage = getArrow("Right");
    nextPage.scale.set(h/50,h/50,h/50);
    nextPage.position.y = 0;
    nextPage.position.x = w/2 - (4*h/50); 
    let prevPage = getArrow("Left");
    prevPage.scale.set(h/50,h/50,h/50);
    prevPage.position.y = 0;
    prevPage.position.x = - w/2 + (4*h/50); 

    let confirm = prepareString("PRESS P TO CONFIRM");
    confirm.object.scale.set(h/120,h/120,h/120);
    confirm.object.position.y =  - h/2 + (7*h/120);


    scene.add(nextPage);
    scene.add(prevPage);
    scene.add(confirm.object);
    scene.add(upAuto);
    scene.add(downAuto);
    scene.add(subTitle.object);
    scene.add(autoUpd.object);
    
}

function preparePageLifeAndDeath(scene){

    console.log(fontsMatrices[0])

    let h=window.innerHeight;
    let w=window.innerWidth;

    let subTitleStay = prepareString("STAY ALIVE");
    subTitleStay.object.scale.set(h/120,h/120,h/120);
    subTitleStay.object.position.y =  h/2 - (7*h/120);
    subTitleStay.object.position.x = - w/4;
    let subTitleBecome = prepareString("BECOME ALIVE");
    subTitleBecome.object.scale.set(h/120,h/120,h/120);
    subTitleBecome.object.position.y =  h/2 - (7*h/120);
    subTitleBecome.object.position.x = w/4;
    let currentPosY = subTitleStay.object.position.y - (7*h/30);

    let minS = prepareString("MIN");
    minS.object.scale.set(h/130,h/130,h/130);
    minS.object.position.y = currentPosY;
    minS.object.position.x = - w/3; 
    let maxS = prepareString("MAX");
    maxS.object.scale.set(h/130,h/130,h/130);
    maxS.object.position.y = currentPosY;
    maxS.object.position.x = - w/8; 

    currentPosY -= (7*h/70);
    let upMinS = getArrow("Up");
    upMinS.scale.set(h/130,h/130,h/130);
    upMinS.position.y = 7*h/70;
    upMinS.position.x = - w/3; 
    let upMaxS = getArrow("Up");
    upMaxS.scale.set(h/130,h/130,h/130);
    upMaxS.position.y = 7*h/70;
    upMaxS.position.x = - w/8; 


    //INSERIMENTO OPZIONI X Y Z
    let otto = prepareString("76");
    otto.object.scale.set(h/50,h/50,h/50);
    otto.object.position.y = 0;
    otto.object.position.x = w/8;
    scene.add(otto.object);

    let downMinS = getArrow("Down");
    downMinS.scale.set(h/130,h/130,h/130);
    downMinS.position.y = - 7*h/70;;
    downMinS.position.x = - w/3; 
    let downMaxS = getArrow("Down");
    downMaxS.scale.set(h/130,h/130,h/130);
    downMaxS.position.y = -7*h/70;;
    downMaxS.position.x = - w/8; 

    currentPosY = subTitleStay.object.position.y - (7*h/30);

    let minB = prepareString("MIN");
    minB.object.scale.set(h/130,h/130,h/130);
    minB.object.position.y = currentPosY;
    minB.object.position.x = w/8; 
    let maxB = prepareString("MAX");
    maxB.object.scale.set(h/130,h/130,h/130);
    maxB.object.position.y = currentPosY;
    maxB.object.position.x = w/3; 

    currentPosY -= (7*h/70);
    let upMinB = getArrow("Up");
    upMinB.scale.set(h/130,h/130,h/130);
    upMinB.position.y = 7*h/70;
    upMinB.position.x = w/8; 
    let upMaxB = getArrow("Up");
    upMaxB.scale.set(h/130,h/130,h/130);
    upMaxB.position.y = 7*h/70;
    upMaxB.position.x = w/3; 


    //INSERIMENTO OPZIONI X Y Z
    
    currentPosY -= (7*h/70);

    let downMinB = getArrow("Down");
    downMinB.scale.set(h/130,h/130,h/130);
    downMinB.position.y = - 7*h/70;
    downMinB.position.x = w/8; 
    let downMaxB = getArrow("Down");
    downMaxB.scale.set(h/130,h/130,h/130);
    downMaxB.position.y = -7*h/70;
    downMaxB.position.x = w/3; 

    let nextPage = getArrow("Right");
    nextPage.scale.set(h/50,h/50,h/50);
    nextPage.position.y = 0;
    nextPage.position.x = w/2 - (4*h/50); 
    let prevPage = getArrow("Left");
    prevPage.scale.set(h/50,h/50,h/50);
    prevPage.position.y = 0;
    prevPage.position.x = - w/2 + (4*h/50); 

    let confirm = prepareString("PRESS P TO CONFIRM");
    confirm.object.scale.set(h/120,h/120,h/120);
    confirm.object.position.y =  - h/2 + (7*h/120);


    scene.add(nextPage);
    scene.add(prevPage);
    scene.add(downMaxB);
    scene.add(downMinB);
    scene.add(downMinS);
    scene.add(downMaxS);
    scene.add(minB.object);
    scene.add(minS.object);
    scene.add(maxB.object);
    scene.add(maxS.object);
    scene.add(upMaxB);
    scene.add(upMaxS);
    scene.add(upMinB);
    scene.add(upMinS);

    scene.add(confirm.object);
    scene.add(subTitleStay.object);
    scene.add(subTitleBecome.object);
}