import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Twitter, 
  MapPin, 
  MessageSquare, 
  Clock, 
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';

interface ContactSectionProps {
  profile: UserProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopyEmail = () => {
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Please provide a message.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 800);
  };

  return (
    <section 
      id="contact" 
      className="py-20 md:py-28 border-t border-[#E5DFD6] relative overflow-hidden text-left"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Editorial Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5DFD6]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#C88A58] tracking-wider uppercase font-medium">
              [ 06 / INITIATE DISPATCH ]
            </span>
            <span className="text-xs font-mono text-[#80776C] hidden sm:inline">
              DIRECT INQUIRIES & OPPORTUNITIES
            </span>
          </div>
          <span className="text-xs font-mono text-[#80776C]">
            RESPONSE &lt; 24H
          </span>
        </div>

        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-12 space-y-2"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#161514] tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-sm text-[#5C564D] font-sans">
            Internships, full-time roles, collaborations, or just a good technical conversation. Reach out directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Info (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            
            {/* Primary Email Card */}
            <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-[#FAF7F2] text-[#C88A58] border border-[#E5DFD6]">
                  <Mail className="w-4 h-4" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  id="copy-email-btn"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono text-[#5C564D] hover:text-[#161514] bg-[#FAF7F2] hover:bg-[#EBE6DC] border border-[#E5DFD6] transition-colors cursor-pointer shadow-2xs"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-[#C88A58]" />
                      <span className="text-[#C88A58] font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-xs font-mono text-[#80776C] uppercase tracking-wider">Direct Channel</h3>
                <a
                  href={`mailto:${profile.email}`}
                  id="contact-email-link"
                  className="font-serif text-xl text-[#161514] hover:text-[#C88A58] block truncate mt-1 tracking-tight transition-colors"
                >
                  {profile.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#80776C] pt-2 border-t border-[#E5DFD6] font-mono">
                <Clock className="w-3.5 h-3.5 text-[#C88A58]" />
                <span>Response time: within 24–48 hours</span>
              </div>
            </div>

            {/* Professional Profiles Card */}
            <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] space-y-3 shadow-2xs">
              <h3 className="text-xs font-mono text-[#80776C] uppercase tracking-wider font-medium">
                Profiles & Repositories
              </h3>

              <div className="space-y-2">
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-social-github"
                    className="flex items-center justify-between p-3 rounded-lg bg-[#FAF7F2] hover:bg-[#EBE6DC] border border-[#E5DFD6] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4 text-[#80776C] group-hover:text-[#161514]" />
                      <div>
                        <div className="text-xs font-sans font-medium text-[#161514]">GitHub</div>
                        <div className="text-[11px] text-[#80776C]">Open-source repos & tools</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#80776C] group-hover:text-[#C88A58] transition-colors" />
                  </a>
                )}

                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-social-linkedin"
                    className="flex items-center justify-between p-3 rounded-lg bg-[#FAF7F2] hover:bg-[#EBE6DC] border border-[#E5DFD6] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4 text-[#80776C] group-hover:text-[#161514]" />
                      <div>
                        <div className="text-xs font-sans font-medium text-[#161514]">LinkedIn</div>
                        <div className="text-[11px] text-[#80776C]">Professional network</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#80776C] group-hover:text-[#C88A58] transition-colors" />
                  </a>
                )}

                {profile.socialLinks.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-social-twitter"
                    className="flex items-center justify-between p-3 rounded-lg bg-[#FAF7F2] hover:bg-[#EBE6DC] border border-[#E5DFD6] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Twitter className="w-4 h-4 text-[#80776C] group-hover:text-[#161514]" />
                      <div>
                        <div className="text-xs font-sans font-medium text-[#161514]">Twitter / X</div>
                        <div className="text-[11px] text-[#80776C]">Technical commentary</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#80776C] group-hover:text-[#C88A58] transition-colors" />
                  </a>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] text-xs text-[#5C564D] flex items-start gap-2.5 font-sans shadow-2xs">
              <MapPin className="w-4 h-4 text-[#C88A58] shrink-0 mt-0.5" />
              <span>Based in <strong className="text-[#161514] font-medium">{profile.location}</strong>. Open to internships, full-time roles, and remote opportunities.</span>
            </div>

          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-xl bg-[#FFFFFF] border border-[#E5DFD6] shadow-2xs">
              
              <h3 className="font-serif text-2xl text-[#161514] font-normal tracking-tight mb-1">
                Dispatch Message
              </h3>
              <p className="text-xs text-[#5C564D] font-sans mb-6">
                Fill out the fields below to initiate secure communications.
              </p>

              {submitSuccess && (
                <div 
                  id="contact-success-banner"
                  className="mb-6 p-3.5 rounded-lg bg-[#FAF7F2] border border-[#C88A58]/50 text-[#161514] text-xs flex items-start gap-2.5 shadow-2xs"
                >
                  <Check className="w-4 h-4 text-[#C88A58] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-medium block text-[#161514]">Message dispatched successfully.</strong>
                    <span className="text-[#5C564D]">I will respond shortly to {formData.email || 'your email'}.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-form-name"
                      className="block text-xs font-mono text-[#80776C] uppercase tracking-wider"
                    >
                      Name <span className="text-[#C88A58]">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-form-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className={`w-full px-3 py-2 rounded-lg text-xs font-sans bg-[#FAF7F2] border ${
                        errors.name ? 'border-rose-500' : 'border-[#E5DFD6] focus:border-[#C88A58]'
                      } text-[#161514] placeholder-[#80776C] focus:bg-[#FFFFFF] focus:outline-hidden transition-colors`}
                    />
                    {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-form-email"
                      className="block text-xs font-mono text-[#80776C] uppercase tracking-wider"
                    >
                      Email <span className="text-[#C88A58]">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-form-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className={`w-full px-3 py-2 rounded-lg text-xs font-sans bg-[#FAF7F2] border ${
                        errors.email ? 'border-rose-500' : 'border-[#E5DFD6] focus:border-[#C88A58]'
                      } text-[#161514] placeholder-[#80776C] focus:bg-[#FFFFFF] focus:outline-hidden transition-colors`}
                    />
                    {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="contact-form-subject"
                    className="block text-xs font-mono text-[#80776C] uppercase tracking-wider"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-form-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project inquiry / Collaboration"
                    className="w-full px-3 py-2 rounded-lg text-xs font-sans bg-[#FAF7F2] border border-[#E5DFD6] text-[#161514] placeholder-[#80776C] focus:border-[#C88A58] focus:bg-[#FFFFFF] focus:outline-hidden transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="contact-form-message"
                    className="block text-xs font-mono text-[#80776C] uppercase tracking-wider"
                  >
                    Message <span className="text-[#C88A58]">*</span>
                  </label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, role, or questions..."
                    className={`w-full px-3 py-2 rounded-lg text-xs font-sans bg-[#FAF7F2] border ${
                      errors.message ? 'border-rose-500' : 'border-[#E5DFD6] focus:border-[#C88A58]'
                    } text-[#161514] placeholder-[#80776C] focus:bg-[#FFFFFF] focus:outline-hidden transition-colors`}
                  />
                  {errors.message && <p className="text-xs text-rose-500">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-form-submit-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#161514] hover:bg-[#2C2925] text-[#FAF8F5] font-sans font-medium text-xs disabled:opacity-50 transition-colors cursor-pointer shadow-xs"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-zinc-200/40 border-t-zinc-200 rounded-full animate-spin" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Dispatch</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
