const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema(
{
    dsid: { type: String },
    tag: { type: String },
    username: { type: String },
    condition: {
        status: { type: String, default : "active"},
        health : { type: Number, default : 100},
        energy : { type: Number, default : 10},
    },
    location : { type: String, default : "beach"}
});

const Player = mongoose.model('player', playerSchema);
module.exports = Player;