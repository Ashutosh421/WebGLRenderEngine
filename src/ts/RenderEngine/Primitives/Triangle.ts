import { Entity } from "../Entity/Entity";

export class Triangle extends Entity{

    //#region LifeCycle Hooks
    public onInit(): void {
        super.onInit();

        console.log("Triangle Intialized");
    }
    public onEnabled(): void {
        super.onEnabled();

    }
    public onUpdate(): void {
        super.onUpdate();

        //console.log("Updating Triangle");
    }
    public onDestroy(): void {
        super.onDestroy();

    }
    // #endregion
}