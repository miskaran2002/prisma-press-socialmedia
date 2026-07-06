Markdown# Prisma Press Backend

Prisma Press is a modular blog backend built with **Express 5**, **TypeScript**, **Prisma 7.x**, and **PostgreSQL**. It provides a robust and secure API for authentication, user profiles, blog posts, comments, and admin reporting with role-based access control (RBAC).

---

## 🚀 Features

- **Authentication & Security:** JWT-based access and refresh token mechanism with `bcrypt` password hashing.
- **User Management:** Secure registration, profile retrieval, and updates with unique email constraints.
- **Post Management:** Create, read, update, delete (CRUD), search, and filter posts with tag support and view count tracking.
- **Comment System:** Post comments, ownership checks for editing/deleting, and admin moderation features.
- **Role-Based Access Control (RBAC):** Separate permissions for `USER` and `ADMIN` roles.
- **Dashboard Statistics:** Detailed aggregation endpoint for system-wide metrics (Admin only).

---

## 🛠️ Technology Stack

- **Runtime:** Node.js (Development: `tsx` | Production: Compiled JS)
- **Language:** TypeScript (Strict type-checking enabled)
- **Framework:** Express 5
- **ORM:** Prisma 7.x (Client generated in `generated/prisma`)
- **Database:** PostgreSQL (Connected via `@prisma/adapter-pg`)
- **Middleware:** `cors`, `cookie-parser`, JSON & URL-encoded body-parsers

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/prisma_press?schema=public"
APP_URL="http://localhost:5173"

BCRYPT_SALT_ROUNDS=12

JWT_ACCESS_SECRET="your_super_secret_access_key"
JWT_REFRESH_SECRET="your_super_secret_refresh_key"
JWT_ACCESS_EXPIRES_IN="1h"
JWT_REFRESH_EXPIRES_IN="7d"
Note: APP_URL is mandatory to handle CORS origins properly.📦 Getting StartedThis project supports both pnpm and npm package managers.1. Install DependenciesBashpnpm install
# or
npm install
2. Run Database Migrations & Generate Prisma ClientBashpnpm prisma migrate dev
# or
npx prisma migrate dev
3. Start Development ServerBashpnpm dev
# or
npm run dev
4. Build and Run in ProductionBash# Build the TypeScript project
pnpm build

# Start the compiled production server
pnpm start
🔌 API Endpoints SummaryAuthenticationMethodRouteAccessDescriptionPOST/api/auth/loginPublicVerifies credentials, sets HTTP-only cookies, returns tokens.POST/api/auth/refresh-tokenPublicReads refresh cookie and issues a new access token.User ManagementMethodRouteAccessDescriptionPOST/api/users/registerPublicRegisters a new user and profile in a single transaction.GET/api/users/meUSER / ADMINReturns the current logged-in user's profile.PUT/api/users/myprofileUSER / ADMINUpdates the current user's profile details.PostsMethodRouteAccessDescriptionGET/api/postsPublicReturns paginated, filtered, and searchable list of posts.GET/api/posts/statsADMIN OnlyReturns aggregate content, user, and view statistics.GET/api/posts/mypostsUSER / ADMINReturns posts created by the logged-in user.GET/api/posts/:postIdPublicReturns a single post and increments its view count.POST/api/postsUSER / ADMINCreates a new blog post.PATCH/api/posts/:postIdUSER / ADMINUpdates a post (Ownership rules apply).DELETE/api/posts/:postIdUSER / ADMINDeletes a post (Ownership rules apply).CommentsMethodRouteAccessDescriptionGET/api/comments/author/:authorIdPublicLists comments written by a specific author.GET/api/comments/:commentIdPublicReturns a single comment with selected post details.POST/api/commentsUSER / ADMINCreates a comment for a post (Defaults to APPROVED).PATCH/api/comments/:commentIdUSER / ADMINUpdates the current user's own comment.DELETE/api/comments/:commentIdUSER / ADMINDeletes the current user's own comment.PATCH/api/comments/:commentId/moderateADMIN OnlyApproves or Rejects a comment status.📋 API Conventions & RulesGlobal Standard Response ShapeJSON{
  "success": true,
  "statusCode": 200,
  "message": "Request completed successfully",
  "data": {}
}
Protected RequestsProtected routes require the raw token value to be passed directly in the Authorization header:HTTPAuthorization: your_access_token_here
Content-Type: application/json
Key Business & Ownership RulesPost Ownership: Admins can modify/delete any post. Regular users can only modify/delete their own posts and cannot change the isFeatured status.Comment Ownership: Only the comment owner can edit or delete their comment. Only admins have access to the /moderate route.Data Integrity: Deleting a user triggers a cascade delete on their Profile. Deleting a post triggers a cascade delete on all its associated Comments.⚠️ Current Codebase ConstraintsThe authentication middleware strictly expects the raw token in the Authorization header without the Bearer  prefix.Post.authorId and Comment.authorId are stored as string fields rather than explicit relational mapping.No third-party validation libraries (Zod/Joi) or rate-limiting are implemented yet; route inputs rely on manual control.
