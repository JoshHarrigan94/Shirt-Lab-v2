// src/experience/perforation/PerforationRenderer.js

export class PerforationRenderer {

    constructor(scene, garment) {

        this.scene = scene;
        this.garment = garment;

        this.holes = [];

        this.pattern = "none";

    }

    clear() {

        this.holes.forEach(
            hole => this.scene.remove(hole)
        );

        this.holes = [];

    }

    createHole(x, y, z, size = 0.02) {

        const hole =
            new THREE.Mesh(

                new THREE.CircleGeometry(
                    size,
                    16
                ),

                new THREE.MeshBasicMaterial({
                    color: 0x00ffff
                })

            );

        hole.position.set(
            x,
            y,
            z + 0.31
        );

        this.scene.add(hole);

        this.holes.push(hole);

    }

    setPattern(pattern) {

        this.clear();

        this.pattern = pattern;

        switch(pattern) {

            case "mothtech":

                this.createMothTech();

                break;

            case "grid":

                this.createGrid();

                break;

            case "spine":

                this.createSpineVent();

                break;

        }

    }

    createGrid() {

        for(let y = 0.9; y < 1.45; y += 0.08) {

            for(let x = -0.18; x < 0.18; x += 0.08) {

                this.createHole(
                    x,
                    y,
                    0
                );

            }

        }

    }

    createSpineVent() {

        for(let y = 0.9; y < 1.45; y += 0.06) {

            this.createHole(
                0,
                y,
                -0.3
            );

        }

    }

    createMothTech() {

        const clusters = [

            [-0.15, 1.35],
            [ 0.15, 1.35],

            [-0.12, 1.15],
            [ 0.12, 1.15]

        ];

        clusters.forEach(cluster => {

            const [cx, cy] = cluster;

            for(let i = 0; i < 12; i++) {

                const angle =
                    Math.random()
                    * Math.PI * 2;

                const radius =
                    Math.random()
                    * 0.08;

                this.createHole(

                    cx +
                    Math.cos(angle)
                    * radius,

                    cy +
                    Math.sin(angle)
                    * radius,

                    0

                );

            }

        });

    }

    update(time) {

        this.holes.forEach(
            (hole, index) => {

                hole.scale.setScalar(

                    1 +
                    Math.sin(
                        time * 4 +
                        index
                    ) * 0.05

                );

            }
        );

    }

}
