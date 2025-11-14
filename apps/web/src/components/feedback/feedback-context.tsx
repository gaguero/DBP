"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { usePageComments } from "@/components/feedback/use-page-comments";
import { CreateCommentInput, PageComment, UpdateCommentInput } from "@/components/feedback/types";

type FeedbackUserProfile = {
  firstName: string;
  lastName: string;
};

type ActiveFormState =
  | {
      mode: "create";
      elementId: string;
      elementLabel: string | null;
    }
  | {
      mode: "edit";
      comment: PageComment;
    }
  | null;

type FeedbackContextValue = {
  pageId: string;
  selectionMode: boolean;
  setSelectionMode: (value: boolean) => void;
  openCreateForm: (elementId: string, elementLabel: string | null) => void;
  openEditForm: (comment: PageComment) => void;
  closeForm: () => void;
  activeForm: ActiveFormState;
  comments: PageComment[];
  isLoading: boolean;
  error: string | null;
  featureAvailable: boolean;
  createComment: (input: CreateCommentInput) => Promise<PageComment | null>;
  updateComment: (input: UpdateCommentInput) => Promise<PageComment | null>;
  refresh: () => Promise<void>;
  userProfile: FeedbackUserProfile | null;
  profileReady: boolean;
  saveUserProfile: (profile: FeedbackUserProfile) => void;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export const FEEDBACK_PROFILE_STORAGE_KEY = "dbp-feedback-profile";

export function FeedbackProvider({ pageId, children }: { pageId: string; children: React.ReactNode }) {
  const [selectionMode, setSelectionMode] = useState(false);
  const [activeForm, setActiveForm] = useState<ActiveFormState>(null);
  const [userProfile, setUserProfile] = useState<FeedbackUserProfile | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const { comments, isLoading, error, featureAvailable, refresh, createComment, updateComment } =
    usePageComments(pageId);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(FEEDBACK_PROFILE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FeedbackUserProfile;
        if (parsed.firstName && parsed.lastName) {
          setUserProfile(parsed);
        }
      }
    } catch (err) {
      console.warn("Unable to read stored feedback profile", err);
    } finally {
      setProfileReady(true);
    }
  }, []);

  function persistProfile(profile: FeedbackUserProfile) {
    setUserProfile(profile);
    try {
      window.localStorage.setItem(FEEDBACK_PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (err) {
      console.warn("Unable to persist feedback profile", err);
    }
  }

  const contextValue = useMemo<FeedbackContextValue>(() => {
    return {
      pageId,
      selectionMode,
      setSelectionMode,
      activeForm,
      openCreateForm(elementId, elementLabel) {
        setActiveForm({ mode: "create", elementId, elementLabel });
      },
      openEditForm(comment) {
        setActiveForm({ mode: "edit", comment });
      },
      closeForm() {
        setActiveForm(null);
      },
      comments,
      isLoading,
      error,
      featureAvailable,
      async createComment(input) {
        try {
          const comment = await createComment(input);
          setActiveForm(null);
          return comment;
        } catch (err) {
          console.error("Failed to create comment", err);
          return null;
        }
      },
      async updateComment(input) {
        try {
          const comment = await updateComment(input);
          setActiveForm(null);
          return comment;
        } catch (err) {
          console.error("Failed to update comment", err);
          return null;
        }
      },
      refresh,
      userProfile,
      profileReady,
      saveUserProfile: persistProfile,
    };
  }, [
    activeForm,
    comments,
    createComment,
    error,
    featureAvailable,
    isLoading,
    pageId,
    refresh,
    selectionMode,
    updateComment,
    userProfile,
    profileReady,
  ]);

  return <FeedbackContext.Provider value={contextValue}>{children}</FeedbackContext.Provider>;
}

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedbackContext must be used within FeedbackProvider");
  }
  return context;
}

export function useOptionalFeedbackContext() {
  return useContext(FeedbackContext);
}
