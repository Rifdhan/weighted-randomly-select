# Weighted-Randomly-Select

This package lets you easily perform weighted random selection. Provide an array of objects with `chance` and `result` properties, and a random `result` will be selected according to the provided `chance` values.

# Installation

NPM: `npm install --save weighted-randomly-select`

YarnPkg: `yarn add weighted-randomly-select`

# Examples

```javascript
let Randomly = require("weighted-randomly-select");

// Every outcome can be equiprobable
let name = Randomly.select([{
  chance: 1, result: "John"
}, {
  chance: 1, result: "Mary"
}]);
// name will be either "John" or "Mary"

// Some outcomes can be more probable than others
let coin = Randomly.select([{
  chance: 1, result: "Heads"
}, {
  chance: 1, result: "Tails"
}, {
  chance: 0.01, result: "Side"
}]);
// coin will be either "Heads", "Tails", or "Side"

// Chance values can be any positive number, and result values
// can be anything other than null and undefined
let item = Randomly.select([{
  chance: 0.8, result: { someField: "someValue" }
}, {
  chance: 20, result: 42
}, {
  chance: 1.5, result: [3, 1, 5]
}]);
// item will be either { someField: "someValue" }, 42, or [3, 1, 5]
```

# API Reference

## `Randomly.select(options)`

`options`: an array of objects, each of which having a `chance` number value and `result` value

`chance`: any positive floating point value (zero is permitted but such an entry will never be selected)

Note: all `chance` values must add up to a value greater than zero (i.e. there should be something to select). These values _do not_ have to add up to 1 or any other specific value.

Return value: one of the `result` values in the `options` array.

Throws errors if any input is invalid.

## `Randomly.selectWithoutValidation(options)`

Same as above but does _not_ perform any validation on the provided input. If you're encountering unexpected issues, try using the above method, which does the same thing but _with_ input validation.
