import * as THREE from 'three';

export default function (num = 1) {
  try {
    const blocks = [];
    const boxD = 3;
    for (let i = 0; i <= num; i++) {
      const geometry = new THREE.BoxGeometry( boxD, boxD, boxD ); 
    // const material1 = new THREE.MeshStandardMaterial( {color: 0xFFFF47 } ); 
      const material = new THREE.MeshBasicMaterial( {color: 0xFF4747, wireframe: true} ); 
      const cube = new THREE.Mesh( geometry, material );
      cube.position.set( boxD + i*5, 0, 0);
      blocks.push(cube);
    }
    return blocks;
  } catch(err) {
    console.log('failed blocks creation');
    return null;
  }
};