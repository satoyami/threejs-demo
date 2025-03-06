import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import createBlocks from './create-blocks.js';

// ############################
// ########    SETUP    #######
// ############################



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

const controls = new OrbitControls( camera, renderer.domElement );

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setX(70);
camera.position.setY(10);
camera.position.setZ(10);

controls.update();

renderer.render(scene, camera);

controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}

// ############################
// ########   OBJECTS   #######
// ############################
// OBJECTS
//CUBE0
// const geometry0 = new THREE.BoxGeometry( 2, 2, 2 ); 
// // const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 } ); 
// const material0 = new THREE.MeshBasicMaterial( {color: 0x559955, wireframe: true} ); 
// const cube0 = new THREE.Mesh( geometry0, material0 );
// // CUBE1
// const geometry1 = new THREE.BoxGeometry( 2, 2, 2 ); 
// // const material1 = new THREE.MeshStandardMaterial( {color: 0xFFFF47 } ); 
// const material1 = new THREE.MeshBasicMaterial( {color: 0xFFFF47, wireframe: true} ); 
// const cube1 = new THREE.Mesh( geometry1, material1 );
// // CUBE2
// const geometry2 = new THREE.BoxGeometry( 2, 2, 2 ); 
// // const material1 = new THREE.MeshStandardMaterial( {color: 0xFFFF47 } ); 
// const material2 = new THREE.MeshBasicMaterial( {color: 0xFF4747, wireframe: true} ); 
// const cube2 = new THREE.Mesh( geometry2, material2 );

// cube1.position.set(6, 6, 6);
// cube2.position.set(2, 6, 6);

const blocks = createBlocks(10);

blocks.forEach(block => {
  console.log( block );
  scene.add( block );
})


// LIGHTING
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(3, 3, 3);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

function update() {

		
	controls.update();
	// stats.update();
}

// ############################
// ########   ANIMATE   #######
// ############################
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  update();
  renderer.render(scene, camera);
}

animate();