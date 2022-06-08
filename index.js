"use strict";

// Performs validation on input before performing the random selection
function selectWithValidation(choices) {
	// Validate argument is an array
	if(!choices || !choices.length) {
		throw new Error("Randomly Select: invalid argument, please provide a non-empty array");
	}

	// Validate that:
	// - each array entry has a 'chance' and 'result' property
	// - each 'chance' field is a number
	// - at least one result has a positive non-zero chance
	let atLeastOneChoiceHasNonZeroChance = false;
	for(let i = 0; i < choices.length; i++) {
		if(!exists(choices[i]) || !exists(choices[i].chance) || !exists(choices[i].result)) {
			throw new Error("Randomly Select: invalid argument, each array entry " +
				"must be an object with 'chance' and 'result' properties");
		} else if(typeof choices[i].chance !== 'number' || choices[i].chance < 0) {
			throw new Error("Randomly Select: invalid argument, 'chance' must be a positive number: " +
				JSON.stringify(choices[i].chance));
		} else if(choices[i].chance > 0) {
			atLeastOneChoiceHasNonZeroChance = true;
		}
	}

	if(!atLeastOneChoiceHasNonZeroChance) {
		throw new Error("Randomly Select: invalid arguments, all results have zero weight");
	}

	// Do the actual random selection and return the result
	return selectWithoutValidation(choices);
}

// Performs the random selection without validating any input
function selectWithoutValidation(choices) {
	// Generate a list of options with positive non-zero chances
	let choicesWithNonZeroChances = [];
	let totalWeight = 0.0;
	for(let i = 0; i < choices.length; i++) {
		if(choices[i].chance > 0.0) {
			choicesWithNonZeroChances.push(choices[i]);
			totalWeight += choices[i].chance;
		}
	}

	// Pick a random value from [0,1)
	let value = Math.random() * totalWeight;

	// Iterate over possibilities until we find the selected one
	let chanceCovered = 0.0;
	for(let i = 0; i < choicesWithNonZeroChances.length; i++) {
		chanceCovered += choicesWithNonZeroChances[i].chance;
		if(value < chanceCovered) {
			return choicesWithNonZeroChances[i].result;
		}
	}
	
	return choicesWithNonZeroChances.reduce((p, c) =>
                p.chance > c.chance ? p : c
            ).result;
}

function exists(value) {
	return (value != null && value != undefined);
}

module.exports = {
	// Performs validation on input before performing the random selection
	select: selectWithValidation,

	// Performs the random selection without validating any input
	selectWithoutValidation: selectWithoutValidation
};
