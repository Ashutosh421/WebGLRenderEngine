#version 300 es
precision mediump float;

in vec4 outColor;

out vec4 fragColor;

void main(){
    fragColor = outColor;
}