# Agencia de Viajes - Aplicación React

Aplicación web para una agencia de viajes moderna con autenticación de usuarios, catálogo de destinos y sistema de reservas.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

![Preview de la aplicación](./public/preview.png) <!-- Agrega imagen real si tienes -->

## 🚀 Características principales

- Sistema completo de autenticación (registro/login)
- Página principal con ofertas destacadas
- Catálogo interactivo de destinos turísticos
- Sistema de reservas integrado
- Panel de usuario personalizado
- Administración de reservas (para usuarios registrados)
- Sistema de contactos integrado

## 📋 Requisitos previos

- Node.js v16+
- npm v8+
- Git (opcional pero recomendado)

## ⚙️ Instalación

1. Clonar repositorio:

```bash
git clone https://github.com/aldair1630/travel-agency-app.git
cd travel-agency-app
```

1. Instalar Dependencias:

```bash
npm install
```

1. Iniciar Aplicación:

```bash
npm start
```

La aplicación estará disponible en: http://localhost:3000

## 🔐 Sistema de Autenticación

Componentes clave:

- `AuthContext.js`: Maneja el estado global de autenticación
- `PrivateRoute.js`: Protege rutas para usuarios autenticados
- `PublicRoute.js`: Restringe acceso a rutas públicas cuando hay sesión activa

```jsx
// Ejemplo de ruta protegida
<PrivateRoute path="/destionations">
  <Destinations />
</PrivateRoute>
```

## 🌍 Principales Vistas

| Ruta            | Descripción                     | Acceso         |
| --------------- | ------------------------------- | -------------- |
| `/`             | Página principal                | Público        |
| `/about`        | Informacion sobre nosotros      | Público        |
| `/login`        | Inicio de sesión de usuarios    | No autenticado |
| `/register`     | Registro de nueva cuenta        | No autenticado |
| `/home`         | Pagina de inicio                | Autenticado    |
| `/destinations` | Historial y gestión de reservas | Autenticado    |

Catálogo interactivo de destinos

## 🛠 Tecnologías utilizadas

- `React 18` - Biblioteca principal frontend
- `React Router 6` - Manejo de navegación
- `Context API` - Gestión de estado global
- `Axios` - Cliente HTTP para APIs
- `Formik + Yup` - Manejo de formularios y validaciones
- `Lucide Icons` - Iconografía moderna
- `Tailwind CSS 3` - Sistema de estilos utility-first
- `Vite` - Bundler y entorno de desarrollo

# 📜 Licencia MIT

```text
MIT License

**Copyright (c) 2024 Travel Agency**

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y los archivos de documentación asociados (travel agency), para tratar
en el Software sin restricción, incluyendo sin limitación los derechos
de uso, copia, modificación, fusión, publicar, distribuir, sublicenciar y/o vender
copias del Software, y para permitir a las personas a las que se les proporcione el Software
hacerlo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas
las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITÁNDOSE A LAS GARANTÍAS DE COMERCIABILIDAD, ADECUACIÓN A UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE LOS DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O DE OTRA MANERA, QUE SURJA DE, O EN RELACIÓN CON EL SOFTWARE O EL USO O OTRAS NEGOCIACIONES EN EL SOFTWARE.
```

## 📜 Texto legal completo (Inglés)

```text
MIT License

Copyright (c) 2024 Travel Agency

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (travel agency), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📌 Notas importantes

- Dar creditos a `aldair1630` y `ALVfer66`
- Este documento debe llamarse **LICENSE.md** en la raíz del proyecto
- Versión compatible con [OSI](https://opensource.org/licenses/MIT)
