const Players = require('../models/player'); 

module.exports = {
    generateID: length => {
        var result = '';
        var characters = 'ABCDEFHKMNPQRSTXYZabcdefhkmnpqrstxyz123456789'; // removed i,j,l,g,0,u,w,v.
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
};