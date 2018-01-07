#version 300 es

//Attributes
layout(location = 0) in vec2 vertPosition;
layout(location = 1) in vec4 vertColor;

//Uniforms
uniform vec2 resolution;

struct Transform{
    vec2 translation;
    float angle;
    float scale;
};

uniform Transform transform;

out vec4 fragColor;

void main(){
    //Transform Data in range 0 to 1
    vec2 newPosition = vertPosition / resolution;

    //Transform Data in range 0 to 2
    newPosition = newPosition * 2.0;

    //Transform Data in range -1 to -1
    newPosition = newPosition - 1.0;

    //Inverting the Y Axis
    newPosition = newPosition * vec2( 1 , -1 );

    gl_Position = vec4(newPosition , 0.0, 1.0);   
    fragColor = vertColor;
}