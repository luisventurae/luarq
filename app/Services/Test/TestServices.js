'use strict'

/**
 * Servicio TestServices
 */

class TestServices {

    /**
     * 
     */
    async formatMessage(msg) {
        try {
            const msg = msg.trim()
            return { status: 200, msg }
        } catch (error) {
            console.error('[TestServices][msg] error >>', error)
            return { status: 500 }
        }
    }

}

module.exports = new TestServices