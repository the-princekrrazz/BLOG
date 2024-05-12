const JWT = require("jsonwebtoken");

const secret = "Mc@hof-ow*/=0757";

function createTokenforUser(user){
    const payload ={
        _id:user.id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
    };
    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}
 module.exports = {
    createTokenforUser,
    validateToken
 }