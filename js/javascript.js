var scene, camera, controls, renderer, object, raycaster; //declaring global variables

var audio = new Audio('aliveandkicking.mp3');



function init() { //initialize function
    loaded = 0;
    itemsToLoad = 1;

    //add detector to see if WebGL is supported
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    //set up a scene
    scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(0xf5f8ca, 0.001);
    //add fog to scene

    window.addEventListener('resize', onWindowResize, false); //when the user resizes browser, run function "onWindowResize" - currently set to false until otherwise

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight; //calculates the windows resize
        camera.updateProjectionMatrix(); //updates the camera render

        renderer.setSize(window.innerWidth, window.innerHeight); // the resize

    }
    // camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
    camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000);
    // render the scene - start renderer and set it's size

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setClearColor(0xcaf8f1, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    //sets shaders and lamberts to adjusted gamma correction — sRGB
    document.getElementById("mainInterface").style.visibility = 'hidden';
    document.getElementById("mainContent").style.visibility = 'hidden';
    document.getElementById("mainContentTop").style.visibility = 'hidden';
    document.getElementById("causes").style.visibility = 'hidden';
    document.getElementById("effects").style.visibility = 'hidden';
    document.getElementById("solutions").style.visibility = 'hidden';
    document.getElementById("panel").style.visibility = 'hidden';
    document.getElementById("effectsButton").style.visibility = 'hidden';
    document.getElementById("solutionButton").style.visibility = 'hidden';
    document.getElementById("whatIf").style.visibility = 'hidden';
    document.getElementById("whatIf2").style.visibility = 'hidden';
    document.getElementById("toTheFuture").style.visibility = 'hidden';


    renderer.setSize(window.innerWidth, window.innerHeight);
    //add to webpage
    document.body.appendChild(renderer.domElement);

    var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4);
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);




    //======================
    //==== LOAD MODEL ======
    //======================


    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('testNoLight.dae', function (collada) {
        var dae = collada.scene;
//        dae.traverse(function (child) {
//                    if (child instanceof THREE.Mesh) {
//                        child.castShadow = true;
//                        child.receiveShadow = true;
//                        console.log(child);
//                    }
//                });
        
        dae.scale.x = dae.scale.y = dae.scale.z = 1; //scale model from import size


        dae.position.x = 0; //position model in scene
        dae.position.z = 0;
        dae.rotation.y = 0;
        dae.updateMatrix(); // update model
        scene.add(dae); // add model to scene
        loadSymbol();
        console.log(dae);
        
        
        
        var orangeCar = dae.children[0].children[8];
        var ocean = dae.children[0].children[0];
        var iceberg = dae.children[0].children[256];
        var cargoShip = dae.children[12]
        ocean.position.y = -13;

        
        
            var icePos = new TWEEN.Tween(iceberg.position).to({
            y: -25
        }, 50000);
        
            icePos.start();

        
//            var cargPos = new TWEEN.Tween(cargoShip.position).to({
//            z: 20,
//            x: -40
//        }, 18000);
//        
//            cargPos.start();
            
          var farm = scene.getObjectByName('farmland', true); 
            console.log(farm);

        //moving objects
        var pos1 = new TWEEN.Tween(orangeCar.position).to({
            z: -90,
            x: -104.6
        }, 16000);
        //                .

        pos1.start(); //initiates camera tween for position
        
        
    });

    
     
    camera.position.set(150, 105, -10);
    camera.lookAt(new THREE.Vector3(5, 0, 5));
    camera.updateProjectionMatrix(); //updates the cameras postion



    //======================
    //== RENDER FUNCTION ===
    //======================




}

function render() { //begin render funtion
    //call to render scene 60fps
    requestAnimationFrame(render);

    TWEEN.update(); //constantly calls tween to render the motion at 60fps

    //keep displaying scene
    renderer.render(scene, camera);
}






function interface() {

    var dismiss = document.getElementById("listofThings");

    dismiss.style.opacity = 0;
    dismiss.style.transition = "opacity 1.5s";
    window.setTimeout(hideDismiss, 1500);



    function hideDismiss() {
        document.getElementById("mainContent").style.visibility = 'visible';

    }


}






function preload() {

    var preloader = document.getElementById("preloader");
    preloader.style.opacity = 0;
    preloader.style.transition = "opacity 1.5s";

    window.setTimeout(hidePreloader, 1500);
    window.setTimeout(interfaceActivate, 1700);

    audio.play();
    render();


}







function loadSymbol() {
    loaded++;
    if (loaded == itemsToLoad) {
        var loading = document.getElementById("loading");
        var begin = document.getElementById("begin");

        begin.style.opacity = 1;
        begin.style.transition = "opacity 1.5s";

        loading.style.opacity = 0;
        loading.style.transition = "opacity 0.4s";
    }
}

function hidePreloader() {
    var hideMe = document.getElementById("preloader");
    hideMe.style.visibility = 'hidden';
}

