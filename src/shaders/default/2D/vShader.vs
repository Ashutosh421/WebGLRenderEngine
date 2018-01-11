#version 300 es

//Attributes
layout(location = 0) in vec2 vertPosition;
layout(location = 1) in vec4 vertColor;

//Uniforms
uniform vec2 resolution;
uniform mat3 modelMatrix;

// uniform vec2 translation;
// uniform vec2 rotation;
// uniform vec2 scale;

out vec4 fragColor;

void main(){
    // vec2 rotatedPosition = vec2(
    //  vertPosition.x * rotation.x - vertPosition.y * rotation.y,
    //  vertPosition.x * rotation.y + vertPosition.y * rotation.x);

    // vec2 scaledPosition = scale * rotatedPosition;

    vec3 transformPosition = vec3(vertPosition, 1.0) * modelMatrix;

    // vec2 transformPosition = scaledPosition + translation;
   //Converting from Homogenous to Cartesian Cordinate System;
    vec3 newPosition = (transformPosition) / vec3(resolution , 1.0); //Transform Data in range 0 to 1
    newPosition = newPosition * 2.0; //Transform Data in range 0 to 2
    newPosition = newPosition - 1.0; //Transform Data in range -1 to -1
    newPosition = newPosition * vec3( 1 , -1, 1 ); //Inverting the Y Axis

    gl_Position = vec4(newPosition, 1.0);   
    fragColor = vertColor;
    //fragColor = vec4(rotation , 1, 1);
}