export default {
	check,
	lookup,
};

var elements;

await loadPeriodicTable();


// ****************************

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json();
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
	for (let element of elements) {
		if (element.symbol.toLowerCase() === elementSymbol.toLowerCase()) {
			return element;
		}
	}

	return {};
}