function interfaceActivate() {
    var interHide = document.getElementById("mainInterface");
    interHide.style.visibility = 'visible';

    var interface = document.getElementById("mainInterface");

    interface.style.opacity = 1;
    interface.style.transition = "opacity 1.5s";
}



function dismiss() {

    var dismiss = document.getElementById("listofThings");

    dismiss.style.opacity = 0;
    dismiss.style.transition = "opacity 1.5s";
    window.setTimeout(hideDismiss, 1500);



    function hideDismiss() {
        document.getElementById("listofThings").style.visibility = 'hidden';

        var inter = document.getElementById("mainContent");
        inter.style.visibility = 'visible';
        inter.style.opacity = 1;
        inter.style.transition = "opacity 0.5s";

        var inter2 = document.getElementById("mainContentTop");
        inter2.style.visibility = 'visible';
        inter2.style.opacity = 1;
        inter2.style.transition = "opacity 0.5s";

    }

}


function showPanel() {
    var panel = document.getElementById("panel");

    window.setTimeout(fadePanel, 2000)

    function fadePanel() {
        panel.style.visibility = 'visible';
        panel.style.opacity = 1;
        panel.style.transition = "opacity 1.5s";
    }
}

function evidence() {
    var causesNav = document.getElementById("evidence");
    var titleSwap = document.getElementById('subtitlePanel');
    var bodyBox1 = document.getElementById('textbox1');
    var bodyBox2 = document.getElementById('textbox2');
    
    document.getElementById('date').innerHTML = 'December 2016';
    document.getElementById('stat3').innerHTML = '404.4';
    document.getElementById('stat4').innerHTML = '7.3B';
    document.getElementById('stat2').innerHTML = '0.87°C';
    document.getElementById('stat1').innerHTML = '0.3ft';
    titleSwap.innerHTML = "EVIDENCE";
    bodyBox1.innerHTML = "The Earth's climate has changed throughout history. Most of these climate changes are attributed to very small variations in Earth’s orbit that change the amount of solar energy our planet receives.";
    bodyBox2.innerHTML = 'The current warming trend is of particular significance, because it is human-induced. And proceeding at a rate that is unusual in the past 1,300 years.'
;
        document.getElementById('currentStats').innerHTML = 'CURRENT WORLD STATS';

    
    
}


function causes() {
    var causesNav = document.getElementById("causes");
    causesNav.style.visibility = 'visible';
    document.getElementById('effectsButton').style.visibility= 'visible';
    document.getElementById('date').innerHTML = 'December 2020';
    document.getElementById('stat3').innerHTML = '450';
    document.getElementById('stat4').innerHTML = '7.8B';
    document.getElementById('stat2').innerHTML = '0.96°C';
    document.getElementById('stat1').innerHTML = '0.3ft';
    document.getElementById('currentStats').innerHTML = 'PROJECTED STATISTICS';
    var titleSwap = document.getElementById('subtitlePanel');
    var bodyBox1 = document.getElementById('textbox1');
    var bodyBox2 = document.getElementById('textbox2');
    
    titleSwap.innerHTML = "CAUSES";
    bodyBox1.innerHTML = 'Most climate scientists agree the main cause of the current global warming trend is human expansion of the "greenhouse effect"';
    bodyBox2.innerHTML = 'Burning fossil fuels. Humans have increased atmospheric CO2 concentration by more than a third since the Industrial Revolution began. This is the most important long-lived "forcing" of climate change.'
;
    
    
}

function effects() {
    var effectsNav = document.getElementById("effects");
    effectsNav.style.visibility = 'visible';
    document.getElementById('solutionButton').style.visibility= 'visible';
    document.getElementById('date').innerHTML = 'December 2050';
    document.getElementById('stat3').innerHTML = '700';
    document.getElementById('stat4').innerHTML = '9.3B';
    document.getElementById('stat2').innerHTML = '3°C';
    document.getElementById('stat1').innerHTML = '2.5ft';
    document.getElementById('currentStats').innerHTML = 'PROJECTED STATISTICS';

    var titleSwap = document.getElementById('subtitlePanel');
    var bodyBox1 = document.getElementById('textbox1');
    var bodyBox2 = document.getElementById('textbox2');
    
    titleSwap.innerHTML = "THE EFFECTS";
    bodyBox1.innerHTML = 'Melting Ice caps, rising temperature in the which causes land and marine ecosystems to endanger the species that live in them. ';
    bodyBox2.innerHTML = 'Large floods and wet seasons will occur much more offten. 2015 was the Hottest year on Earth ever to be recorded.'
;
    
}


