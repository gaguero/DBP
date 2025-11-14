"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CreateCommentInput, PageComment, UpdateCommentInput } from "@/components/feedback/types";

type CommentsState = {
  comments: PageComment[];
  isLoading: boolean;
  error: string | null;
  featureAvailable: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isLoading: true,
  error: null,
  featureAvailable: true,
};

async function requestJSON<T>(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (response.status === 404) {
    const error = new Error("feature-disabled");
    (error as Error & { code: string }).code = "feature-disabled";
    throw error;
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return (await response.json()) as T;
}

export function usePageComments(pageId: string) {
  const [state, setState] = useState<CommentsState>(initialState);

  const fetchComments = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await requestJSON<{ comments: PageComment[] }>(`/api/comments/${pageId}`);
      setState({ comments: data.comments, isLoading: false, error: null, featureAvailable: true });
    } catch (error) {
      if ((error as Error & { code?: string }).code === "feature-disabled") {
        setState({ comments: [], isLoading: false, error: null, featureAvailable: false });
        return;
      }
      console.error("Failed to load comments", error);
      setState({
        comments: [],
        isLoading: false,
        error: "We could not load the comments. Try refreshing the page.",
        featureAvailable: true,
      });
    }
  }, [pageId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const createComment = useCallback(
    async (input: CreateCommentInput) => {
      const result = await requestJSON<{ comment: PageComment }>(`/api/comments/${pageId}`, {
        method: "POST",
        body: JSON.stringify(input),
      });
      setState((prev) => ({
        ...prev,
        comments: [result.comment, ...prev.comments],
      }));
      return result.comment;
    },
    [pageId],
  );

  const updateComment = useCallback(
    async (input: UpdateCommentInput) => {
      const result = await requestJSON<{ comment: PageComment }>(`/api/comments/${pageId}/${input.commentId}`, {
        method: "PATCH",
        body: JSON.stringify(input),
      });
      setState((prev) => ({
        ...prev,
        comments: prev.comments.map((comment) => (comment.id === result.comment.id ? result.comment : comment)),
      }));
      return result.comment;
    },
    [pageId],
  );

  return useMemo(
    () => ({
      ...state,
      refresh: fetchComments,
      createComment,
      updateComment,
    }),
    [state, fetchComments, createComment, updateComment],
  );
}
