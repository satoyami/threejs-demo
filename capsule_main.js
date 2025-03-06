import './style.css'

import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up Three.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create capsule geometry
var capsuleGeometry = new THREE.CylinderGeometry(1, 1, 2, 30);
var capsuleMaterial = new THREE.MeshBasicMaterial({ color: 0x9999FF, wireframe: true });
var capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsule.rotateZ(1.59);
scene.add(capsule);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
// Define starting and ending positions
const startPosition = new THREE.Vector3(-10, 0, 0);
const midPosition = new THREE.Vector3(0, 5, 0);
const endPosition = new THREE.Vector3(10, 0, 0);

// Tween path
const motionPath = new TWEEN.Tween()


let angle = 0.01;
// Animate capsule movement using Tween.js
const tween1 = new TWEEN.Tween(capsule.position)
    .to(midPosition, 3000) // 3000 milliseconds (3 seconds) for the animation
    .easing(TWEEN.Easing.Bounce.Out)
    .onUpdate(function () {
        capsule.position.copy(midPosition)
    })
const tween2 = new TWEEN.Tween(capsule.position)
    .to(midPosition, 3000) // 3000 milliseconds (3 seconds) for the animation
    .easing(TWEEN.Easing.Bounce.Out)
    .onUpdate(function () {
        capsule.position.copy(endPosition)
    })
const tween3 = new TWEEN.Tween(capsule.position)
    .to(endPosition, 3000) // 3000 milliseconds (3 seconds) for the animation
    .easing(TWEEN.Easing.Bounce.Out)
    .onUpdate(function () {
        capsule.position.copy(startPosition)
    })
    // .start();
tween1.chain(tween2);
tween2.chain(tween3);
tween3.chain(tween1)

tween1.start();


    const controls = new OrbitControls(camera, renderer.domElement);
    
    // Update function to handle animation
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Set camera position
camera.position.y = 8;
camera.position.z = 10;
