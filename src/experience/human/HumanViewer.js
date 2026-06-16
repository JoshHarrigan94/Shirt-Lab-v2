// src/experience/human/HumanViewer.js

export class HumanViewer {

    constructor(scene) {

        this.scene = scene;

        this.group = new THREE.Group();

        this.createBody();

        this.scene.add(this.group);

    }

    createBody() {

        const skinMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xd7b899,
                roughness: 0.9
            });

        // -------------------------
        // Head
        // -------------------------

        const head =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.18,
                    32,
                    32
                ),
                skinMaterial
            );

        head.position.y = 1.75;

        this.group.add(head);

        // -------------------------
        // Torso
        // -------------------------

        const torso =
            new THREE.Mesh(
                new THREE.CapsuleGeometry(
                    0.25,
                    0.8,
                    8,
                    16
                ),
                skinMaterial
            );

        torso.position.y = 1.1;

        this.group.add(torso);

        // Store for breathing later
        this.torso = torso;

        // -------------------------
        // Arms
        // -------------------------

        const armGeometry =
            new THREE.CapsuleGeometry(
                0.08,
                0.55,
                4,
                8
            );

        const leftArm =
            new THREE.Mesh(
                armGeometry,
                skinMaterial
            );

        leftArm.position.set(
            -0.38,
            1.15,
            0
        );

        leftArm.rotation.z =
            THREE.MathUtils.degToRad(8);

        this.group.add(leftArm);

        const rightArm =
            new THREE.Mesh(
                armGeometry,
                skinMaterial
            );

        rightArm.position.set(
            0.38,
            1.15,
            0
        );

        rightArm.rotation.z =
            THREE.MathUtils.degToRad(-8);

        this.group.add(rightArm);

        // -------------------------
        // Legs
        // -------------------------

        const legGeometry =
            new THREE.CapsuleGeometry(
                0.1,
                0.75,
                4,
                8
            );

        const leftLeg =
            new THREE.Mesh(
                legGeometry,
                skinMaterial
            );

        leftLeg.position.set(
            -0.12,
            0.25,
            0
        );

        this.group.add(leftLeg);

        const rightLeg =
            new THREE.Mesh(
                legGeometry,
                skinMaterial
            );

        rightLeg.position.set(
            0.12,
            0.25,
            0
        );

        this.group.add(rightLeg);

    }

    update(time) {

        // --------------------------------
        // Breathing animation
        // --------------------------------

        const breath =
            1 + Math.sin(time * 2) * 0.01;

        this.torso.scale.x = breath;
        this.torso.scale.z = breath;

    }

}
