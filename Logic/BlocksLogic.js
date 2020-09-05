nearButtonsCheck = (id, leftClickHandle, board) => {
    const height = board.length;
    const width = board[0].length;
    nearButtonsPlaces.forEach((value) => {
        const i = id.x + value[0];
        const j = id.y + value[1];
        if (i >= 0 && j >= 0 && i < height && j < width) {
            if (!board[i][j].isBomb && !board[i][j].isRevealed) {
                leftClickHandle(board[i][j].isBomb, board[i][j].id);
            }
        }
    })
}