function solutions() {
    var solutionsNav = document.getElementById("solutions");
    solutionsNav.style.visibility = 'visible';
    document.getElementById('whatIf2').style.visibility = 'visible';
    document.getElementById('toTheFuture').style.visibility = 'visible';
    document.getElementById('effectsButton').style.visibility= 'hidden';
    document.getElementById('date').innerHTML = 'December 2100';
    document.getElementById('stat3').innerHTML = '1000';
    document.getElementById('stat4').innerHTML = '11.2B';
    document.getElementById('stat2').innerHTML = '5°C';
    document.getElementById('stat1').innerHTML = '6.5ft';
        document.getElementById('currentStats').innerHTML = 'PROJECTED STATISTICS';

    var titleSwap = document.getElementById('subtitlePanel');
    var bodyBox1 = document.getElementById('textbox1');
    var bodyBox2 = document.getElementById('textbox2');
    var bodyBox3 = document.getElementById('textbox3');
 bodyBox3.innerHTML = 'Feel Free to look around—explore any details you may have missed!'
    titleSwap.innerHTML = "SOLUTIONS";
    bodyBox1.innerHTML = 'There are all kinds of renewable resources available to us. The sun, the wind, the ocean—three main regions of renewable energy';
    bodyBox2.innerHTML = 'Burning fossil fuels. Humans have increased atmospheric CO2 concentration by more than a third since the Industrial Revolution began. This is the most important long-lived "forcing" of climate change.'
;
    
    
}


function explore() {
    
    document.getElementById('panel').style.visibility = 'hidden';

}
//======================
//== CAMERA FUNCTIONS ==
//======================



function launchFossil() {

    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 225,
        z: -115
    }, 2000).easing(TWEEN.Easing.Quadratic.InOut); //ease in and out of tween
    document.getElementById('causesButton').style.visibility= 'hidden';


    pos1.start(); //initiates camera tween for position

}


function launchCity() {

    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 140,
        z: -10
    }, 2000).easing(TWEEN.Easing.Quadratic.InOut); //ease in and out of tween
    pos1.start(); //initiates camera tween for position



}

function launchBlank() {

    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 0,
        z: 0
    }, 100).easing(TWEEN.Easing.Quadratic.InOut); //ease in and out of tween
    pos1.start(); //initiates camera tween for position



}


function launchAftermath() {

    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 220,
        z: -80
    }, 2000).easing(TWEEN.Easing.Quadratic.InOut); //ease in and out of tween
    document.getElementById('effectsButton').style.visibility= 'hidden';


    pos1.start(); //initiates camera tween for position

}

function launchWind() {

    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 40,
        z: 120
    }, 2000).easing(TWEEN.Easing.Quadratic.InOut); //ease in and out of tween
    document.getElementById('solutionButton').style.visibility= 'hidden';
    document.getElementById('whatIf').style.visibility= 'visible';
    document.getElementById('toTheFuture').style.visibility='visible';

    pos1.start(); //initiates camera tween for position

}

function seeDrought() {
       var pos1 = new TWEEN.Tween(camera.position).to({
        x: 70,
        z: -80
    }, 2000).easing(TWEEN.Easing.Quadratic.InOut); //ease in and out of tween
        var titleSwap = document.getElementById('subtitlePanel');
    var bodyBox1 = document.getElementById('textbox1');
    var bodyBox2 = document.getElementById('textbox2');
    document.getElementById('currentStats').innerHTML = 'PROJECTED STATISTICS';
    
    document.getElementById('whatIf2').style.visibility= 'hidden';
    document.getElementById('date').innerHTML = 'December 2100';
    document.getElementById('stat3').innerHTML = '1000';
    document.getElementById('stat4').innerHTML = '11.2B';
    document.getElementById('stat2').innerHTML = '5°C';
    document.getElementById('stat1').innerHTML = '6.5ft';

    titleSwap.innerHTML = "THE END OF THE WORLD";
    bodyBox1.innerHTML = 'We are on a course for disaster. If we sit back and enjoy ourselves as it is, we will pay for it in the end. Droughts will occur in major regions of the US. Heavy rainfalls will no longer occur in regions';
    bodyBox2.innerHTML = 'Make the change. Start by ridding your bike to work, driving to less locations, maybe take public transportation. Even you can make a difference. It just takes one step—in this case, a giant leap.'
;

    pos1.start(); //initiates camera tween for position
}

function space() {
       var pos1 = new TWEEN.Tween(camera.position).to({
        x: 266,
        z: 85
    }, 2000).easing(TWEEN.Easing.Quadratic.InOut); //ease in and out of tween
    document.getElementById('toTheFuture').style.visibility= 'visible';
    document.getElementById('causes').style.visibility= 'hidden';
    
        pos1.start();
    var titleSwap = document.getElementById('subtitlePanel');
    var bodyBox1 = document.getElementById('textbox1');
    var bodyBox2 = document.getElementById('textbox2');
    document.getElementById('currentStats').innerHTML = 'PROJECTED STATISTICS';
    
    titleSwap.innerHTML = "TO INFINITY AND BEYOND";
    bodyBox1.innerHTML = 'If all is successful, the human race will live longer than it is projected to live, and we will be able to explore the unknown expanse of your universe';
    bodyBox2.innerHTML = 'Make the change. Start by ridding your bike to work, driving to less locations, maybe take public transportation. Even you can make a difference. It just takes one step—in this case, a giant leap.'
;
;
    
    


}




init(); //INIT FUNCTION CALLED TO RUN CODE