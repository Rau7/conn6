import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { placePiece, completeFall } from "../store/gameSlice";

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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  padding: 24px;
  background-color: #1a1a1a;
  border-radius: 16px;
  max-width: 600px;
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
  animation: ${(props) => dropAnimation(props.targetRow)} 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  z-index: 1;
  will-change: transform;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;

  &:hover ${Cell} {
    border-color: #404040;
  }
`;

const Board = () => {
  const { board, colors, fallingPiece } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fallingPiece) {
      const timer = setTimeout(() => {
        dispatch(completeFall());
      }, 600); // Match this with animation duration
      return () => clearTimeout(timer);
    }
  }, [fallingPiece, dispatch]);

  const handleColumnClick = (col) => {
    if (!fallingPiece) {
      // Prevent new pieces while one is falling
      dispatch(placePiece({ col }));
    }
  };

  return (
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
  );
};

export default Board;
