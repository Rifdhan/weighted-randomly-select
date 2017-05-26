# Weighted-Randomly-Select

This package lets you easily perform weighted random selection. Provide an array of objects with `chance` and `result` properties, and a random `result` will be selected according to the provided `chance` values.

# Installation

NPM: `npm install --save weighted-randomly-select`

YarnPkg: `yarn add weighted-randomly-select`

# Examples

```javascript
let Randomly = require("weighted-randomly-select");

// Equiprobable selection between two names
let name = Randomly.select([{
  chance: 1, result: "John"
}, {
  chance: 1, result: "Mary"
}]);

// Some outcomes are more probable than others
let coin = Randomly.select([{
  chance: 1, result: "Heads"
}, {
  chance: 1, result: "Tails"
}, {
  chance: 0.01, result: "Side"
}]);
```

# API Reference

## `Randomly.select(options)`

`options`: an array of objects, each of which having a `chance` number value and `result` value

`chance`: any positive floating point value (zero is permitted but such an entry will never be selected)

Note: all `chance` values must add up to a value greater than zero (i.e. there should be something to select). These values _do not_ have to add up to 1 or any other specific value.

## `Randomly.selectWithoutValidation(options)`

Same as above but does _not_ perform any validation on the provided input. If you're encountering unexpected issues, try using the above method, which does the same thing but _with_ input validation.
