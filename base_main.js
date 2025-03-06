import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ############################
// ########    SETUP    #######
// ############################

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

const clock = new THREE.Clock({ autoStart: true });

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene, camera);

// ############################
// ########   OBJECTS   #######
// ############################
// OBJECTS
// const geometry = new THREE.BoxGeometry( 2, 2, 2 ); 
// const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 } ); 
// // const material = new THREE.MeshBasicMaterial( {color: 0x559955, wireframe: true} ); 
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

var division = 20;
var limit = 100;
var grid = new THREE.GridHelper(limit * 2, division, "blue", "blue");

var moveable = [];
for (let i = 0; i <= division; i++) {
  moveable.push(1, 1, 0, 0); // move horizontal lines only (1 - point is moveable)
}
grid.geometry.addAttribute(
  "moveable",
  new THREE.BufferAttribute(new Uint8Array(moveable), 1)
);
grid.material = new THREE.ShaderMaterial({
  uniforms: {
    time: {
      value: 0
    },
    limits: {
      value: new THREE.Vector2(-limit, limit)
    },
    speed: {
      value: 5
    }
  },
  vertexShader: `
    uniform float time;
    uniform vec2 limits;
    uniform float speed;
    
    attribute float moveable;
    
    varying vec3 vColor;
  
    void main() {
      vColor = color;
      float limLen = limits.y - limits.x;
      vec3 pos = position;
      if (floor(moveable + 0.5) > 0.5){ // if a point has "moveable" attribute = 1 
        float dist = speed * time;
        float currPos = mod((pos.z + dist) - limits.x, limLen) + limits.x;
        pos.z = currPos;
      } 
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
  
    void main() {
      gl_FragColor = vec4(vColor, 1.);
    }
  `,
  vertexColors: THREE.VertexColors
});

scene.add(grid);

// LIGHTING
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(3, 3, 3);

// const ambientLight = new THREE.AmbientLight(0xffffff);


// scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// // const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper);
// // scene.add(lightHelper, gridHelper);


const controls = new OrbitControls(camera, renderer.domElement);


// ############################
// ########   ANIMATE   #######
// ############################
function animate() {
  requestAnimationFrame(animate);

  time += clock.getDelta();
  grid.material.uniforms.time.value = time;

  controls.update();

  renderer.render(scene, camera, grid);
}

animate();