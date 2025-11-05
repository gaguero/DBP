import { requireAuth } from "@/lib/auth-utils";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-bold text-gray-900">Blog Admin</h1>
              </div>
              <div className="ml-6 flex space-x-8">
                <a
                  href="/admin/blog"
                  className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Posts
                </a>
                <a
                  href="/admin/blog/new"
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  New Post
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-700">{session.user?.email}</span>
              <a
                href="/api/auth/signout"
                className="ml-4 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

