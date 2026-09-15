import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  HeartHandshake, 
  ArrowRight,
  FileText,
  Compass,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';

interface BiographyProps {
  profile: UserProfile;
  onOpenResume: () => void;
}

export const Biography: React.FC<BiographyProps> = ({ profile, onOpenResume }) => {
  const corePillars = [
    {
      icon: Cpu,
      title: 'Full-Stack Product Engineering',
      description: 'Building complete products end to end — React front-ends, Node.js & Express REST APIs, and JWT-secured authentication flows.'
    },
    {
      icon: Layers,
      title: 'AI/LLM & Knowledge Graphs',
      description: 'Integrating the Google Gemini API with GraphRAG retrieval over Neo4j to deliver grounded, citation-verified answers.'
    },
    {
      icon: ShieldCheck,
      title: 'Cloud, DevOps & Delivery',
      description: 'Shipping to production with AWS, Docker & Docker Compose, Linux, and GitHub Actions CI pipelines that lint and test automatically.'
    },
    {
      icon: HeartHandshake,
      title: 'Considered, Accessible Interfaces',
      description: 'Accessible, responsive UIs with clean state management (Zustand/Redux) and attention to re-render performance.'
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 md:py-28 border-t border-line relative overflow-hidden text-left"
    >
      <div className="container-page">
        
        {/* Section Editorial Header */}
        <div className="section-rule">
          <div className="flex items-center gap-3">
            <span className="type-eyebrow font-medium">
              [ 03 / Philosophy & Background ]
            </span>
            <span className="type-meta hidden sm:inline">
              Core tenets & engineering foundation
            </span>
          </div>
          <span className="type-meta">
            Est. 2024
          </span>
        </div>

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14 space-y-3"
        >
          <h2 className="type-section">
            Building reliable software with curiosity, craft, and deliberate purpose.
          </h2>
          <p className="type-body-sm">
            Bridging full-stack engineering with applied AI and cloud-native tooling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Biography Narrative (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="max-w-2xl space-y-4">
              {profile.bioParagraphs.map((paragraph, index) => (
                <p key={index} className="type-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Areas of Focus (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="card p-6 h-full flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 type-label text-accent font-medium">
                  <Compass className="w-4 h-4" aria-hidden="true" />
                  <span>Areas of focus</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {profile.interests.map((interest, idx) => (
                    <span key={idx} className="chip px-2.5 py-1 text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-line flex items-center gap-2 type-body-sm">
                <Briefcase className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                <span>{profile.availability}. Open to internships, full-time and remote roles.</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Engineering Tenets — full-width band so it doesn't leave a tall empty column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 border-t border-line pt-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="font-sans text-sm font-semibold text-ink tracking-normal">
              Engineering Tenets
            </h3>
            <button
              onClick={onOpenResume}
              className="btn btn-sm btn-outline group"
            >
              <FileText className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span className="font-medium">View Resume</span>
              <ArrowRight className="w-3.5 h-3.5 text-faint group-hover:text-ink transition-colors" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {corePillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div key={idx} className="card card-hover p-5 space-y-3">
                  <div className="p-2 rounded-lg bg-surface-2 text-accent w-fit border border-line">
                    <IconComponent className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-base text-ink font-normal tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="type-body-sm">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
