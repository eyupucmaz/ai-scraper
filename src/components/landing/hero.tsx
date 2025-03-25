'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-background transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <motion.h1
                className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block xl:inline">Extract structured data with </span>
                <motion.span
                  className="block text-primary xl:inline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  AI-powered scraping
                </motion.span>
              </motion.h1>
              <motion.p
                className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Get the data you need without writing complex scrapers. Our AI-powered API
                transforms any webpage into structured JSON data instantly, following your exact
                schema requirements.
              </motion.p>
              <motion.div
                className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.div
                  className="rounded-md shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild size="lg" className="w-full">
                    <Link href="/auth/signin">Get Started</Link>
                  </Button>
                </motion.div>
                <motion.div
                  className="mt-3 sm:mt-0 sm:ml-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="#how-it-works">Learn More</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <motion.div
          className="h-56 w-full bg-gradient-to-r from-primary to-primary/60 sm:h-72 md:h-96 lg:w-full lg:h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full h-full flex items-center justify-center text-primary-foreground">
            <motion.div
              className="p-8 max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div
                className="bg-background/10 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                whileHover={{
                  y: -5,
                  boxShadow:
                    '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div className="text-sm text-primary-foreground/80">
                  https://example.com 👉 JSON
                </div>
                <pre className="mt-2 text-xs text-primary-foreground/90 overflow-x-auto">
                  {`{
  "title": "Example Page",
  "items": [
    { "name": "Item 1", "price": "$10.99" },
    { "name": "Item 2", "price": "$24.99" },
    { "name": "Item 3", "price": "$5.49" }
  ]
}`}
                </pre>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
