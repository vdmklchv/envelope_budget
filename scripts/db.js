
const db = {
    _envelopes: [],
    
    get envelopes() {
        if (this._envelopes.length === 0) {
            return [];
        }
        return this._envelopes;
    },
    
    addEnvelope(envelope) {
        this._envelopes.push(envelope);
    },

    removeEnvelope(index) {
        this._envelopes.splice(index, 1);
    },

    findEnvelopeIndex(envelope) {
        return this._envelopes.findIndex((item) => envelope.name === item.name);
    },

    updateEnvelope(envelope, index) {
        if (envelope.balance >= 0 && typeof envelope.balance === 'number') {
            this._envelopes[index] = envelope;
        } else {
            throw Error('Insufficient information to update envelope.');
        }
    }

}

module.exports = db;