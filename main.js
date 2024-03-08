import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry( 2, 2, 2 ); 
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 } ); 
// const material = new THREE.MeshBasicMaterial( {color: 0x559955, wireframe: true} ); 
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(3, 3, 3);

const ambientLight = new THREE.AmbientLight(0xffffff);


scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);


const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate);

  let czr = 0.0;
  let cxr = 0.0;
  let cyr = 0.0;
  cxr += 0.01;
  cyr += 0.005;
  czr += 0.01; 
  cube.rotateX(cxr);
  cube.rotateY(cyr);
  cube.rotateZ(czr);

  controls.update();

  renderer.render(scene, camera);
}

animate();