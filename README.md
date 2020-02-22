# API RESTFULL LUARQ

Para ejecutar en desarrollo
``` bash
npm run dev
```

Para ejecutar en producción
``` bash
npm run start
```

### Prerequisitos
- Nodejs
- Mongodb

## Autenticación
### Login
Es necesario guardar el token tras crear un usuario, para ello usar la función:
``` js
    saveToken()
```
``` js
    const { saveToken } = require('Start/middleware/auth')

    async (access_token, _idUser) => {
        /**
         * 
         * @param {string} access_token Token de acceso generado por jwt
         * @param {ObjectId} _idUser id del usuario, dueño del token
         */
        await saveToken(access_token, _idUser)
    }
```
La configuración de esta se encuentra en ` app/start/middleware/auth.js `


Para encriptar una contraseña se debe usarla función:
``` js
    new User(payload).encryptPassword(password) 
```
` app/Services/User/UserServices.js `
``` js
    'use strict'

    /**
     * Servicio UserServices
     */

    const User = require('App/Models/User')

    class UserServices {

        /**
         * 
         * @param {Object} payload Usuario
         * @param {string} payload.email Correo del usuario
         * @param {string} payload.password Clave del usuario
         */
        async createUser(payload) {
            try {
                const user = new User(payload)
                user.password = user.encryptPassword(user.password) 
                const userInserted = await user.save()
                return { status: 200, userInserted }
            } catch (error) {
                return { status: 500 }
            }
        }

    }

    module.exports = new UserServices
```
### Logout
Para invalidar el token al cerrar sesión, para ello usar la función:
``` js
    revokeToken()
```
``` js
    const { revokeToken } = require('Start/middleware/auth')

    async () => {
        /**
         * 
         * @param {string} access_token Token de acceso generado por jwt
         */
        await revokeToken(access_token)
    }
```
La configuración de esta se encuentra en ` app/start/middleware/auth.js `
### Rutas protegidas
Para acceder a una ruta solo con autenticación, se debe expresar `auth`
` app/start/routes/index.js `
``` js
    'use strict'

    /**
     * Establece todos los ficheros de las rutas que existirán
     */

    const { auth } = require('Start/middleware/auth')

    module.exports = (app) => {
        app.use('/api/test', auth, require('./api/test') ) // auth, para proteger a todo el fichero de rutas  
    }
```
Estas rutas ya no necesitan expresar `auth` ya que lo heredan del fichero anterior
` app/start/routes/api/test.js `
``` js
    'use strict'

    /**
     * Rutas de Test
     */

    const { Router } = require('express')
    const router = Router()

    const { auth } = require('Start/middleware/auth')
    const TestController = require('Ctrl/Test/TestController')

    router.get('/session', TestController.getTestSession )


    module.exports = router
```