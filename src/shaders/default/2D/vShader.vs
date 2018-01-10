#version 300 es

//Attributes
layout(location = 0) in vec2 vertPosition;
layout(location = 1) in vec4 vertColor;

//Uniforms
uniform vec2 resolution;

uniform vec2 translation;
uniform vec2 rotation;
uniform vec2 scale;

out vec4 fragColor;

void main(){
    vec2 scaledPosition = scale * vertPosition;

    vec2 rotatedPosition = vec2(
     scaledPosition.x * rotation.y + scaledPosition.y * rotation.x,
     scaledPosition.y * rotation.y - scaledPosition.x * rotation.x);
    // vec2 rotatedPosition = vec2(0,0);

    vec2 transformPosition = rotatedPosition + translation;

//     vec2 translatedPosition = vertPosition + translation;
//     vec2 rotatedPosition = vec2(
//         translatedPosition.x * rotation.y + translatedPosition.y * rotation.x,
//         translatedPosition.y * rotation.y - translatedPosition.x * rotation.x);
//    // vec2 rotatedPosition = rotation;
//     vec2 transformPosition = (translatedPosition + rotatedPosition) * scale;

   //Converting from Homogenous to Cartesian Cordinate System;
    vec2 newPosition = (transformPosition) / resolution; //Transform Data in range 0 to 1
    newPosition = newPosition * 2.0; //Transform Data in range 0 to 2
    newPosition = newPosition - 1.0; //Transform Data in range -1 to -1
    newPosition = newPosition * vec2( 1 , -1 ); //Inverting the Y Axis

    gl_Position = vec4(newPosition , 0.0, 1.0);   
    //fragColor = vertColor;
    fragColor = vec4(rotation , 1, 1);
}