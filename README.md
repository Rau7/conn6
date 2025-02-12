# Connect 6

Connect 6 is a modern twist on the classic Connect 4 game, featuring a 6x6 grid and 6 different colored pieces.

## Game Rules

1. **Objective**: Create patterns or matches with same-colored pieces (specific win conditions to be implemented)

2. **Gameplay**:
   - Select a colored piece from the top row
   - Click on any column to drop the selected piece
   - The piece will fall to the lowest available position in that column
   - After placing a piece, it will be replaced with a random colored piece in the top row

3. **Piece Selection**:
   - You must select a piece before you can make a move
   - Selected pieces are highlighted with a glowing effect
   - Each piece in the top row is replaced with a random color after being used

4. **Game Flow**:
   - Players take turns selecting and dropping pieces
   - Pieces fall with a smooth animation
   - The game continues until a winning condition is met or the board is full

## Technical Details

### Built With
- React
- Redux for state management
- Styled Components for styling

### Project Structure
- `src/components/Board.js`: Main game board component
- `src/store/gameSlice.js`: Game state management
- `src/store/store.js`: Redux store configuration
- `src/App.js`: Root application component

### Features
- Responsive grid layout
- Smooth falling animations
- Interactive piece selection
- Random color generation for new pieces

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Future Enhancements
- Implement win conditions
- Add score tracking
- Add multiplayer support
- Add game reset functionality
- Add difficulty levels
