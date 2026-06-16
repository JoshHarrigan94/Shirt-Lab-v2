// src/experience/garment/ClothMotion.js

export class ClothMotion {

    constructor(garment) {

        this.garment = garment;

        this.windStrength = 1;
        this.fit = "regular";

    }

    setWindStrength(value) {

        this.windStrength = value;

    }

    setFit(fit) {

        this.fit = fit;

    }

    update(time) {

        let movementMultiplier = 1;

        switch(this.fit) {

            case "compression":
                movementMultiplier = 0.2;
                break;

            case "regular":
                movementMultiplier = 1;
                break;

            case "oversized":
                movementMultiplier = 2.5;
                break;

        }

        const ripple =
            Math.sin(time * 5)
            * 0.01
            * this.windStrength
            * movementMultiplier;

        const flutter =
            Math.sin(time * 11)
            * 0.005
            * this.windStrength
            * movementMultiplier;

        this.garment.group.rotation.z =
            ripple;

        this.garment.group.position.z =
            flutter;

        const scalePulse =
            1 +
            (
                Math.sin(time * 4)
                * 0.005
                * this.windStrength
                * movementMultiplier
            );

        this.garment.body.scale.x =
            scalePulse;

        this.garment.body.scale.z =
            scalePulse;

    }

}
