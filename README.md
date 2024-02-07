# Challenge


A continuación, encontrarás los pasos detallados para descargar y ejecutar nuestro proyecto desde GitHub. Asegúrate de seguir cada paso cuidadosamente para garantizar una instalación exitosa.

### Paso 1: Descargar e Instalar Git
Si aún no tienes instalado Git en tu sistema, sigue estos pasos para descargarlo e instalarlo:

Windows: Descarga Git desde [aquí](https://git-scm.com/download/win) y sigue las instrucciones de instalación.
MacOS: Instala Git utilizando Homebrew ejecutando el comando brew install git en la terminal.
Linux: Utiliza el administrador de paquetes de tu distribución para instalar Git. Por ejemplo, en Ubuntu, puedes ejecutar sudo apt-get install git.

### Paso 2: Clonar el Repositorio desde GitHub
Una vez que tengas Git instalado, sigue estos pasos para clonar nuestro repositorio desde GitHub:

Desde la consola bash recien instalada, en una carpeta ejecuta el siguiente comando:
```bash
git clone https://github.com/gomezleo35/programming_challenge.git
```
### Paso 3: Descargar e Instalar Docker y Node.js
Si aún no tienes Docker y Node.js instalados en tu sistema, sigue estos pasos para descargarlos e instalarlos:

Docker: Descarga e instala Docker Desktop haciendo click [aquí](https://www.docker.com/products/docker-desktop) según tu sistema operativo.
Node.js: Descarga e instala Node.js haciendo click [aquí](https://nodejs.org) según tu sistema operativo.

### Paso 4: Levantar la Base de Datos con Docker Compose
Una vez que tengas Docker instalado y funcionando, asegúrate de tener el Docker daemon en ejecución. Para ello, abre la aplicación de Docker en tu sistema antes de ejecutar el siguiente comando en la terminal, asegurándote de estar posicionado en la raíz del proyecto. Luego, ejecuta el comando siguiente para levantar la base de datos con Docker Compose:

```bash
cd programming_challenge
docker-compose up -d
```
*Recuerda que la consola que utilices para este comando debe permanecer abierta y no debe usarse para ninguna otra tarea, ya que está dedicada a mantener la base de datos en funcionamiento.*

### Paso 5: Instalar Dependencias del Proyecto
Ahora, instala las dependencias del proyecto utilizando npm o yarn. Ejecuta uno de los siguientes comandos en una nueva terminal:

```bash
npm install
```

### Paso 6: Ejecutar la Aplicación Node.js
Una vez que todas las dependencias estén instaladas, puedes ejecutar la aplicación Node.js con el siguiente comando:

```bash
npm start
```

Los resultados y mensajes generados por la aplicación se mostrarán en la misma consola donde se ejecutó el comando npm start. Asegúrate de revisar la consola para cualquier mensaje de salida o error mientras la aplicación se esté ejecutando.

¡Listo! Ahora deberías poder acceder y utilizar nuestra aplicación sin problemas.

### Ejecutar Pruebas
Si deseas ejecutar las pruebas unitarias de la aplicación, puedes hacerlo utilizando el siguiente comando:

```bash
npm test
```

### Nota Importante
Si no tienes las herramientas necesarias para clonar el repositorio, puedes descargar el proyecto como un archivo ZIP desde este enlace.



# Explicación del Desafío de Programación

En este desafío de programación, se ha creado una aplicación para obtener y almacenar cotizaciones del dólar desde un proveedor externo. La aplicación se divide en varios archivos que trabajan juntos para lograr este objetivo.

## Archivo app.js

Este archivo es el punto de entrada de la aplicación. Su función principal es inicializar la aplicación y establecer un intervalo para obtener y almacenar las cotizaciones del dólar a intervalos regulares.
Se utiliza la herramienta dotenv para cargar variables de entorno desde un archivo env. Se define un controlador de cotizaciones (quotationsController) que se importa desde el archivo quotationsController.js.
Se define una función async que realiza las siguientes acciones:
Obtiene la cotización actual del dólar mediante el controlador de cotizaciones.
Imprime la cotización en la consola.
Almacena la cotización en la base de datos.
Establece un intervalo para repetir este proceso cada cierto tiempo (timeExecution).

## Archivo controllers/quotationsController.js

Este archivo contiene el controlador de cotizaciones, que se encarga de obtener y almacenar las cotizaciones del dólar.
Se importa el módulo axios para realizar solicitudes HTTP.
Se define una URL de un proveedor externo de cotizaciones del dólar.
Se define una función getQuote que realiza una solicitud HTTP a la URL del proveedor externo y devuelve la cotización de compra y venta del dólar.
Se define una función storeQuote que recibe las credenciales de la base de datos y la cotización del dólar, y la almacena en la base de datos utilizando el modelo correspondiente.

## Archivo models/quotationsModel.js

Este archivo contiene el modelo de cotizaciones, que se encarga de interactuar con la base de datos para almacenar las cotizaciones del dólar.
Se importa el cliente de PostgreSQL (Client) para interactuar con la base de datos.
Se define una consulta SQL para crear la tabla de cotizaciones si no existe.
Se define una función initializeDatabase que inicializa la conexión a la base de datos y crea la tabla de cotizaciones si no existe.
Se define una función insertQuotation que inserta una cotización en la base de datos, utilizando la conexión inicializada previamente.

## Resumen

En resumen, este desafío de programación consistió en crear una aplicación siguiendo el patrón Modelo-Vista-Controlador (MVC) para obtener y almacenar cotizaciones del dólar desde un proveedor externo. Se utilizaron herramientas como dotenv para la gestión de variables de entorno, axios para realizar solicitudes HTTP y pg para interactuar con la base de datos PostgreSQL. La aplicación se dividió en controladores (quotationsController) para la lógica de negocio y modelos (quotationsModel) para interactuar con la base de datos. Esta estructura facilita la modularidad y mantenibilidad del código.

¡Gracias!
