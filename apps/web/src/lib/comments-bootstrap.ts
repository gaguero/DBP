import type { PrismaClient } from "@prisma/client";

const CHECK_TABLES_SQL = `
SELECT
  EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'PageComment'
  ) AS "hasComments",
  EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'PageCommentRevision'
  ) AS "hasRevisions";
`;

const BOOTSTRAP_QUERIES: readonly string[] = [
  `
  CREATE TABLE IF NOT EXISTS "PageComment" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "elementLabel" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "linkUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdByUserId" TEXT,
    "updatedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PageComment_pkey" PRIMARY KEY ("id")
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS "PageCommentRevision" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "previousBody" TEXT NOT NULL,
    "previousLinkUrl" TEXT,
    "previousStatus" TEXT,
    "editedByUserId" TEXT,
    "editedByName" TEXT,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PageCommentRevision_pkey" PRIMARY KEY ("id")
  );
  `,
  `CREATE INDEX IF NOT EXISTS "PageComment_pageId_idx" ON "PageComment"("pageId");`,
  `CREATE INDEX IF NOT EXISTS "PageComment_pageId_elementId_idx" ON "PageComment"("pageId", "elementId");`,
  `CREATE INDEX IF NOT EXISTS "PageComment_status_idx" ON "PageComment"("status");`,
  `CREATE INDEX IF NOT EXISTS "PageCommentRevision_commentId_idx" ON "PageCommentRevision"("commentId");`,
  `CREATE INDEX IF NOT EXISTS "PageCommentRevision_editedAt_idx" ON "PageCommentRevision"("editedAt");`,
  `
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.table_constraints
      WHERE constraint_schema = 'public'
        AND constraint_name = 'PageCommentRevision_commentId_fkey'
    ) THEN
      ALTER TABLE "PageCommentRevision"
        ADD CONSTRAINT "PageCommentRevision_commentId_fkey"
        FOREIGN KEY ("commentId") REFERENCES "PageComment"("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
    END IF;
  END $$;
  `,
];

let bootstrapPromise: Promise<void> | null = null;

export function ensureCommentTables(prisma: PrismaClient) {
  if (!bootstrapPromise) {
    bootstrapPromise = bootstrap(prisma);
  }

  return bootstrapPromise;
}

async function bootstrap(prisma: PrismaClient) {
  const result = (await prisma.$queryRawUnsafe<
    Array<{ hasComments: boolean; hasRevisions: boolean }>
  >(CHECK_TABLES_SQL))?.[0];

  if (result?.hasComments && result?.hasRevisions) {
    return;
  }

  for (const query of BOOTSTRAP_QUERIES) {
    await prisma.$executeRawUnsafe(query);
  }
}

