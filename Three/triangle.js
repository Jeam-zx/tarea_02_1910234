/**
 * triangle.js Triangle Renderer
 * This script creates a simple 3D scene with a colored triangle.
 */

import * as THREE from 'three';

let scene, camera, renderer, triangle;

/**
 * Initializes the Three.js scene, camera, and renderer.
 */
function initScene() {
    // Create a new scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1b1e2b);  // Set background color to dark blue

    // Set up the camera 
    const aspect = window.innerWidth / window.innerHeight; // Calculate aspect ratio
    camera = new THREE.PerspectiveCamera(50, aspect); // Create a new camera with perspective projection
    camera.position.z = 5; // Move the camera in front of the scene

    // Create the renderer
    renderer = new THREE.WebGLRenderer(); // Create a new WebGL renderer
    renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the renderer to the window size
    document.body.appendChild(renderer.domElement); // Append the renderer to the document body
}

/**
 * Creates a triangle mesh with vertex colors.
 * @returns The created triangle mesh.
 */
function createTriangle() {
    // Define triangle geometry (vertices)
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -1, -1, 0,  // Bottom left
        1, -1, 0,   // Bottom right
        0, 1, 0     // Top
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Define vertex colors (RGB values)
    const colors = new Float32Array([
        0, 1, 0,  // Green
        0, 0, 1,  // Blue
        1, 0, 0   // Red
    ]);
    // Set color attribute for each vertex in the geometry
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create material with vertex colors
    const material = new THREE.MeshBasicMaterial({ 
        vertexColors: true
    });

    // Create a mesh from the geometry and material, and return it
    return new THREE.Mesh(geometry, material);
}

/**
 * Handles window resize events.
 */
function onWindowResize() {
    // Update the camera aspect ratio and renderer size
    camera.aspect = window.innerWidth / window.innerHeight;
    // Update the camera's projection matrix
    camera.updateProjectionMatrix();
    // Update the renderer's size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Animation loop.
 */
function animate() {
    // Request the next frame
    requestAnimationFrame(animate);
    // Render the scene
    renderer.render(scene, camera);
}

/**
 * Initializes the application.
 */
function init() {
    // Initialize the scene, camera, and renderer
    initScene();
    triangle = createTriangle(); // Create a triangle mesh
    scene.add(triangle); // Add the triangle to the scene
    
    window.addEventListener('resize', onWindowResize, false); // Listen for window resize events
    
    animate(); // Start the animation loop
}

// Start the application
init();