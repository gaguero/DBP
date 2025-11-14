export type CommentRevision = {
  id: string;
  commentId: string;
  previousBody: string;
  previousLinkUrl: string | null;
  previousStatus: string | null;
  statusNote: string | null;
  editedByUserId: string | null;
  editedByName: string | null;
  editedAt: string;
};

export type PageComment = {
  id: string;
  pageId: string;
  elementId: string;
  elementLabel: string | null;
  firstName: string;
  lastName: string;
  body: string;
  linkUrl: string | null;
  status: string;
  createdByUserId: string | null;
  updatedByUserId: string | null;
  createdAt: string;
  updatedAt: string;
  revisions: CommentRevision[];
};

export type CreateCommentInput = {
  elementId: string;
  elementLabel?: string | null;
  firstName: string;
  lastName: string;
  body: string;
  linkUrl?: string | null;
};

export type UpdateCommentInput = {
  commentId: string;
  firstName?: string;
  lastName?: string;
  body?: string;
  linkUrl?: string | null;
  status?: "pending" | "in_progress" | "resolved" | "rejected";
  statusNote?: string;
  elementLabel?: string | null;
  editorFirstName?: string;
  editorLastName?: string;
};
