const mongoose = require("mongoose");

const ValidateMongoDbId = id => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if(!isValidId) throw new Error("Invalid Id passed, check your Id");
}

module.exports = ValidateMongoDbId;
