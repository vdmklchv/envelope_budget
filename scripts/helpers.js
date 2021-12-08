const validateBalance = (balance) => {
    if (typeof balance !== 'number' || balance < 0) {
        throw new Error('Illegal balance. Must be number and greater or equal than 0.');
    }
    return balance;
}

module.exports = validateBalance;