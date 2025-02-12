import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { placePiece, completeFall, selectPiece } from "../store/gameSlice";

const dropAnimation = (targetRow) => keyframes`
  0% {
    transform: translateY(-500%);
    opacity: 0.7;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(${targetRow * 100}%);
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 12px;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 12px;
  background-color: #1a1a1a;
  border-radius: 16px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const TopPiece = styled.div`
  aspect-ratio: 1;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid ${(props) => (props.isSelected ? "#fff" : "#2a2a2a")};
  transform: ${(props) => (props.isSelected ? "scale(1.1)" : "scale(1)")};
  box-shadow: ${(props) =>
    props.isSelected ? "0 0 20px rgba(255, 255, 255, 0.3)" : "none"};

  &:hover {
    transform: scale(1.05);
    border-color: #404040;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 16px;
  background-color: #1a1a1a;
  border-radius: 16px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const Cell = styled.div`
  aspect-ratio: 1;
  background-color: ${(props) => props.color || "#333"};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid #2a2a2a;
  position: relative;
  overflow: visible;

  &:hover {
    transform: scale(0.95);
    border-color: #404040;
  }
`;

const FallingPiece = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  border: 3px solid #2a2a2a;
  animation: ${(props) => dropAnimation(props.targetRow)} 600ms
    cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  z-index: 1;
  will-change: transform;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  &:hover ${Cell} {
    border-color: #404040;
  }
`;

const Board = () => {
  const { board, colors, fallingPiece, topPieces, selectedPiece } = useSelector(
    (state) => state.game
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (fallingPiece) {
      const timer = setTimeout(() => {
        dispatch(completeFall());
      }, 600); // Match this with animation duration
      return () => clearTimeout(timer);
    }
  }, [fallingPiece, dispatch]);

  const handlePieceSelect = (index) => {
    dispatch(selectPiece(index));
  };

  const handleColumnClick = (col) => {
    if (!fallingPiece && selectedPiece !== null) {
      // Prevent new pieces while one is falling
      dispatch(placePiece({ col }));
    }
  };

  return (
    <GameContainer>
      <TopRow>
        {topPieces.map((colorIndex, index) => (
          <TopPiece
            key={index}
            color={colors[colorIndex]}
            isSelected={selectedPiece === index}
            onClick={() => handlePieceSelect(index)}
          />
        ))}
      </TopRow>
      <GridContainer>
        {Array(6)
          .fill(null)
          .map((_, col) => (
            <Column key={col} onClick={() => handleColumnClick(col)}>
              {Array(6)
                .fill(null)
                .map((_, row) => (
                  <Cell
                    key={`${row}-${col}`}
                    color={
                      board[row][col] !== null
                        ? colors[board[row][col]]
                        : undefined
                    }
                  >
                    {fallingPiece &&
                      fallingPiece.col === col &&
                      fallingPiece.targetRow === row && (
                        <FallingPiece
                          color={colors[fallingPiece.color]}
                          targetRow={fallingPiece.targetRow}
                        />
                      )}
                  </Cell>
                ))}
            </Column>
          ))}
      </GridContainer>
    </GameContainer>
  );
};

export default Board;
