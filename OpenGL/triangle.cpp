#include <GL/glew.h>
#include <GLFW/glfw3.h>

// Coordinates of the equilateral triangle
GLfloat vertices[] = {
     0.0f,  0.433f, 0.0f,  // Top vertex
    -0.5f, -0.433f, 0.0f,  // Bottom left vertex
     0.5f, -0.433f, 0.0f   // Bottom right vertex
};

// Colors for the vertices (Red, Green, Blue)
GLfloat colors[] = {
    1.0f, 0.0f, 0.0f,    // Red
    0.0f, 1.0f, 0.0f,    // Green
    0.0f, 0.0f, 1.0f     // Blue
};

/**
 * @brief Sets up OpenGL settings.
 * 
 * This function sets the clear color to a dark background color.
 */
void setupOpenGL() {
    glClearColor(27.0f / 255.0f, 30.0f / 255.0f, 43.0f / 255.0f, 1.0f);  // Dark background
}

/**
 * @brief Renders the triangle.
 * 
 * This function clears the color and depth buffers, enables the vertex and color arrays,
 * sets the vertex and color pointers, draws the triangle, and then disables the arrays.
 */
void renderTriangle() {
    // Clear the color and depth buffers
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); 

    // Enable the vertex and color arrays
    glEnableClientState(GL_VERTEX_ARRAY); 
    glEnableClientState(GL_COLOR_ARRAY); 

    // Specify the location and format of the vertex and color arrays
    glVertexPointer(3, GL_FLOAT, 0, vertices); 
    glColorPointer(3, GL_FLOAT, 0, colors);   

    // Draw the triangle
    glDrawArrays(GL_TRIANGLES, 0, 3);

    // Disable the vertex and color arrays
    glDisableClientState(GL_VERTEX_ARRAY);
    glDisableClientState(GL_COLOR_ARRAY);
}

/**
 * @brief Callback function for window resize events.
 * 
 * This function adjusts the viewport and projection matrix to maintain the aspect ratio
 * and keep the triangle centered when the window is resized.
 * 
 * @param window The GLFW window.
 * @param width The new width of the window.
 * @param height The new height of the window.
 */
void resizeCallback(GLFWwindow* window, int width, int height) {

    // Set the viewport to the entire window
    glViewport(0, 0, width, height);

    // Set the current matrix mode to the projection matrix
    glMatrixMode(GL_PROJECTION);
    
    // Reset the projection matrix to the identity matrix
    glLoadIdentity();
    
    // Calculate the aspect ratio of the window
    float aspect = (float)width / (float)height;
    
    // Set up a 2D view based on the aspect ratio    
    if (aspect >= 1.0f) {
        // For wider windows, adjust the left and right sides
        glOrtho(-aspect, aspect, -1.0, 1.0, -1.0, 1.0);
    } else {
        // For taller windows, adjust the top and bottom sides
        glOrtho(-1.0, 1.0, -1.0 / aspect, 1.0 / aspect, -1.0, 1.0);
    }
    
    // Set the current matrix mode to the modelview matrix
    glMatrixMode(GL_MODELVIEW);
    
    // Reset the modelview matrix to the identity matrix
    glLoadIdentity();
}

/**
 * @brief Main function.
 * 
 * This function initializes GLFW, creates a window, sets up OpenGL, and enters the main loop
 * to render the triangle and handle events.
 * 
 * @return int Returns 0 on success, -1 on failure.
 */
int main() {
    // Initialize GLFW
    if (!glfwInit()) return -1;

    // Create a windowed mode window and its OpenGL context
    GLFWwindow* window = glfwCreateWindow(800, 600, "Triangulo en OpenGL", NULL, NULL);
    if (!window) {
        glfwTerminate();
        return -1;
    }

    // Make the window's context current
    glfwMakeContextCurrent(window);
    // Initialize GLEW
    glewInit();

    // Set up OpenGL settings
    setupOpenGL();

    // Set the callback for window resize events
    glfwSetFramebufferSizeCallback(window, resizeCallback);

    // Call the callback once to set up the initial projection
    int width, height;
    glfwGetFramebufferSize(window, &width, &height);
    resizeCallback(window, width, height);

    // Main loop
    // Loop until the user closes the window
    while (!glfwWindowShouldClose(window)) {
        // Render the triangle
        renderTriangle();
        // Swap front and back buffers
        glfwSwapBuffers(window);
        // Poll for and process events
        glfwPollEvents();
    }

    // Terminate GLFW
    glfwTerminate();
    return 0;
}