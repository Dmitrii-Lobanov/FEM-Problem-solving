export default {
	draw,
	highlight
};

let origBoardEl;

const NUM_ROWS = 8;

// ****************************

function draw(boardEl) {
	origBoardEl = boardEl;
	
    for (let i = 0; i < NUM_ROWS; i++) {
        let rowEl = document.createElement('div');

        for (let j = 0; j < NUM_ROWS; j++) {
            let tileEl = document.createElement('div');

            rowEl.appendChild(tileEl);
        }

        boardEl.appendChild(rowEl);
    }
}

function highlight(tileEl) {
	// TODO: clear previous highlights (if any) and
	// then find the tiles in the two diagonals
	// (major and minor) that `tileEl` belongs to,
	// to highlight them via CSS class "highlighted"
}