import { createSlice } from "@reduxjs/toolkit";

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

// Shuffle array helper function
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const initialState = {
  board: Array(6)
    .fill(null)
    .map(() => Array(6).fill(null)),
  topPieces: shuffleArray([...Array(6).keys()]), // Indices of colors
  selectedPiece: null, // Index in topPieces
  colors: COLORS,
  fallingPiece: null, // { row, col, color }
};

const findLowestEmptyRow = (board, col) => {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return -1;
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectPiece: (state, action) => {
      state.selectedPiece = action.payload;
    },
    placePiece: (state, action) => {
      const { col } = action.payload;
      if (state.selectedPiece === null) return;

      const row = findLowestEmptyRow(state.board, col);
      if (row !== -1) {
        const colorIndex = state.topPieces[state.selectedPiece];
        state.fallingPiece = {
          targetRow: row,
          col,
          color: colorIndex,
        };

        // Replace the used piece with a random color
        state.topPieces[state.selectedPiece] = Math.floor(
          Math.random() * COLORS.length
        );
        state.selectedPiece = null;
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
      state.topPieces = shuffleArray([...Array(6).keys()]);
      state.selectedPiece = null;
      state.fallingPiece = null;
    },
  },
});

export const { selectPiece, placePiece, completeFall, resetGame } =
  gameSlice.actions;
export default gameSlice.reducer;
