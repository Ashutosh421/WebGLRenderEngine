import { Vector2D } from "../3DMaths/Vector2D";
import { EntityComponent } from "../Entity/EntityComponent";


export class Transform2D extends EntityComponent{

    private translation2D:Vector2D = Vector2D.Zero;
    private rotation2D:number = 0;
    private scale2D:Vector2D = Vector2D.Zero;

    
}