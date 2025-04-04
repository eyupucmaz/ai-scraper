'use client';

import { Separator } from '@/components/ui/separator';

type Step = {
  number: number;
  title: string;
  description: string;
};

export function HowItWorks() {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Sign up and get API key',
      description:
        'Create an account with GitHub or Google, then create a project to receive your API key and add your Gemini API key.',
    },
    {
      number: 2,
      title: 'Define your JSON structure',
      description:
        'Provide a JSON example or JSON Schema that defines how you want the scraped data to be structured.',
    },
    {
      number: 3,
      title: 'Make API request',
      description:
        'Send a request to our API with the target URL and your desired JSON format. We handle the scraping for you.',
    },
    {
      number: 4,
      title: 'Receive structured data',
      description:
        'Get back clean, structured JSON data that matches your defined format, ready to use in your application.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started with AI Scraper in just a few simple steps. Extract the data you need
            without complex setup.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="mt-12">
          <div className="relative">
            {/* Steps */}
            <div className="relative flex flex-wrap justify-between">
              {steps.map(step => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center mb-8 md:mb-0 w-full sm:w-1/2 md:w-auto px-4"
                >
                  <div className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg ring-4 ring-background">
                    {step.number}
                  </div>
                  <div className="mt-6 text-center max-w-[250px]">
                    <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-20 bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="px-4 py-3 bg-muted flex items-center">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-3 text-foreground text-sm">API Request Example</div>
          </div>
          <div className="p-4 sm:p-6 overflow-x-auto">
            <pre className="text-card-foreground text-sm">{`// Example API request
fetch('https://api.aiscraper.com/scrape', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com/products',
    output_format: {
      type: 'json_example',
      format: {
        products: [
          {
            name: "Example Product",
            price: "$10.99",
            description: "This is a sample product."
          }
        ]
      }
    }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
