// --------------------------------------------------
// Imports
// --------------------------------------------------

import { HumanViewer }
from "../experience/human/HumanViewer.js";

import { GarmentViewer }
from "../experience/garment/GarmentViewer.js";

import { ClothMotion }
from "../experience/garment/ClothMotion.js";

import { WindRenderer }
from "../experience/wind/WindRenderer.js";

import { AirflowInteraction }
from "../experience/wind/AirflowInteraction.js";

import { MoistureRenderer }
from "../experience/moisture/MoistureRenderer.js";

import { PerforationRenderer }
from "../experience/perforation/PerforationRenderer.js";

import { HUDController }
from "../experience/hud/HUDController.js";

// --------------------------------------------------
// DOM
// --------------------------------------------------

const viewport =
    document.getElementById("viewport");

// --------------------------------------------------
// Scene
// --------------------------------------------------

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x0e1116);

// --------------------------------------------------
// Camera
// --------------------------------------------------

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

// --------------------------------------------------
// Renderer
// --------------------------------------------------

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

// --------------------------------------------------
// Lighting
// --------------------------------------------------

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.8
    );

scene.add(
    ambientLight
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

// --------------------------------------------------
// Ground
// --------------------------------------------------

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

// --------------------------------------------------
// Modules
// --------------------------------------------------

const human =
    new HumanViewer(
        scene
    );

const garment =
    new GarmentViewer(
        scene,
        human
    );

const clothMotion =
    new ClothMotion(
        garment
    );

const wind =
    new WindRenderer(
        scene
    );

const moisture =
    new MoistureRenderer(
        garment
    );

const perforations =
    new PerforationRenderer(
        scene,
        garment
    );

const airflowInteraction =
    new AirflowInteraction(
        wind,
        perforations
    );

const hud =
    new HUDController();

// --------------------------------------------------
// Camera Controls
// --------------------------------------------------

document
.getElementById("frontView")
.addEventListener(
    "click",
    () => {

        camera.position.set(
            0,
            1.6,
            5
        );

    }
);

document
.getElementById("sideView")
.addEventListener(
    "click",
    () => {

        camera.position.set(
            5,
            1.6,
            0
        );

    }
);

document
.getElementById("backView")
.addEventListener(
    "click",
    () => {

        camera.position.set(
            0,
            1.6,
            -5
        );

    }
);

// --------------------------------------------------
// Fit Controls
// --------------------------------------------------

document
.getElementById("compressionFit")
.addEventListener(
    "click",
    () => {

        garment.setFit(
            "compression"
        );

        clothMotion.setFit(
            "compression"
        );

        hud.setFit(
            "Compression"
        );

    }
);

document
.getElementById("regularFit")
.addEventListener(
    "click",
    () => {

        garment.setFit(
            "regular"
        );

        clothMotion.setFit(
            "regular"
        );

        hud.setFit(
            "Regular"
        );

    }
);

document
.getElementById("oversizedFit")
.addEventListener(
    "click",
    () => {

        garment.setFit(
            "oversized"
        );

        clothMotion.setFit(
            "oversized"
        );

        hud.setFit(
            "Oversized"
        );

    }
);

// --------------------------------------------------
// Wind Controls
// --------------------------------------------------

document
.getElementById("windSlow")
.addEventListener(
    "click",
    () => {

        wind.setWindSpeed(1);

        clothMotion.setWindStrength(
            1
        );

        hud.setWind(
            5
        );

    }
);

document
.getElementById("windFast")
.addEventListener(
    "click",
    () => {

        wind.setWindSpeed(3);

        clothMotion.setWindStrength(
            3
        );

        hud.setWind(
            15
        );

    }
);

// --------------------------------------------------
// Moisture Controls
// --------------------------------------------------

document
.getElementById("dryBtn")
.addEventListener(
    "click",
    () => {

        moisture.setMoisture(
            0
        );

        hud.setMoisture(
            0
        );

    }
);

document
.getElementById("dampBtn")
.addEventListener(
    "click",
    () => {

        moisture.setMoisture(
            0.5
        );

        hud.setMoisture(
            0.5
        );

    }
);

document
.getElementById("soakedBtn")
.addEventListener(
    "click",
    () => {

        moisture.setMoisture(
            1
        );

        hud.setMoisture(
            1
        );

    }
);

// --------------------------------------------------
// Perforation Controls
// --------------------------------------------------

document
.getElementById("noPerforation")
.addEventListener(
    "click",
    () => {

        perforations.clear();

        hud.setPerforation(
            "Plain"
        );

    }
);

document
.getElementById("gridPerforation")
.addEventListener(
    "click",
    () => {

        perforations.setPattern(
            "grid"
        );

        hud.setPerforation(
            "Grid"
        );

    }
);

document
.getElementById("spinePerforation")
.addEventListener(
    "click",
    () => {

        perforations.setPattern(
            "spine"
        );

        hud.setPerforation(
            "Spine Vent"
        );

    }
);

document
.getElementById("mothTechPerforation")
.addEventListener(
    "click",
    () => {

        perforations.setPattern(
            "mothtech"
        );

        hud.setPerforation(
            "MothTech"
        );

    }
);

// --------------------------------------------------
// Resize
// --------------------------------------------------

window.addEventListener(
    "resize",
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

// --------------------------------------------------
// Defaults
// --------------------------------------------------

garment.setFit(
    "regular"
);

clothMotion.setFit(
    "regular"
);

clothMotion.setWindStrength(
    1
);

hud.setFit(
    "Regular"
);

hud.setWind(
    5
);

hud.setMoisture(
    0
);

hud.setPerforation(
    "Plain"
);

// --------------------------------------------------
// Animation Loop
// --------------------------------------------------

function animate() {

    requestAnimationFrame(
        animate
    );

    const time =
        performance.now()
        * 0.001;

    human.update(
        time
    );

    garment.update(
        time
    );

    clothMotion.update(
        time
    );

    wind.update(
        time
    );

    moisture.update(
        time
    );

    perforations.update(
        time
    );

    airflowInteraction.update(
        time
    );

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

// --------------------------------------------------
// Debug Access
// --------------------------------------------------

window.ShirtLab = {

    scene,
    camera,
    renderer,

    human,
    garment,

    wind,
    moisture,

    perforations

};
