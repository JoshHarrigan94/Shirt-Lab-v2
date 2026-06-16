// –––––––––––––––––––––––––
// App.js
// –––––––––––––––––––––––––

import { BootstrapErrorService }
from “../core/BootstrapErrorService.js”;

import { DrawerController }
from “../ui/DrawerController.js”;

import { HumanViewer }
from “../experience/human/HumanViewer.js”;

import { GarmentViewer }
from “../experience/garment/GarmentViewer.js”;

import { ClothMotion }
from “../experience/garment/ClothMotion.js”;

import { WindRenderer }
from “../experience/wind/WindRenderer.js”;

import { AirflowInteraction }
from “../experience/wind/AirflowInteraction.js”;

import { MoistureRenderer }
from “../experience/moisture/MoistureRenderer.js”;

import { PerforationRenderer }
from “../experience/perforation/PerforationRenderer.js”;

import { HUDController }
from “../experience/hud/HUDController.js”;

// –––––––––––––––––––––––––
// Bootstrap
// –––––––––––––––––––––––––

const bootstrap =
new BootstrapErrorService();

const viewport =
document.getElementById(
“viewport”
);

// –––––––––––––––––––––––––
// Scene
// –––––––––––––––––––––––––

const scene =
new THREE.Scene();

scene.background =
new THREE.Color(
0x0e1116
);

// –––––––––––––––––––––––––
// Camera
// –––––––––––––––––––––––––

const camera =
new THREE.PerspectiveCamera(
50,
window.innerWidth /
window.innerHeight,
0.1,
1000
);

camera.position.set(
0,
1.6,
5
);

// –––––––––––––––––––––––––
// Renderer
// –––––––––––––––––––––––––

const renderer =
new THREE.WebGLRenderer({
antialias: true
});

renderer.setPixelRatio(
window.devicePixelRatio
);

renderer.setSize(
window.innerWidth,
window.innerHeight
);

viewport.appendChild(
renderer.domElement
);

// –––––––––––––––––––––––––
// Lights
// –––––––––––––––––––––––––

const ambient =
new THREE.AmbientLight(
0xffffff,
1.8
);

scene.add(
ambient
);

const keyLight =
new THREE.DirectionalLight(
0xffffff,
2
);

keyLight.position.set(
5,
8,
5
);

scene.add(
keyLight
);

const rimLight =
new THREE.DirectionalLight(
0x66ccff,
0.8
);

rimLight.position.set(
-5,
4,
-4
);

scene.add(
rimLight
);

// –––––––––––––––––––––––––
// Ground
// –––––––––––––––––––––––––

const ground =
new THREE.Mesh(

    new THREE.PlaneGeometry(
        20,
        20
    ),
    new THREE.MeshStandardMaterial({
        color: 0x161b22
    })
);

ground.rotation.x =
-Math.PI / 2;

ground.position.y =
-1;

scene.add(
ground
);

// –––––––––––––––––––––––––
// Module Variables
// –––––––––––––––––––––––––

let drawer;
let human;
let garment;
let clothMotion;
let wind;
let moisture;
let perforations;
let airflowInteraction;
let hud;

// –––––––––––––––––––––––––
// Safe Loader
// –––––––––––––––––––––––––

function safeLoad(
name,
factory
) {

try {
    bootstrap.register(
        name
    );
    const result =
        factory();
    bootstrap.complete(
        name
    );
    return result;
}
catch(error) {
    bootstrap.fail(
        name,
        error.message
    );
    console.error(
        name,
        error
    );
    return null;
}

}

// –––––––––––––––––––––––––
// Modules
// –––––––––––––––––––––––––

drawer =
safeLoad(
“DrawerController”,
() =>
new DrawerController()
);

human =
safeLoad(
“HumanViewer”,
() =>
new HumanViewer(
scene
)
);

garment =
safeLoad(
“GarmentViewer”,
() =>
new GarmentViewer(
scene,
human
)
);

clothMotion =
safeLoad(
“ClothMotion”,
() =>
new ClothMotion(
garment
)
);

wind =
safeLoad(
“WindRenderer”,
() =>
new WindRenderer(
scene
)
);

moisture =
safeLoad(
“MoistureRenderer”,
() =>
new MoistureRenderer(
garment
)
);

perforations =
safeLoad(
“PerforationRenderer”,
() =>
new PerforationRenderer(
scene,
garment
)
);

airflowInteraction =
safeLoad(
“AirflowInteraction”,
() =>
new AirflowInteraction(
wind,
perforations
)
);

hud =
safeLoad(
“HUDController”,
() =>
new HUDController()
);

// –––––––––––––––––––––––––
// Defaults
// –––––––––––––––––––––––––

if(
garment &&
garment.setFit
) {

garment.setFit(
    "regular"
);

}

if(
clothMotion
) {

clothMotion.setFit(
    "regular"
);
clothMotion.setWindStrength(
    1
);

}

if(
hud
) {

hud.setFit(
    "Regular"
);
hud.setWind(
    5
);
hud.setMoisture(
    0
);
if(
    hud.setPerforation
) {
    hud.setPerforation(
        "Plain"
    );
}

}

// –––––––––––––––––––––––––
// Resize
// –––––––––––––––––––––––––

window.addEventListener(
“resize”,
() => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}

);

// –––––––––––––––––––––––––
// Animation
// –––––––––––––––––––––––––

function animate() {

requestAnimationFrame(
    animate
);
const time =
    performance.now()
    * 0.001;
if(
    human?.update
) {
    human.update(
        time
    );
}
if(
    garment?.update
) {
    garment.update(
        time
    );
}
if(
    clothMotion?.update
) {
    clothMotion.update(
        time
    );
}
if(
    wind?.update
) {
    wind.update(
        time
    );
}
if(
    moisture?.update
) {
    moisture.update(
        time
    );
}
if(
    perforations?.update
) {
    perforations.update(
        time
    );
}
if(
    airflowInteraction?.update
) {
    airflowInteraction.update(
        time
    );
}
camera.lookAt(
    0,
    1.2,
    0
);
renderer.render(
    scene,
    camera
);

}

animate();

// –––––––––––––––––––––––––
// Debug
// –––––––––––––––––––––––––

window.ShirtLab = {

scene,
camera,
renderer,
human,
garment,
clothMotion,
wind,
moisture,
perforations,
airflowInteraction,
hud

};