# OpenGL - Triángulo con Colores de Vértice

## Información General
- **Nombre**: Jeamhowards Montiel
- **Carnet**: 19-10234
- **API**: OpenGL

## Sistema Operativo
Este proyecto se desarrolló en el sistema operativo Windows.

## Dependencias
El programa utiliza las siguientes dependencias:
- `MinGW64`: Incluye el compilador de C++ y las herramientas necesarias para la compilación.
- `CMake`: Herramienta para la configuración y generación del proyecto.
- `GLFW`: Biblioteca para la creación de ventanas y manejo de eventos.
- `GLEW`: Biblioteca para la extensión de OpenGL.

## Instrucciones para Ejecutar el Programa
Para ejecutar el programa, se asume que cuenta con MinGW64 y CMake instalados en su sistema. Además, se asume que las variables de entorno de MinGW64 y CMake están configuradas correctamente.

Desde la carpeta `OpenGl`:

1. **Crear el directorio de compilación**:
    ```sh
    mkdir build
    cd build
    ```

2. **Configurar el proyecto**:
    ```sh
    cmake -G "MinGW Makefiles" ..
    ```

3. **Compilar el proyecto**:
    ```sh
    mingw32-make
    ```

4. **Ejecutar el programa**:
    ```sh
    ./Triangle.exe
    ```

## Estructura del Proyecto
