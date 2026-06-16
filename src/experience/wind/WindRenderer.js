// src/experience/wind/WindRenderer.js

export class WindRenderer {

    constructor(scene) {

        this.scene = scene;

        this.lines = [];

        this.windSpeed = 1;

        this.createWindField();

    }

    createWindField() {

        const lineMaterial =
            new THREE.LineBasicMaterial({
                color: 0x66ccff
            });

        const rows = 25;
        const spacing = 0.18;

        for(let i = 0; i < rows; i++) {

            const points = [];

            for(let x = -6; x <= 6; x += 0.3) {

                points.push(
                    new THREE.Vector3(
                        x,
                        0.3 + (i * spacing),
                        0
                    )
                );

            }

            const geometry =
                new THREE.BufferGeometry()
                .setFromPoints(points);

            const line =
                new THREE.Line(
                    geometry,
                    lineMaterial
                );

            this.scene.add(line);

            this.lines.push({
                line,
                baseY:
                    0.3 + (i * spacing)
            });

        }

    }

    update(time) {

        this.lines.forEach(
            (item, index) => {

                const positions =
                    item.line.geometry.attributes.position;

                for(
                    let i = 0;
                    i < positions.count;
                    i++
                ) {

                    const x =
                        positions.getX(i);

                    let z = 0;

                    // ----------------------------------
                    // Athlete disturbance field
                    // ----------------------------------

                    const dist =
                        Math.sqrt(
                            x * x +
                            Math.pow(
                                item.baseY - 1.1,
                                2
                            )
                        );

                    if(dist < 1.2) {

                        z =
                            Math.sin(
                                dist * 4 +
                                time * 4
                            ) * 0.25;

                    }

                    positions.setZ(
                        i,
                        z
                    );

                }

                positions.needsUpdate = true;

                item.line.position.x =
                    (time * this.windSpeed)
                    % 1.5;

            }
        );

    }

    setWindSpeed(speed) {

        this.windSpeed = speed;

    }

}
