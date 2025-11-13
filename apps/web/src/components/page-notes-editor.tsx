"use client";

import { useState, useEffect } from "react";

interface PageNotesEditorProps {
  pageId: string;
}

export function PageNotesEditor({ pageId }: PageNotesEditorProps) {
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const storageKey = `page-notes-${pageId}`;

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [storageKey]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes) {
      localStorage.setItem(storageKey, notes);
    }
  }, [notes, storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, notes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const savedNotes = localStorage.getItem(storageKey) || "";
    setNotes(savedNotes);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <p className="text-xs text-blue-800 font-medium mb-2">📝 Yuh&apos;s Notes:</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full min-h-[100px] p-3 text-sm text-blue-900 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          placeholder="Type your comments or thoughts here..."
          autoFocus
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (notes) {
    return (
      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-xs text-blue-800 font-medium">📝 Yuh&apos;s Notes:</p>
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Edit
          </button>
        </div>
        <p className="text-xs text-blue-700 whitespace-pre-wrap">{notes}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 border-l-4 border-gray-300 rounded">
      <p className="text-xs text-gray-600 italic mb-3">
        💡 Yuh: Click below to add your comments or thoughts
      </p>
      <button
        onClick={() => setIsEditing(true)}
        className="w-full min-h-[100px] p-3 text-sm text-gray-500 border-2 border-dashed border-gray-300 rounded hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left"
      >
        Click here to add your notes...
      </button>
    </div>
  );
}

