import { db } from "../src/lib/db";
import { stories } from "../src/content/stories";
import bcrypt from "bcryptjs";

async function migratePosts() {
  console.log("Starting migration...");

  // Create admin user if it doesn't exist
  const adminEmail = process.env.ADMIN_EMAIL || "admin@dolphinblueparadise.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";

  const existingUser = await db.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await db.user.create({
      data: {
        email: adminEmail,
        name: "Admin",
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  // Migrate stories to blog posts
  for (const story of stories) {
    // Check if post already exists
    const existing = await db.blogPost.findUnique({
      where: { slug: story.slug },
    });

    if (existing) {
      console.log(`Post ${story.slug} already exists, skipping...`);
      continue;
    }

    // Convert content array to content blocks
    const contentBlocks = story.content.map((paragraph) => ({
      type: "paragraph" as const,
      id: Math.random().toString(36).substring(7),
      content: paragraph,
    }));

    // Parse date - try to parse the date string
    let date = new Date();
    try {
      // Try parsing the date string (e.g., "Jan 8, 2025")
      date = new Date(story.date);
      if (isNaN(date.getTime())) {
        date = new Date(); // Fallback to current date
      }
    } catch {
      date = new Date();
    }

    await db.blogPost.create({
      data: {
        slug: story.slug,
        title: story.title,
        excerpt: story.excerpt,
        date: date,
        image: story.image,
        author: story.author,
        category: story.category,
        readingTime: story.readingTime,
        locale: "en",
        published: true,
        contentBlocks: contentBlocks,
      },
    });

    console.log(`Migrated post: ${story.slug}`);
  }

  console.log("Migration completed!");
}

// Run migration
migratePosts()
  .then(() => {
    console.log("Migration script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });

