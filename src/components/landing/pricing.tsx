'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export function Pricing() {
  const tiers: PricingTier[] = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for testing and small projects',
      features: [
        '100 API calls per month',
        'Basic rate limiting',
        'Standard support',
        'JSON example formatting',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'For developers and growing businesses',
      features: [
        '5,000 API calls per month',
        'Priority rate limiting',
        'Email support',
        'JSON Schema support',
        'Advanced error handling',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale applications and businesses',
      features: [
        'Unlimited API calls',
        'Dedicated infrastructure',
        'Priority support',
        'Custom integration assistance',
        'SLA guarantees',
        'Bulk extraction capabilities',
      ],
      cta: 'Contact Sales',
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include access to the AI Scraper API and
            dashboard.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="mt-12 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 xl:gap-8">
          {tiers.map(tier => (
            <Card
              key={tier.name}
              className={tier.highlighted ? 'border-primary shadow-lg relative' : 'border-gray-200'}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="mt-2 flex items-baseline text-gray-900">
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  {tier.price !== 'Custom' && (
                    <span className="ml-1 text-xl text-gray-500">/mo</span>
                  )}
                </div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {tier.features.map(feature => (
                    <li key={feature} className="flex">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant={tier.highlighted ? 'default' : 'outline'}
                  className="w-full"
                >
                  <Link href="/auth/signin">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 max-w-2xl mx-auto">
            All plans include access to the dashboard, documentation, and API. Need a custom plan?
            Contact us for special requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
