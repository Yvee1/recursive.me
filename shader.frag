precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

void main () {
    vec2 vUv = gl_FragCoord.xy/u_resolution.xy;
    vec3 colorA = vec3(0.0, 168./255., 93./255.);
    vec3 colorB = vec3(0.0, 78./255., 168./255.);

    vec3 color = mix(colorA, colorB, smoothstep(-1., 1., vUv.y * cos( u_time + 20.) + vUv.x * cos(u_time * 2.) + vUv.x * cos(u_time * .3 + 40.)));
    gl_FragColor = vec4(color, 1.);
}