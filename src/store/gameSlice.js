import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: Array(6)
    .fill(null)
    .map(() => Array(6).fill(null)),
  currentColor: 0,
  colors: ["red", "blue", "green", "yellow", "purple", "orange"],
  fallingPiece: null, // { row, col, color }
};

const findLowestEmptyRow = (board, col) => {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return -1; // Column is full
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    placePiece: (state, action) => {
      const { col } = action.payload;
      const row = findLowestEmptyRow(state.board, col);

      if (row !== -1) {
        state.fallingPiece = {
          targetRow: row,
          col,
          color: state.currentColor,
        };
        state.currentColor = (state.currentColor + 1) % state.colors.length;
      }
    },
    completeFall: (state) => {
      if (state.fallingPiece) {
        const { targetRow, col, color } = state.fallingPiece;
        state.board[targetRow][col] = color;
        state.fallingPiece = null;
      }
    },
    resetGame: (state) => {
      state.board = Array(6)
        .fill(null)
        .map(() => Array(6).fill(null));
      state.currentColor = 0;
      state.fallingPiece = null;
    },
  },
});

export const { placePiece, completeFall, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
