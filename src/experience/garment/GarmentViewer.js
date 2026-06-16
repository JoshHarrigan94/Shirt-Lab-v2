// src/experience/garment/GarmentViewer.js

export class GarmentViewer {

    constructor(scene, human) {

        this.scene = scene;
        this.human = human;

        this.group = new THREE.Group();

        this.currentFit = "regular";

        this.createShirt();

        this.scene.add(this.group);

    }

    createShirt() {

        const shirtMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.9,
                metalness: 0
            });

        // -----------------------
        // Main Body
        // -----------------------

        const body =
            new THREE.Mesh(
                new THREE.CapsuleGeometry(
                    0.29,
                    0.82,
                    8,
                    16
                ),
                shirtMaterial
            );

        body.position.y = 1.1;

        this.group.add(body);

        this.body = body;

        // -----------------------
        // Left Sleeve
        // -----------------------

        const sleeveGeometry =
            new THREE.CylinderGeometry(
                0.12,
                0.12,
                0.28,
                16
            );

        const leftSleeve =
            new THREE.Mesh(
                sleeveGeometry,
                shirtMaterial
            );

        leftSleeve.rotation.z =
            THREE.MathUtils.degToRad(90);

        leftSleeve.position.set(
            -0.36,
            1.38,
            0
        );

        this.group.add(leftSleeve);

        // -----------------------
        // Right Sleeve
        // -----------------------

        const rightSleeve =
            new THREE.Mesh(
                sleeveGeometry,
                shirtMaterial
            );

        rightSleeve.rotation.z =
            THREE.MathUtils.degToRad(90);

        rightSleeve.position.set(
            0.36,
            1.38,
            0
        );

        this.group.add(rightSleeve);

        // -----------------------
        // Collar
        // -----------------------

        const collar =
            new THREE.Mesh(
                new THREE.TorusGeometry(
                    0.12,
                    0.02,
                    12,
                    32
                ),
                new THREE.MeshStandardMaterial({
                    color: 0xdddddd
                })
            );

        collar.rotation.x =
            Math.PI / 2;

        collar.position.y = 1.55;

        this.group.add(collar);

    }

    setFit(fit) {

        this.currentFit = fit;

        switch(fit) {

            case "compression":

                this.group.scale.set(
                    0.95,
                    0.98,
                    0.95
                );

                break;

            case "regular":

                this.group.scale.set(
                    1,
                    1,
                    1
                );

                break;

            case "oversized":

                this.group.scale.set(
                    1.15,
                    1.08,
                    1.15
                );

                break;

        }

    }

    setColor(color) {

        this.body.material.color.set(
            color
        );

    }

    update(time) {

        // Tiny idle movement

        this.group.position.y =
            Math.sin(time * 2) * 0.005;

    }

}
