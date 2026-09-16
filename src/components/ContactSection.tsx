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
  Clock, 
  ExternalLink,
  User
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

    const subject = encodeURIComponent(formData.subject.trim() || 'Portfolio inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      className="py-16 md:py-24 border-t border-line relative overflow-hidden text-left"
    >
      <div className="container-page">
        
        {/* Section Editorial Header */}
        <div className="section-rule">
          <div className="flex items-center gap-3">
            <span className="type-eyebrow font-medium">
              [ 06 / Contact ]
            </span>
            <span className="type-meta hidden sm:inline">
              Direct inquiries & opportunities
            </span>
          </div>
          <span className="type-meta">
            Response &lt; 24h
          </span>
        </div>

        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 space-y-2"
        >
          <h2 className="type-section">
            Get in touch
          </h2>
          <p className="type-body-sm">
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
            <div className="card p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-md bg-surface-2 text-accent border border-line">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <h3 className="type-label font-medium">Email</h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  id="copy-email-btn"
                  className="btn btn-sm btn-outline"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                      <span className="text-accent font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${profile.email}`}
                id="contact-email-link"
                className="font-serif text-xl text-ink hover:text-accent block truncate tracking-tight transition-colors"
              >
                {profile.email}
              </a>

              <div className="flex items-center gap-2 type-meta pt-2 border-t border-line">
                <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                <span>Response time: within 24–48 hours</span>
              </div>
            </div>

            {/* Professional Profiles Card */}
            <div className="card p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-surface-2 text-accent border border-line">
                  <User className="w-4 h-4" aria-hidden="true" />
                </span>
                <h3 className="type-label font-medium">Profiles</h3>
              </div>

              <div className="space-y-2">
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-social-github"
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-2 hover:bg-chip border border-line transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4 text-muted group-hover:text-ink" aria-hidden="true" />
                      <div>
                        <div className="text-sm font-sans font-medium text-ink">GitHub</div>
                        <div className="type-meta">Open-source repos & tools</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-faint group-hover:text-accent transition-colors" aria-hidden="true" />
                  </a>
                )}

                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-social-linkedin"
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-2 hover:bg-chip border border-line transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4 text-muted group-hover:text-ink" aria-hidden="true" />
                      <div>
                        <div className="text-sm font-sans font-medium text-ink">LinkedIn</div>
                        <div className="type-meta">Professional network</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-faint group-hover:text-accent transition-colors" aria-hidden="true" />
                  </a>
                )}

                {profile.socialLinks.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-social-twitter"
                    className="flex items-center justify-between p-3 rounded-lg bg-surface-2 hover:bg-chip border border-line transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Twitter className="w-4 h-4 text-muted group-hover:text-ink" aria-hidden="true" />
                      <div>
                        <div className="text-sm font-sans font-medium text-ink">Twitter / X</div>
                        <div className="type-meta">Technical commentary</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-faint group-hover:text-accent transition-colors" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="card p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-surface-2 text-accent border border-line">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </span>
                <h3 className="type-label font-medium">Location</h3>
              </div>
              <p className="type-body-sm">
                Based in <strong className="text-ink font-medium">{profile.location}</strong>. Open to internships, full-time roles, and remote opportunities.
              </p>
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
            <div className="card p-6 sm:p-8">
              
              <h3 className="type-subsection mb-1">
                Send a message
              </h3>
              <p className="type-body-sm mb-6">
                Fill out the form and your email client will open with the message ready to send.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-form-name"
                      className="block type-label"
                    >
                      Name <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-form-name"
                      name="name"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`input input-sm ${errors.name ? 'border-rose-500' : ''}`}
                    />
                    {errors.name && <p id="contact-name-error" className="text-xs text-rose-600">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label 
                      htmlFor="contact-form-email"
                      className="block type-label"
                    >
                      Email <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-form-email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={`input input-sm ${errors.email ? 'border-rose-500' : ''}`}
                    />
                    {errors.email && <p id="contact-email-error" className="text-xs text-rose-600">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="contact-form-subject"
                    className="block type-label"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-form-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project inquiry / Collaboration"
                    className="input input-sm"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="contact-form-message"
                    className="block type-label"
                  >
                    Message <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-form-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, role, or questions..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`input input-sm ${errors.message ? 'border-rose-500' : ''}`}
                  />
                  {errors.message && <p id="contact-message-error" className="text-xs text-rose-600">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  className="btn btn-md btn-primary w-full sm:w-auto"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Send message</span>
                </button>
              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
