-- Ensure status notes are available for each revision
ALTER TABLE IF EXISTS "PageCommentRevision"
ADD COLUMN IF NOT EXISTS "statusNote" TEXT;

-- Dummy select to keep Prisma satisfied when statement is skipped
SELECT 1;

