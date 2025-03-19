import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Extract structured data with </span>
                <span className="block text-primary xl:inline">AI-powered scraping</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Get the data you need without writing complex scrapers. Our AI-powered API
                transforms any webpage into structured JSON data instantly, following your exact
                schema requirements.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/auth/signin">Get Started</Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="#how-it-works">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-gradient-to-r from-primary to-primary/60 sm:h-72 md:h-96 lg:w-full lg:h-full">
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="p-8 max-w-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-sm text-white/80">https://example.com 👉 JSON</div>
                <pre className="mt-2 text-xs text-white/90 overflow-x-auto">
                  {`{
  "title": "Example Page",
  "items": [
    { "name": "Item 1", "price": "$10.99" },
    { "name": "Item 2", "price": "$24.99" },
    { "name": "Item 3", "price": "$5.49" }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
