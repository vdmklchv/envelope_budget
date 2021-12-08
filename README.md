# ENVELOPE BUDGET

This is a budgeting Codecademy portfolio app. NODE JS RESTful API to create, update, view budget envelopes and transfer money between existing envelopes.

## Software

- Node
- Express
- Body-parser

## Launch

Install dependencies with ```npm install``` and launch with ```node main.js``` from project root directory.  

## API Documentation

### Create new envelope

```JavaScript
// POST /envelopes 

// Expected format (in request body): 

{
    name: String,
    balance: Number
}
```

### Transfer balance between envelopes

```JavaScript
// POST /envelopes/env1/env2
// env1 is source, env2 is target

// Expected format (in request body):
{
    sum: Number,
}
```

### Get all envelopes

```JavaScript
// GET /envelopes
```

### Get single envelope

```JavaScript
// GET /envelopes/:name
// expects name to be fully matched with existing envelope
```

### Update envelope

```JavaScript
// PUT /envelopes/:name
// name parameter should correspond to name of updated resource in question
// expects data in request body in following format
{
    name: String (optional),
    sum: Number (mandatory)
}
```

### Delete envelope

```JavaScript
// DELETE /envelopes/:name
// name parameter should correspond to name of updated resource in question
```
