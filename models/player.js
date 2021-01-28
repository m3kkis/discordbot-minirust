const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema(
{
    dsid : { type: String },
    tag : { type: String },
    username : { type: String },
    location : { type: String, default : "beach" },
    condition : {
        status : { type: String, default : "active" },
        health : { type: Number, default : 100 },
        stamina : { type: Number, default : 10 },
    },
    equipment: {
        weapon: { type: Array, default: [
                { 
                    id : "rock",
                    name : "Rock",
                    description: "Can punch stuff or people",
                    quantity: 1,
                    damage : 10,
                }
            ] 
        },
        armor: { type: Array, default: [] }
    },
    inventory: { type: Array, default: [] },
    base : {
        id : { type: String },
        location : { type: String },
        type : { type: String },
        health_current : { type: Number },
        health : { type: Number },
    }
});

const Player = mongoose.model('player', playerSchema);
module.exports = Player;