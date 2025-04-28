# Summize - AI-Powered PDF Summarization

![Summize Logo](https://via.placeholder.com/150x50?text=Summize+Logo)

Summize is a Next.js application that uses AI (OpenAI and Gemini) to transform lengthy PDF documents into clear, concise summaries. Save hours of reading time by getting the key points from any PDF in seconds.

## Features

- 📄 Upload PDF documents and get AI-generated summaries
- ⚡ Supports both OpenAI and Gemini AI models (fallback mechanism)
- 📝 Clean, formatted summaries with markdown support
- ⏱️ Estimated reading time calculation
- 📥 Download summaries as text files
- 🔍 View original PDF documents
- 🔄 Automatic retry mechanism for API rate limits
- 🎨 Beautiful, responsive UI with animations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **AI Services**: OpenAI, Google Gemini
- **PDF Processing**: PDF-Parse, LangChain
- **Database**: Neon (PostgreSQL)
- **Animation**: Framer Motion
- **UI Components**: Shadcn UI, Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- API keys for:
  - OpenAI
  - Google Gemini
  - Clerk (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/summize.git
cd summize