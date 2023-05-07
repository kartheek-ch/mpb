const { default: mongoose } = require("mongoose");

const loanSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
});

const Loan = mongoose.model("LOAN", loanSchema);

module.exports = Loan;