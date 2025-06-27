# Photo Booth

A Next.js application for uploading and managing photos with team-based organization.

## Features

- **Photo Upload**: Upload multiple images with drag-and-drop support
- **Team Management**: Organize photos by teams
- **Categories**: Categorize photos for better organization
- **Tags**: Add multiple tags to photos for easy searching
- **Azure Blob Storage**: Secure cloud storage for uploaded images
- **Database**: PostgreSQL with Drizzle ORM for data persistence

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Azure Storage Account (for image storage)

### Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/photo_booth"
AZURE_STORAGE_CONNECTION_STRING="your_azure_storage_connection_string"
```

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up the database:
   ```bash
   pnpm migrate
   ```

3. Seed the database with sample data:
   ```bash
   pnpm seed
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Upload Feature

The upload page (`/upload`) provides a comprehensive form for uploading photos with the following features:

### Form Fields

- **Multiple Image Upload**: Drag and drop or click to select multiple images
- **Team Selection**: Choose from available teams
- **Tags**: Add multiple tags (press Enter to add each tag)
- **Category**: Select a category for the photos
- **Caption**: Optional caption for the photos

### Features

- **Image Previews**: See thumbnails of selected images before upload
- **Form Validation**: Client-side validation with error messages
- **Progress Feedback**: Loading states and success/error messages
- **Responsive Design**: Works on desktop and mobile devices

### Upload Process

1. Select multiple images using the file picker or drag-and-drop
2. Choose a team from the dropdown
3. Add tags by typing and pressing Enter
4. Select a category
5. Optionally add a caption
6. Click "Upload Photos" to submit

The photos will be:
- Uploaded to Azure Blob Storage
- Stored in the database with metadata
- Set to "pending" status for review

## Database Schema

### Teams
- `id`: Primary key
- `name`: Team name (unique)

### Categories
- `id`: Primary key
- `name`: Category name (unique)

### Photos
- `id`: Primary key
- `photoUrl`: URL to the uploaded image
- `status`: Photo status (pending/approved/rejected)
- `teamId`: Reference to team
- `tags`: Array of tags
- `categoryId`: Reference to category
- `caption`: Optional caption
- `isFeatured`: Featured flag
- `metadata`: JSON metadata (original filename, upload date, etc.)

## Development

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm generate`: Generate database migrations
- `pnpm migrate`: Run database migrations
- `pnpm studio`: Open Drizzle Studio
- `pnpm seed`: Seed database with sample data

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: Azure Blob Storage
- **Icons**: Lucide React

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
