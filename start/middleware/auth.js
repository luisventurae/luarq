'use strict'

/**
 * Control de los tokens para la autenticación
 */

const KEY = process.env.APP_KEY
const jwt = require('jsonwebtoken')
const User = require('App/Models/User')
const Token = require('App/Models/Token')

const formatToken = (access_token) => {
    access_token = access_token.replace('Bearer ', '') // Se quita el Bearer para tener solo el token
    return access_token
}

const auth = async (request, response, next) => {
    try {
        const authorization = request.get("Authorization")

        if( !authorization ) // Validar que existe token
            throw { result: 'required', msg: 'Token requerido' }

        if( !authorization.startsWith('Bearer') ) // Se debe recibir un Token Bearer
            throw { result: 'invalid', msg: 'Formato token inválido' }

            
        const access_token = formatToken(authorization)

        const validToken = await Token.exists({ token: access_token, is_revoked: false })
        if( !validToken ) // Valida que el token no esté expirado
            return response.status(403).json({ success: false })      

        jwt.verify(access_token, KEY, async (err, decoded) => {
            try {
                if (err) throw { result: 'invalid', msg: 'Token inválido' }
                else request.decoded = decoded
                await getSession(request, access_token)
                next()                
            } catch (error) {
                // console.error('[middleware][auth][auth]_[jwt.verify] error >>', error)
                return response.status(401).json({ success: false, error: error })   
            }
        })               
        
    } catch (error) {
        console.error('[middleware][auth][auth] error >>', error)
        return response.status(500).send()               
    }
}

/**
 * Como la sesión mantiene los valores en memoria, para recuperar los valores del usuario tras reiniciar el servidor,
 * se vuelve a obtener los valores del usuario y reincertarlos en la sesion
 * @param {Object} request 
 * @param {string} access_token 
 */
const getSession = async (request, access_token) => {
    try {
        if( request.session.user ) return

        const token = await Token.findOne({ token: access_token, is_revoked: false })
        if( !token ) throw token 
        const user = await User.findOne({ _id: token.userId })
        delete user.password
        request.session.user = user
        return true
    } catch (error) {
        console.error('[middleware][auth][getSession] error >>', error)
        return false
    }
}

/**
 * 
 * @param {string} access_token Token de acceso generado por jwt
 * @param {ObjectId} _idUser id del usuario, dueño del token
 */
const saveToken = async (access_token, _idUser) => {
    try {
        const token = new Token({
            token: access_token,
            is_revoked: false,
            userId: _idUser,
        })
        await token.save()
        return true
        
    } catch (error) {
        return false        
    }
}

/**
 * 
 * @param {string} access_token Token de acceso generado por jwt
 */
const revokeToken = async (access_token) => {
    try {
        access_token = formatToken(access_token)

        const token = await Token.findOne({ token: access_token })
        token.is_revoked = true 
        await token.save()
        return true
        
    } catch (error) {
        console.error('[middleware][auth][revokeToken] error >>', error)
        return false
    }
}

module.exports = {
    auth,
    saveToken,
    revokeToken
}