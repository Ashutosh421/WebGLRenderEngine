#version 300 es

//Attributes
layout(location = 0) in vec2 vertPostion;
layout(location = 1) in vec2 vertColor;

//Uniforms
uniform resolution;

struct Transform{
    uniform vec2 translation;
    uniform float angle;
    uniform float scale;
}transform;

//Varyings
struct VS_OUT{
    out vec4 outColor;
}vs_out;

void main(){
    gl_Position = vec4(vertPostion , 0.0, 1.0);   
    vs_out.outColor = vertColor;
}