#version 300 es

precision mediump float;

//Varying 
in vec4 vertColor;

//Fragment Output
out vec4 outColor;

void main(){
    outColor = vertColor;
}