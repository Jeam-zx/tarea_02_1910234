cmake_minimum_required(VERSION 3.10)
project(OpenGLTriangle)

set(CMAKE_CXX_STANDARD 11)

# Rutas a las bibliotecas (ajusta según tu configuración)
set(GLFW_DIR "${CMAKE_SOURCE_DIR}/Libraries/GLFW")
set(GLEW_DIR "${CMAKE_SOURCE_DIR}/Libraries/GLEW")

include_directories(${GLFW_DIR}/include ${GLEW_DIR}/include)
link_directories(${GLFW_DIR}/lib-mingw-w64 ${GLEW_DIR}/lib/Release/x64)

add_executable(Triangle triangle.cpp)

# Enlazar con las bibliotecas estáticas
target_link_libraries(Triangle 
    ${GLFW_DIR}/lib-mingw-w64/libglfw3.a
    ${GLEW_DIR}/lib/Release/x64/glew32s.lib
    opengl32
    gdi32  # Añadido gdi32 que es necesario para GLEW estático
)

# Definiciones necesarias para GLEW estático
add_definitions(-DGLEW_STATIC)