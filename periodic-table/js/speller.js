export default {
	check,
	lookup,
};

let elements;
let symbols = {};

await loadPeriodicTable();

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json();

	for (let element of elements) {
		symbols[element.symbol.toLowerCase()] = element;
	}
}

function findCandidates(inputWord) {
	const oneLetterSymbols = [];
	const twoLetterSymbols = [];

	for (let i = 0; i < inputWord.length; i++) {
		// Collect all the one letter candidates
		if (
			inputWord[i] in symbols &&
			// We can't use a set here because we need to preserve the order
			!oneLetterSymbols.includes(inputWord[i])
		) {
			oneLetterSymbols.push(inputWord[i]);
		}

		// Collect all the two letter candidates
		if (
			i <= inputWord.length - 2
		) {
			const two = inputWord.slice(i, i + 2);

			if (two in symbols && !twoLetterSymbols.includes(two)) {
				twoLetterSymbols.push(two);
			}
		}
	}

	return [ ...twoLetterSymbols, ...oneLetterSymbols ];
}

function spellWord(candidates, charsLeft) {
	if (charsLeft.length === 0) {
		return [];
	}

	// Check for two letters symbols first
	if (charsLeft.length >= 2) {
		const two = charsLeft.slice(0, 2);
		const rest = charsLeft.slice(2);
		
		// Found a match
		if (candidates.includes(two)) {
			// More characters to match
			if (rest.length > 0) {
				let result = [ two, ...spellWord(candidates, rest) ];

				if (result.join('') === charsLeft) {
					return result;
				}
			} else {
				return [two];
			}
		}
	}

	// Check for a one letter symbols
	if (charsLeft.length >= 1) {
		const one = charsLeft[0];
		const rest = charsLeft.slice(1);

		// Found a match
		if (candidates.includes(one)) {
			// More characters to match
			if (rest.length > 0) {
				let result = [ one, ...spellWord(candidates, rest) ];

				if (result.join('') === charsLeft) {
					return result;
				}
			} else {
				return [one];
			}
		}
	}

	return [];
}

function check(inputWord) {
	const candidates = findCandidates(inputWord);

	return spellWord(candidates, inputWord);
}

function lookup(elementSymbol) {
	return symbols?.[elementSymbol] || {};
}