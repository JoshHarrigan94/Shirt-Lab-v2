// src/experience/moisture/MoistureRenderer.js

export class MoistureRenderer {

    constructor(garment) {

        this.garment = garment;

        this.moisture = 0;

        this.maxDarkness = 0.55;

        this.baseColor =
            new THREE.Color(0xffffff);

    }

    setMoisture(value) {

        this.moisture =
            Math.max(
                0,
                Math.min(1, value)
            );

    }

    update(time) {

        const darkness =
            1 -
            (
                this.moisture *
                this.maxDarkness
            );

        const wetColor =
            this.baseColor.clone();

        wetColor.multiplyScalar(
            darkness
        );

        this.garment.body.material.color.copy(
            wetColor
        );

        // ----------------------------------
        // Fake sweat concentration zones
        // ----------------------------------

        const chestPulse =
            Math.sin(time * 3) * 0.02;

        this.garment.body.scale.z =
            this.garment.body.scale.z +
            chestPulse *
            this.moisture;

    }

}
