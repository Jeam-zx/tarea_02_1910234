/**
 * This script creates a WebGL2 program that renders a colored triangle.
 */

// Get the canvas element and initialize WebGL2 context
const canvas = document.getElementById('webglCanvas');
const webgl = canvas.getContext('webgl2');

// Check if WebGL2 is supported
if (!webgl) {
    console.error('WebGL2 not supported');
}

// Resize the canvas to be square and centered
function resizeCanvas() {
    // Get the smaller of the window dimensions
    const displaySize = Math.min(window.innerWidth, window.innerHeight);

    // Set the canvas size to be square
    canvas.width = displaySize;
    canvas.height = displaySize;

    // Set the viewport to match the new canvas size
    webgl.viewport(0, 0, canvas.width, canvas.height);
}

/**
 * Compiles a shader from the provided source code.
 * 
 * @param webgl - The WebGL2 rendering context.
 * @param source - The GLSL source code for the shader.
 * @param type - The type of shader to create
 * @returns The compiled shader, or null if compilation failed.
 */
function compileShader(webgl, source, type) {
    // Create a shader of the specified type
    const shader = webgl.createShader(type);
    // Set the shader source code
    webgl.shaderSource(shader, source);
    // Compile the shader
    webgl.compileShader(shader);

    // Check if compilation was successful
    if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', webgl.getShaderInfoLog(shader)); // Log the error
        webgl.deleteShader(shader); // Delete the shader
        return null;
    }
    return shader;
}

/**
 * Creates and links a WebGL program from vertex and fragment shader sources.
 * 
 * @param webgl - The WebGL2 rendering context.
 * @param vertexShaderSource - The GLSL source code for the vertex shader.
 * @param fragmentShaderSource - The GLSL source code for the fragment shader.
 * @returns The linked WebGL program, or null if linking failed.
 */
function createAndLinkProgram(webgl, vertexShaderSource, fragmentShaderSource) {
    // Compile the vertex shader
    const vertexShader = compileShader(webgl, vertexShaderSource, webgl.VERTEX_SHADER); 
    // Compile the fragment shader
    const fragmentShader = compileShader(webgl, fragmentShaderSource, webgl.FRAGMENT_SHADER);

    // Create a new WebGL program and attach the shaders
    const program = webgl.createProgram();
    webgl.attachShader(program, vertexShader);
    webgl.attachShader(program, fragmentShader);

    // Link the program (this creates the final executable program)
    webgl.linkProgram(program);

    // Check if linking was successful
    if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
        console.error('Error linking program:', webgl.getProgramInfoLog(program));
        return null;
    }
    return program;
}

/**
 * Binds a buffer and sets up a vertex attribute pointer.
 * 
 * @param webgl - The WebGL2 rendering context.
 * @param program - The WebGL program.
 * @param buffer - The buffer to bind.
 * @param attribute - The name of the attribute in the shader.
 * @param size - The number of components per vertex attribute.
 */
function bindBufferAndSetupAttribute(webgl, program, buffer, attribute, size) {
    webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
    const attribLocation = webgl.getAttribLocation(program, attribute);
    webgl.vertexAttribPointer(attribLocation, size, webgl.FLOAT, false, 0, 0);
    webgl.enableVertexAttribArray(attribLocation);
}

/**
 * Renders the scene by clearing the canvas and drawing the triangle.
 * This function is called recursively using requestAnimationFrame to create an animation loop.
 */
function render() {
    // Clear the canvas with a dark background color
    webgl.clearColor(27.0 / 255.0, 30.0 / 255.0, 43.0 / 255.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);

    // Draw the triangle
    webgl.drawArrays(webgl.TRIANGLES, 0, 3);

    // Request to render the next frame
    requestAnimationFrame(render);
}

// Call resizeCanvas initially and whenever the window is resized
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Define the vertices and colors for the triangle
const vertices = new Float32Array([
    -0.5, -0.433, 0,  // Bottom left vertex
     0.5, -0.433, 0,  // Bottom right vertex
     0,  0.433, 0     // Top vertex
]);

const colors = new Float32Array([
    0, 1, 0,  // Green
    0, 0, 1,  // Blue
    1, 0, 0   // Red
]);

// Create a buffer for the vertices
const vertexBuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

// Create a buffer for the colors
const colorBuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, colorBuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, colors, webgl.STATIC_DRAW);

// Vertex Shader
// The vertex shader takes the vertex position and color as input
const vertexShaderSource = `#version 300 es
    in vec3 aPosition;
    in vec3 aColor;
    out vec3 vColor;

    void main() {
        gl_Position = vec4(aPosition, 1.0);
        vColor = aColor;
    }
`;

// Fragment Shader
// The fragment shader outputs the color of the fragment
const fragmentShaderSource = `#version 300 es
    precision mediump float;
    in vec3 vColor;
    out vec4 fragColor;

    void main() {
        fragColor = vec4(vColor, 1.0);
    }
`;

// Create and link the WebGL program
const program = createAndLinkProgram(webgl, vertexShaderSource, fragmentShaderSource);
if (!program) {
    throw new Error('Failed to create and link WebGL program');
}

// Use the program
webgl.useProgram(program);

// Bind the vertex buffer and set up the position attribute
bindBufferAndSetupAttribute(webgl, program, vertexBuffer, 'aPosition', 3);

// Bind the color buffer and set up the color attribute
bindBufferAndSetupAttribute(webgl, program, colorBuffer, 'aColor', 3);

// Start rendering
render();