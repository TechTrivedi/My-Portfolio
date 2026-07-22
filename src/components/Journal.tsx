import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Article {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  category: string;
  image: string;
  contentDetails?: {
    overview: string;
    sections: {
      icon: string;
      title: string;
      points: string[];
    }[];
    vision: string;
  };
}

const ARTICLES: Article[] = [
  {
    id: 'coffee-cafe-idea',
    title: 'Smart Coffee Café Concept: AI, Automation & Personalization',
    subtitle: 'Combining dual brewing stations, guided customer UX, and AI analytics to build a self-optimizing coffee lab.',
    readTime: '6 min read',
    date: 'Feb 2026',
    category: 'Product Concept',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    contentDetails: {
      overview:
        'This concept goes far beyond a normal café. It focuses on combining hardware automation, interactive AI guidance, and real-time customer personalization to create a self-optimizing coffee lab.',
      sections: [
        {
          icon: '☕',
          title: 'Two Coffee Brewing Stations',
          points: [
            'Inside Brewer: Operated by a barista for premium, custom hand-crafted drinks.',
            'Outside Self-Service Brewer: Customers order and brew coffee independently without entering the café.',
          ],
        },
        {
          icon: '🎯',
          title: 'Guided Customer Experience',
          points: [
            'Replaces random selection with an interactive guided brewing journey.',
            'Walks customers through roast, milk, and flavor combinations to make the process simple & enjoyable.',
          ],
        },
        {
          icon: '🤖',
          title: 'AI-Powered Analytics',
          points: [
            'Analyzes preferred brewing methods and popular ingredient ratios.',
            'Tracks real-time customer satisfaction metrics and seasonal trends over time.',
          ],
        },
        {
          icon: '📈',
          title: 'Data-Driven Goals',
          points: [
            'Dynamically improves the menu based on actual consumption data.',
            'Increases customer satisfaction, boosts sales, and continuously optimizes recipes.',
          ],
        },
      ],
      vision:
        'The overall vision is to make the café feel like a smart coffee lab where every single order helps improve future recommendations and products.',
    },
  },
  {
    id: 'power-bi-dashboards',
    title: 'Building Better Dashboards with Power BI',
    subtitle: 'Designing dashboards people actually use with high-impact visualizations and clean layouts.',
    readTime: '5 min read',
    date: 'Jan 2026',
    category: 'Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    contentDetails: {
      overview: 'Key principles for structuring Power BI reports that business stakeholders can digest effortlessly.',
      sections: [
        {
          icon: '📊',
          title: 'Design Principles',
          points: [
            'Prioritize key metrics at the top using KPI cards.',
            'Use consistent dark themes and accent colors for data highlighting.',
          ],
        },
      ],
      vision: 'Transform raw data into clear, actionable decision-making tools.',
    },
  },
  {
    id: 'cropify-lessons',
    title: 'Lessons from Building Cropify (ML & AI Chatbot Engineering)',
    subtitle: 'Key learnings as the ML & AI Chatbot Engineer on a collaborative precision agriculture group project.',
    readTime: '7 min read',
    date: 'Dec 2025',
    category: 'Machine Learning & AI',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=400&q=80',
    contentDetails: {
      overview: 'As the ML & AI Chatbot Engineer on the CROPIFY group project, I focused on designing intelligence systems—from building predictive crop recommendation models to engineering an interactive AI agricultural assistant.',
      sections: [
        {
          icon: '🤖',
          title: 'AI Chatbot Engineering',
          points: [
            'Engineered an intuitive AI chatbot to translate complex soil metrics into natural language guidance for farmers.',
            'Integrated conversational intent recognition for real-time agricultural Q&A and instant decision support.',
          ],
        },
        {
          icon: '🌾',
          title: 'ML Model Pipeline & Optimization',
          points: [
            'Trained Scikit-Learn regression & classification models on soil NPK, pH, and real-time climate data.',
            'Preprocessed and normalized noisy agricultural sensor vectors for robust yield prediction.',
          ],
        },
        {
          icon: '👥',
          title: 'Group Integration & Team Collaboration',
          points: [
            'Worked closely with full-stack team members to connect ML inference APIs seamlessly into the core UI.',
            'Ensured real-time chatbot response times and reliable model outputs under high concurrency.',
          ],
        },
      ],
      vision: 'Collaboration combined with domain-tailored AI can turn complex data science into intuitive tools that solve real-world problems.',
    },
  },
];

