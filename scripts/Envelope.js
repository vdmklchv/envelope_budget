const validateBalance = require('./helpers.js');

class Envelope {
    constructor(name, balance) {
        this.name = name;
        this.balance = validateBalance(Number(balance));
    }

    getBalance() {
        return this.balance;
    }

    setBalance(newBalance) {
        this.balance = validateBalance(newBalance);
    }

    transferTo(secondEnvelope, sum) {
        if (!sum) {
            throw new Error('No sum specified.');
        }
        if (this.balance - sum < 0) {
            throw new Error('Operation not permitted. Not enough funds for transfer');
        }
        this.balance -= sum;
        secondEnvelope.balance += sum;
    }
}

module.exports = Envelope;