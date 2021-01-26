const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema(
{
    dsid: { type: String },
    tag: { type: String },
    username: { type: String }
});

const Player = mongoose.model('player', playerSchema);
module.exports = Player;