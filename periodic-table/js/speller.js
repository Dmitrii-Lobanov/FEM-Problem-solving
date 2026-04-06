export default {
	check,
	lookup,
};

let elements;
let symbols = {};

await loadPeriodicTable();


// ****************************

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json();

	for (let element of elements) {
		symbols[element.symbol.toLowerCase()] = element;
	}
}

function findCandidates(inputWord) {
	const oneLetterSymbols = [];
	const twoLetterSymbols = [];

	for (let i = 0; i < inputWord; i++) {
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

function check(inputWord) {
	if (inputWord.length > 0) {
		for (let element of elements) {
			const symbol = element.symbol.toLowerCase();

			if (symbol.length <= inputWord.length) {
				if (inputWord.slice(0, symbol.length) === symbol) {
					// If the word is longer than the symbol, recursively check 
					// the rest of the word
					if (inputWord.length > symbol.length) {
						let res = check(inputWord.slice(symbol.length));

						// Matched successfully
						if (res.length > 0) {
							return [symbol, ...res];
						}
					} else {
						return [symbol];
					}
				}
			}
		}
	}

	return [];
}

function lookup(elementSymbol) {
	return symbols?.[elementSymbol] || {};
}