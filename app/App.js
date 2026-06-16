// src/app/App.js

const viewport = document.getElementById("viewport");
const hud = document.getElementById("hud");

// --------------------------------------------------
// Scene
// --------------------------------------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// --------------------------------------------------
// Camera
// --------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1.6, 5);

// --------------------------------------------------
// Renderer
// --------------------------------------------------

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

viewport.appendChild(renderer.domElement);

// --------------------------------------------------
// Lighting
// --------------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

directionalLight.position.set(
    5,
    10,
    5
);

scene.add(directionalLight);

// --------------------------------------------------
// Ground Plane
// --------------------------------------------------

const groundGeometry =
    new THREE.PlaneGeometry(20, 20);

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x222222
    });

const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.rotation.x = -Math.PI / 2;

ground.position.y = -1;

scene.add(ground);

// --------------------------------------------------
// Origin Marker
// --------------------------------------------------

const markerGeometry =
    new THREE.SphereGeometry(
        0.15,
        32,
        32
    );

const markerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x00ff88
    });

const marker =
    new THREE.Mesh(
        markerGeometry,
        markerMaterial
    );

scene.add(marker);

// --------------------------------------------------
// Camera Presets
// --------------------------------------------------

const frontViewBtn =
    document.getElementById("frontView");

const sideViewBtn =
    document.getElementById("sideView");

const backViewBtn =
    document.getElementById("backView");

frontViewBtn.addEventListener(
    "click",
    () => {
        camera.position.set(
            0,
            1.6,
            5
        );
    }
);

sideViewBtn.addEventListener(
    "click",
    () => {
        camera.position.set(
            5,
            1.6,
            0
        );
    }
);

backViewBtn.addEventListener(
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
// HUD
// --------------------------------------------------

hud.innerHTML = `
    <h1>ShirtLab</h1>

    <p>Status: Ready</p>

    <p>Phase: Human Viewer</p>

    <p>Objects: 1</p>
`;

// --------------------------------------------------
// Animation Loop
// --------------------------------------------------

function animate() {

    requestAnimationFrame(
        animate
    );

    marker.rotation.y += 0.01;

    camera.lookAt(
        0,
        1,
        0
    );

    renderer.render(
        scene,
        camera
    );

}

animate();

// --------------------------------------------------
// Expose Globals
// --------------------------------------------------

window.ShirtLab = {
    scene,
    camera,
    renderer
};
