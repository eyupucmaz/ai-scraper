'use client';
import { motion } from 'framer-motion';
import { CheckCircle, Code, Database, Zap } from 'lucide-react';

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
};

function Feature({ icon, title, description, delay = 0 }: FeatureProps) {
  return (
    <motion.div
      className="p-6 border rounded-xl shadow-sm transition-all hover:shadow-md bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Intelligent data extraction made simple
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our API provides powerful features to make web scraping effortless, accurate, and
            scalable.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Zap size={24} />}
            title="AI-Powered Extraction"
            description="Extract data from any website with our intelligent AI system that understands page structures."
            delay={0.1}
          />
          <Feature
            icon={<Database size={24} />}
            title="Structured Output"
            description="Get clean, structured JSON data following your exact schema requirements."
            delay={0.2}
          />
          <Feature
            icon={<Code size={24} />}
            title="Simple API"
            description="Easy-to-use RESTful API that integrates with any tech stack in minutes."
            delay={0.3}
          />
          <Feature
            icon={<CheckCircle size={24} />}
            title="99.9% Accuracy"
            description="Our advanced AI ensures near-perfect data extraction, even from complex websites."
            delay={0.4}
          />
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex items-center rounded-md overflow-hidden border border-primary/30">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#"
                className="px-5 py-2 bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                View Documentation
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#"
                className="px-5 py-2 bg-white text-primary font-medium hover:bg-gray-50 transition-colors"
              >
                Try Demo
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
