const express = require('express');
const db = require('./db.js');
const Envelope = require('./Envelope.js');
const envelopeRouter = express.Router();
const bodyParser = require('body-parser');

envelopeRouter.use(bodyParser.json());

// MIDDLEWARES
envelopeRouter.param('name', (req, res, next) => {
    const name = req.params.name;
    const result = db.envelopes.find((item) => item.name === name);
    if (!result) {
        return res.status(404).send({message: 'Not found', status: 404});
    }
    req.envelope = result;
    next();
})

envelopeRouter.use('/', (req, res, next) => {
    const name = req.body.name;
    const result = db.envelopes.find((item) => item.name === name);
    if (result) {
        req.found = true;
    }
    next();
})

// READ
// GET route to retrieve all envelopes
envelopeRouter.get('/', (req, res) => {
    res.status(200).send(db.envelopes);
})

// GET route to retrieve single envelope
envelopeRouter.get('/:name', (req, res) => {
    res.status(200).send(req.envelope);
})

// CREATE
// POST route to create an envelope
envelopeRouter.post('/', (req, res) => {
    const name = req.body.name;
    const balance = req.body.balance;
    try {
        const newEnvelope = new Envelope(name, balance || 0);
        if (!req.found) {
            db.addEnvelope(newEnvelope);
            res.status(201).send(newEnvelope);
        } else {
            res.status(422).send({
                code: 422,
                message: "Envelope exists"
            });
        }
    } catch (e) {
        res.status(400).send({
            status: 400,
            message: e.message,
        });
    }  
})

// POST route to transfer money
envelopeRouter.post('/:from/:to', (req, res, next) => {
    const sourceEnvName= req.params.from;
    const targetEnvName = req.params.to;
    const sourceEnv = db.envelopes.find((env) => sourceEnvName === env.name);
    const targetEnv = db.envelopes.find((env) => targetEnvName === env.name);
    const sum = req.body.sum;
    try {
        sourceEnv.transferTo(targetEnv, sum);
        res.status(200).send({
            code: 200,
            message: 'Transfer successful'
        })
    } catch (e) {
        res.status(422).send({
            status: 422,
            message: e.message,
        })
    }
})

// UPDATE
// PUT route to update envelope balance
envelopeRouter.put('/:name', (req, res) => {
    const oldEnvelope = req.envelope;
    const index = db.findEnvelopeIndex(oldEnvelope);
    // CHECK BODY FOR REQUIRED ELEMENTS
    try {
        db.updateEnvelope(req.body, index);
        res.status(200).send(req.body);
    } catch (e) {
        res.status(422).send(e.message);
    }
})

// DELETE
// DELETE route to delete specified envelope
envelopeRouter.delete('/:name', (req, res) => {
    const oldEnvelope = req.envelope;
    const index = db.findEnvelopeIndex(oldEnvelope);
    db.removeEnvelope(index);
    res.status(204).send();
})

envelopeRouter.get('*', (req, res, next) => {
    res.status(404).send({
        code: 404,
        message: 'Route Not Found',
    });
})

module.exports = envelopeRouter;