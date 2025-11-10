/**
 * Undo/Redo Hook
 * Manages history of workflow changes for undo/redo functionality
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type { WorkflowDefinition } from '../types';

interface HistoryState {
  definition: WorkflowDefinition;
  timestamp: number;
}

const MAX_HISTORY_SIZE = 50;

export function useUndoRedo(initialDefinition?: WorkflowDefinition) {
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const isUndoRedoRef = useRef(false);

  // Initialize history with initial definition
  useEffect(() => {
    if (initialDefinition && history.length === 0) {
      const initialState: HistoryState = {
        definition: initialDefinition,
        timestamp: Date.now(),
      };
      setHistory([initialState]);
      setCurrentIndex(0);
    }
  }, [initialDefinition]);

  /**
   * Add a new state to history
   */
  const pushToHistory = useCallback((definition: WorkflowDefinition) => {
    // Don't add to history if we're in the middle of undo/redo
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }

    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(0, currentIndex + 1);
      const newState: HistoryState = {
        definition: JSON.parse(JSON.stringify(definition)), // Deep clone
        timestamp: Date.now(),
      };

      // Limit history size
      const updatedHistory = [...newHistory, newState];
      if (updatedHistory.length > MAX_HISTORY_SIZE) {
        updatedHistory.shift();
        return updatedHistory;
      }

      return updatedHistory;
    });

    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      // Adjust if we exceeded max size
      return Math.min(newIndex, MAX_HISTORY_SIZE - 1);
    });
  }, [currentIndex]);

  /**
   * Undo - Go back one step in history
   */
  const undo = useCallback((): WorkflowDefinition | null => {
    if (currentIndex <= 0) {
      return null; // Can't undo further
    }

    isUndoRedoRef.current = true;
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    
    const previousState = history[newIndex];
    return previousState ? previousState.definition : null;
  }, [currentIndex, history]);

  /**
   * Redo - Go forward one step in history
   */
  const redo = useCallback((): WorkflowDefinition | null => {
    if (currentIndex >= history.length - 1) {
      return null; // Can't redo further
    }

    isUndoRedoRef.current = true;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    
    const nextState = history[newIndex];
    return nextState ? nextState.definition : null;
  }, [currentIndex, history]);

  /**
   * Check if undo is possible
   */
  const canUndo = currentIndex > 0;

  /**
   * Check if redo is possible
   */
  const canRedo = currentIndex < history.length - 1;

  /**
   * Get current state from history
   */
  const getCurrentState = useCallback((): WorkflowDefinition | null => {
    if (currentIndex < 0 || currentIndex >= history.length) {
      return null;
    }
    return history[currentIndex]?.definition || null;
  }, [currentIndex, history]);

  /**
   * Clear history
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  /**
   * Reset history with a new definition
   */
  const resetHistory = useCallback((definition: WorkflowDefinition) => {
    const initialState: HistoryState = {
      definition: JSON.parse(JSON.stringify(definition)), // Deep clone
      timestamp: Date.now(),
    };
    setHistory([initialState]);
    setCurrentIndex(0);
  }, []);

  return {
    pushToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    getCurrentState,
    clearHistory,
    resetHistory,
    historyLength: history.length,
    currentIndex,
  };
}

