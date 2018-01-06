#version 300 es

//Attributes
layout(location = 0) in vec3 vertexPosition;
layout(location = 1) in vec4 vertexColor;

//Uniforms


//Varyings
out vec4 vertColor;

void main(){
    gl_Position = vec4(vertexPosition , 1.0);
    outColor = vertexColor;
}