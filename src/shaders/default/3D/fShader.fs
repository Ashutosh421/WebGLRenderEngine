#version 300 es

//Varying 
in vec4 vertColor;

//Fragment Output
out vec4 outColor;

void main(){
    outColor = vertColor;
}