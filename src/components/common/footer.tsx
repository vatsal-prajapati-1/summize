import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200/50 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Summize</h3>
            <p className="text-base md:text-lg text-gray-600 max-w-md">
              AI-powered document summarization to help you save time and focus on what matters.
            </p>
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Quick Links</h3>
            <div className="flex flex-col space-y-1 md:space-y-2">
              <Link href="/#pricing" className="text-sm md:text-base text-gray-600 hover:text-rose-500 transition-colors">
                Pricing
              </Link>
              <Link href="/dashboard" className="text-sm md:text-base text-gray-600 hover:text-rose-500 transition-colors">
                Your Summaries
              </Link>
              <Link href="/upload" className="text-sm md:text-base text-gray-600 hover:text-rose-500 transition-colors">
                Upload PDF
              </Link>
            </div>
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Connect</h3>
            <div className="flex space-x-3 md:space-x-4">
              <Link href="https://github.com" className="text-gray-600 hover:text-rose-500 transition-colors">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-600 hover:text-rose-500 transition-colors">
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-600 hover:text-rose-500 transition-colors">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-gray-200/50 text-center text-sm md:text-base text-gray-500">
          <p>© {new Date().getFullYear()} Summize. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
