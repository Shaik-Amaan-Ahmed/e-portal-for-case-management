const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courts = new Schema({
    mandal: {
        chief: {
            type: Map,
            of: Number
        },
        senior: {
            type: Map,
            of: Number
        },
        junior: {
            type: Map,
            of: Number
        }
    }
});

module.exports = mongoose.model('courts', courts);