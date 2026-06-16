export class BootstrapErrorService {

    constructor() {

        this.hud =
            document.getElementById("hud");

        this.modules = [];

    }

    register(name) {

        this.modules.push({
            name,
            status: "loading"
        });

        this.render();

    }

    complete(name) {

        const module =
            this.modules.find(
                m => m.name === name
            );

        if(module) {

            module.status = "ok";

        }

        this.render();

    }

    fail(name, error) {

        const module =
            this.modules.find(
                m => m.name === name
            );

        if(module) {

            module.status = "failed";
            module.error = error;

        }

        this.render();

    }

    render() {

        const html =
            this.modules.map(m => {

                if(m.status === "ok") {

                    return `
                        <p>✅ ${m.name}</p>
                    `;

                }

                if(m.status === "failed") {

                    return `
                        <p>
                        ❌ ${m.name}
                        </p>

                        <p style="
                            color:#ff6666;
                            font-size:12px;
                        ">
                        ${m.error}
                        </p>
                    `;

                }

                return `
                    <p>
                    ⏳ ${m.name}
                    </p>
                `;

            }).join("");

        this.hud.innerHTML = `
            <h1>ShirtLab</h1>
            ${html}
        `;

    }

}