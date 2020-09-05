function getNonBombPlaces (board, boardEnabled, id) {
    const height = board.length;
    const width = board[0].length;
    let nonBombPlaces = new Array(9);
    let arrCount = 0;
    if (!boardEnabled) {
        nearButtonsPlaces.forEach((value) => {
            const i = id.x + value[0];
            const j = id.y + value[1];
            if (i >= 0 && j >= 0 && i < height && j < width) {
                nonBombPlaces[arrCount] = String([board[i][j].id.x, board[i][j].id.y]);
                arrCount++;
            }
        })
    }
    nonBombPlaces[arrCount] = String([id.x, id.y]);
    return nonBombPlaces;
}

function bombsPlacing (board, mines, nonBombPlaces) {
    const height = board.length;
    const width = board[0].length;
    let bombPlaced;
    for (let i = 0; i < mines; i++) {
        bombPlaced = false;
        while (bombPlaced === false) {
            const rnd_i = Math.floor(Math.random() * (height - 1));
            const rnd_j = Math.floor(Math.random() * (width - 1));
            let validPlace = true;
            for (let j = 0; j < 9; j++) {
                if (String([board[rnd_i][rnd_j].id.x, board[rnd_i][rnd_j].id.y]) === String(nonBombPlaces[j])) {
                    validPlace = false;
                }
            }
            if (!board[rnd_i][rnd_j].isBomb && validPlace) {
                board[rnd_i][rnd_j].isBomb = true;
                bombPlaced = true;
                board = nearBombUpdate(rnd_i, rnd_j, board, height, width);
            }
        }
    }
    return board;
}

function nearBombUpdate (rnd_i, rnd_j, board, height, width) {
    nearButtonsPlaces.forEach((value) => {
        const i = rnd_i + value[0];
        const j = rnd_j + value[1];
        if (i >= 0 && j >= 0 && i < height && j < width) {
            board[i][j].nearBombsNum++;
        }
    })
    return board;
}