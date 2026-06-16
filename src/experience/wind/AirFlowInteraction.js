// src/experience/wind/AirflowInteraction.js

export class AirflowInteraction {

    constructor(
        windRenderer,
        perforationRenderer
    ) {

        this.wind =
            windRenderer;

        this.perforations =
            perforationRenderer;

        this.enabled = true;

    }

    update(time) {

        if(!this.enabled) return;

        const holes =
            this.perforations.holes;

        this.wind.lines.forEach(
            windLine => {

                const positions =
                    windLine.line
                    .geometry
                    .attributes
                    .position;

                for(
                    let i = 0;
                    i < positions.count;
                    i++
                ) {

                    let x =
                        positions.getX(i);

                    let y =
                        positions.getY(i);

                    let z =
                        positions.getZ(i);

                    holes.forEach(
                        hole => {

                            const dx =
                                x -
                                hole.position.x;

                            const dy =
                                y -
                                hole.position.y;

                            const dist =
                                Math.sqrt(
                                    dx * dx +
                                    dy * dy
                                );

                            if(dist < 0.18) {

                                const boost =
                                    (
                                        0.18 -
                                        dist
                                    ) * 3;

                                z +=
                                    boost *
                                    0.08;

                            }

                        }
                    );

                    positions.setZ(
                        i,
                        z
                    );

                }

                positions.needsUpdate = true;

            }
        );

    }

}