export const Journal: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="journal" className="bg-transparent py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal &amp; Concepts
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-text-primary mb-3">
              Recent <span className="font-display italic font-normal">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-muted text-sm md:text-base max-w-md">
              Technical articles, product concepts, and observations on AI, automation, and analytics.
            </p>
          </div>

          {/* Desktop "View all" button */}
          <a
            href="https://github.com/TechTrivedi"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 group relative p-[1px] rounded-full overflow-hidden self-start md:self-auto"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient-border transition-opacity duration-300" />
            <span className="rounded-full text-xs font-medium px-5 py-2.5 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-colors duration-200">
              View all articles <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </motion.div>

        {/* Journal Entries List */}
        <div className="flex flex-col gap-4">
          {ARTICLES.map((article, idx) => (
            <motion.div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-[32px] sm:rounded-full bg-surface/40 hover:bg-surface border border-stroke/70 hover:border-white/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                {/* Thumbnail Image */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke group-hover:border-white/30 transition-colors">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Article Info */}
                <div className="flex flex-col">
                  <span className="text-[11px] text-muted uppercase tracking-wider mb-1 font-medium flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-[10px]">
                      {article.category}
                    </span>
                    &bull; {article.date}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-normal text-text-primary group-hover:text-white transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-xs text-muted/80 font-light hidden md:inline-block">
                    {article.subtitle}
                  </span>
                </div>
              </div>

              {/* Right Side: Read time & Arrow */}
              <div className="flex items-center gap-4 self-end sm:self-auto shrink-0 pl-16 sm:pl-0">
                <span className="text-xs text-muted font-medium bg-stroke/30 px-3 py-1 rounded-full">
                  {article.readTime}
                </span>
                <div className="w-9 h-9 rounded-full bg-surface group-hover:bg-text-primary text-text-primary group-hover:text-bg border border-stroke flex items-center justify-center text-sm transition-all duration-300 group-hover:rotate-45">
                  ↗
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Article Flashcard Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 my-auto cursor-default flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-colors text-sm"
                aria-label="Close Flashcard"
              >
                ✕
              </button>

              {/* Top Banner & Category */}
              <div className="flex items-center justify-between border-b border-stroke/60 pb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-muted font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Flashcard &bull; {selectedArticle.category}
                </span>
                <span className="text-xs text-muted font-medium bg-stroke/30 px-3 py-1 rounded-full">
                  {selectedArticle.readTime}
                </span>
              </div>

              {/* Title & Overview */}
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-text-primary tracking-tight mb-2">
                  {selectedArticle.title}
                </h3>
                {selectedArticle.contentDetails && (
                  <p className="text-muted text-xs md:text-sm leading-relaxed bg-bg/40 p-4 rounded-2xl border border-stroke/50">
                    {selectedArticle.contentDetails.overview}
                  </p>
                )}
              </div>

              {/* Structured Flashcard Sections */}
              {selectedArticle.contentDetails?.sections && (
                <div className="flex flex-col gap-4">
                  {selectedArticle.contentDetails.sections.map((sec, i) => (
                    <div key={i} className="bg-bg/50 border border-stroke/60 rounded-2xl p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 font-medium text-sm text-text-primary">
                        <span className="text-base">{sec.icon}</span>
                        <h4>{sec.title}</h4>
                      </div>
                      <ul className="flex flex-col gap-1.5 pl-6 text-xs text-muted list-disc">
                        {sec.points.map((pt, j) => (
                          <li key={j} className="leading-relaxed">{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Vision Footer Box */}
              {selectedArticle.contentDetails?.vision && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs leading-relaxed flex items-start gap-3">
                  <span className="text-base shrink-0">💡</span>
                  <div>
                    <span className="font-semibold block mb-0.5 text-emerald-200 uppercase tracking-wider text-[10px]">
                      Core Vision
                    </span>
                    {selectedArticle.contentDetails.vision}
                  </div>
                </div>
              )}

              {/* Footer Bar */}
              <div className="flex justify-between items-center text-[11px] text-muted border-t border-stroke/60 pt-4">
                <span>Article Flashcard Note</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-1.5 rounded-full bg-text-primary text-bg font-medium hover:bg-white transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
