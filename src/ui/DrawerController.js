export class DrawerController {

    constructor() {

        this.drawer =
            document.getElementById(
                "controlsDrawer"
            );

        this.toggleButton =
            document.getElementById(
                "drawerToggle"
            );

        this.open = false;

        this.toggleButton
            .addEventListener(
                "click",
                () => this.toggle()
            );

    }

    toggle() {

        this.open =
            !this.open;

        this.drawer.style.display =
            this.open
            ? "block"
            : "none";

    }

}