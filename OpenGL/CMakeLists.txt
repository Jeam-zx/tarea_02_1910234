# Minimum required version of CMake
cmake_minimum_required(VERSION 3.10)

# Project name
project(OpenGLTriangle)

# Set the C++ standard to C++11
set(CMAKE_CXX_STANDARD 11)

# Set the directories for GLFW and GLEW libraries
set(GLFW_DIR "${CMAKE_SOURCE_DIR}/Libraries/GLFW")
set(GLEW_DIR "${CMAKE_SOURCE_DIR}/Libraries/GLEW")

# Include directories for GLFW and GLEW headers
include_directories(${GLFW_DIR}/include ${GLEW_DIR}/include)

# Link directories for GLFW and GLEW libraries
link_directories(${GLFW_DIR}/lib-mingw-w64 ${GLEW_DIR}/lib/Release/x64)

# Define the executable target for the project
add_executable(Triangle triangle.cpp)

# Link the executable with the static libraries
target_link_libraries(Triangle 
    ${GLFW_DIR}/lib-mingw-w64/libglfw3.a  # Link with the GLFW static library
    ${GLEW_DIR}/lib/Release/x64/glew32s.lib  # Link with the GLEW static library
    opengl32  # Link with the OpenGL library
    gdi32  # Link with the GDI32 library, necessary for static GLEW
)

# Define necessary preprocessor definitions for static GLEW
add_definitions(-DGLEW_STATIC)