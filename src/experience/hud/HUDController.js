// src/experience/hud/HUDController.js

export class HUDController {

    constructor() {

        this.panel =
            document.getElementById("hud");

        this.state = {
    wind: 5,
    moisture: 0,
    fit: "Regular",
    perforation: "Plain",
    cooling: 82,
    comfort: 88,
    airflow: 74
};

        this.render();

    }

    setWind(speed) {

        this.state.wind = speed;

        this.updateDerivedMetrics();

    }

    setMoisture(value) {

        this.state.moisture = value;

        this.updateDerivedMetrics();

    }

    setFit(fit) {

        this.state.fit = fit;

        this.updateDerivedMetrics();

    }

    setPerforation(type) {

    this.state.perforation =
        type;

    this.render();

}

    updateDerivedMetrics() {

        const windBonus =
            this.state.wind * 2;

        const moisturePenalty =
            this.state.moisture * 35;

        this.state.cooling =
            Math.max(
                0,
                Math.min(
                    100,
                    70 +
                    windBonus -
                    moisturePenalty
                )
            );

        this.state.comfort =
            Math.max(
                0,
                Math.min(
                    100,
                    85 -
                    moisturePenalty
                )
            );

        this.state.airflow =
            Math.max(
                0,
                Math.min(
                    100,
                    50 + windBonus
                )
            );

        this.render();

    }

    render() {

        this.panel.innerHTML = `

            <h1>ShirtLab</h1>

            <hr style="
                margin:10px 0;
                opacity:0.2;
            ">

            <p>
                Wind:
                ${this.state.wind} mph
            </p>

            <p>
                Fit:
                ${this.state.fit}
            </p>

            <p>
                Moisture:
                ${Math.round(
                    this.state.moisture * 100
                )}%
            </p>

            <hr style="
                margin:10px 0;
                opacity:0.2;
            ">

            <p>
                Cooling:
                ${Math.round(
                    this.state.cooling
                )}
            </p>

            <p>
                Comfort:
                ${Math.round(
                    this.state.comfort
                )}
            </p>

            <p>
                Airflow:
                ${Math.round(
                    this.state.airflow
                )}
            </p>

            <p>
Perforation:
${this.state.perforation}
</p>

        `;

    }

}
