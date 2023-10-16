# Cometa Animal Shelter


<ol id='menu'>
  <li>
    <a href='#sobre-el-proyecto'>Sobre el proyecto</a>
  </li>
  <li>
    <a href="#antes-de-empezar">Antes de empezar</a>
    <ul>
      <li><a href='#instalación'>Instalación</a></li>
      <li><a href='#endpoints'>Endpoints</a></li>
    </ul>
  </li>
  <li>
    <a href="#tecnologías-utilizadas">Tecnologías utilizadas</a>
  </li>
  <li>
    <a href="#autores">Autor</a>
  </li>

## Sobre el proyecto
**_Cometa_** es una protectora de animales y la plataforma pretende permitir tanto a los usuarios poder encontrar a un perro o gato al que quieran adoptar, recibir donaciones de usuarios comprometidos con la causa de la protectora, y facilitar al equipo de voluntarios la gestión de los animales que pasan por la protectora.


## Antes de empezar
### Instalación
* Clonar el repositorio
    ```
    git clone git@github.com:AlejandroPachec/Cometa_Animal_Shelter_Backend.git
    ```
* Instalar las dependencias necesarias que incluye el proyecto
    ```
    npm install 
    ```
* Crear la base de datos en MySQL Workbench
   ```sql
   CREATE DATABASE IF NOT EXISTS cometa;
   ```
* Ejecutar la base de datos
    ```
    npm run db
    ```
* Arrancar el servidor
   ```
   npm run dev
   ```
* Añadir datos de muestra a la base de datos
  ```
  npm run backup
  ```

### Endpoints
  <table border>
    <tbody>
      <tr>
        <th colspan="3">USUARIOS</th>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td>user/create</td>
        <td>Añadir un nuevo miembro del equipo</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td>user/login</td>
        <td>Loguear un miembro del equipo</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td>user/profile/:idUser</td>
        <td>Ver el perfil de un miembro del equipo</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td>user/edit</td>
        <td>Editar tu perfil</td>
      </tr>
    </tbody>
  </table>
  
  <table border>
    <tbody>
      <tr>
        <th colspan="3">ANIMALES</th>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td>animals/addAnimal</td>
        <td>Añadir un nuevo perro o gato que llegue a la protectora</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td>animals?name=&species=&weight=&status=&gender=&age=</td>
        <td>Obtener todos los animales. Se pueden filtrar por nombre, especie (perro o gato), peso, estado de la adopción, género y edad</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td>animal/:idAnimal</td>
        <td>Obtener un animal en concreto</td>
      </tr>
    </tbody>
  </table>

  <table border>
    <tbody>
      <tr>
        <th colspan="3">Experiencias</th>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td>experiencias/:idTestimony</td>
        <td>Añadir una nueva experiencia de animal adoptado</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td>experiencias/:idTestimony</td>
        <td>Ver las experiencias</td>
      </tr>
    </tbody>
  </table>

<a href="#menu">Volver arriba</a>


## Tecnologías utilizadas
![Git](	https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![MySql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=wProject_X)


## Autores
<a href="https://github.com/AlejandroPachec/Cometa_Animal_Shelter_Backend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AlejandroPachec/Cometa_Animal_Shelter_Backend" />
</a>
