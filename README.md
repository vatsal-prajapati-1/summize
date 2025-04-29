# Summize AI - PDF Summarization Tool

![Summize Logo](https://via.placeholder.com/150x50?text=Summize+AI)

Summize AI is an intelligent document summarization tool that transforms lengthy PDFs into concise, easy-to-digest summaries using advanced AI technology. Built with Next.js, Clerk authentication, and OpenAI/Gemini LLMs, it provides a seamless, secure, and user-friendly experience for individuals and professionals who need to extract insights from large documents quickly.

---

## Features

- **AI-Powered Summarization:** Generate clear, actionable summaries from PDF documents using state-of-the-art AI models (OpenAI & Gemini)
- **Markdown Export:** Download summaries in markdown format for easy sharing
- **User Dashboard:** Track and manage all your summaries in one place
- **Progress Tracking:** Real-time status updates during summary generation
- **Responsive Design:** Works seamlessly across all devices
- **Authentication:** Secure sign-in/sign-up with Clerk
- **Subscription & Payments:** Stripe integration for Pro features and upload limits

---

## Tech Stack

- **Frontend:** React 19, Next.js 15 (App Router, Server Components)
- **Styling:** Tailwind CSS, Radix UI
- **Authentication:** Clerk
- **AI/LLM:** OpenAI, Google Gemini, LangChain
- **PDF Parsing:** pdf-parse
- **Database:** PostgreSQL (Neon), Prisma (if used)
- **File Uploads:** UploadThing
- **Payments:** Stripe
- **Deployment:** Vercel

---

## How It Works

1. **Sign Up / Sign In** with Clerk
2. **Upload** your PDF document
3. **AI Engine** processes and summarizes the document
4. **Dashboard:** View, manage, and export your summaries
5. **Upgrade:** Subscribe to Pro for unlimited uploads and advanced features

---

## Architecture Overview

- **Monorepo Structure:**
  - `src/app/` - Next.js App Router pages (public, auth, dashboard, upload, API)
  - `src/components/` - Reusable UI and feature components
  - `src/lib/` - Business logic (summaries, user, payments)
  - `src/utils/` - Utility functions and constants
  - `schema.sql` - PostgreSQL schema for users, summaries, and payments
- **Authentication:** Clerk handles user sessions and security
- **Database:** Stores users, summaries, and payment records
- **AI Summarization:** Calls OpenAI/Gemini APIs via server actions
- **Payments:** Stripe for subscription management and limits

---

## Installation

### Prerequisites

- Node.js v16+
- npm or yarn
- PostgreSQL database (Neon or local)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-repo/summize-ai.git
cd summize-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in the required values in .env.local (see below)

# Set up the database
# (If using Neon, use the provided DATABASE_URL. Otherwise, create a local PostgreSQL DB and update the URL.)
# Run schema.sql to create tables and triggers
psql $DATABASE_URL -f schema.sql

# Start the development server
npm run dev
```

### Environment Variables

The following variables are required in `.env.local`:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `UPLOADTHING_TOKEN` - UploadThing API token
- `OPENAI_API_KEY` - OpenAI API key
- `GEMINI_API_KEY` - Google Gemini API key
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `STRIPE_BASIC_PACKAGE`, `STRIPE_PRO_PACKAGE` - Stripe payment links
- `STRIPE_BASIC_PACKAGE_PRICEID`, `STRIPE_PRO_PACKAGE_PRICEID` - Stripe price IDs

---

## Deployment

This project is ready for deployment on [Vercel](https://vercel.com/):

- Push your code to GitHub
- Connect your repo on Vercel
- Set all environment variables in the Vercel dashboard
- Vercel will handle builds and serverless deployment

---

## Usage

- **Sign up** for an account
- **Upload** a PDF to generate a summary
- **View** and **manage** your summaries in the dashboard
- **Export** summaries as markdown
- **Upgrade** to Pro for unlimited uploads

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [OpenAI](https://openai.com/)
- [Google Gemini](https://ai.google/discover/gemini/)
- [Stripe](https://stripe.com/)
- [UploadThing](https://uploadthing.com/)
- [Neon](https://neon.tech/)

---

> _For questions or support, please contact the maintainer or open an issue on GitHub._
