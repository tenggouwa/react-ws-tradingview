import base64 from 'crypto-js/enc-base64'
import sha256 from 'crypto-js/sha256'

export default function security(salt, e) {
    let saltNew
    if (salt === 0) {
        saltNew = 'abc'
    } else {
        saltNew = '123'
    }
    const secretpwd = sha256(`${saltNew}${e}`)
    const securityString = base64.stringify(secretpwd)
    return securityString
}

