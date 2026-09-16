import React, { useState } from 'react';
import {
  Mail, Copy, Check, ExternalLink, MapPin, Clock,
  Github, Linkedin, Twitter, Send, AlertCircle,
} from 'lucide-react';
import { UserProfile } from '../types';
import { SectionHeader } from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ContactSectionProps {
  profile: UserProfile;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const contentRef = useScrollReveal<HTMLDivElement>({ variant: 'fadeUp', stagger: 0.1 });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = profile.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    window.location.href = mailto;
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, url: profile.socialLinks.github },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, url: profile.socialLinks.linkedin },
    { name: 'Twitter / X', icon: <Twitter size={18} />, url: profile.socialLinks.twitter },
  ].filter((l) => l.url);

  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div className="container-wide relative z-10">
        <SectionHeader
          number="06"
          label="Contact"
          title="Get in Touch"
          subtitle="Interested in working together or have a question? I'd love to hear from you."
          badge="Response < 24h"
        />

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <span className="type-label">Direct Email</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="type-body-sm font-mono flex-1 text-ink">{profile.email}</code>
                <button
                  onClick={copyEmail}
                  className="btn-sm btn-ghost cursor-pointer"
                  aria-label="Copy email to clipboard"
                >
                  {copied ? (
                    <><Check size={14} className="text-emerald-400" /> Copied</>
                  ) : (
                    <><Copy size={14} /> Copy</>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-1.5 type-meta">
                <Clock size={11} /> Typical response: 24–48 hours
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all duration-300">
                      {link.icon}
                    </div>
                    <span className="type-label">{link.name}</span>
                  </div>
                  <ExternalLink size={14} className="text-ink-3 group-hover:text-accent transition-colors duration-200" />
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="glass-card-static p-4 flex items-center gap-3">
              <MapPin size={16} className="text-accent" />
              <div>
                <span className="type-label block">{profile.location}</span>
                <span className="type-meta">{profile.availability}</span>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8">
              <h3 className="type-title mb-5">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="type-label text-xs mb-1.5 block">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Your name"
                      className={`input ${formErrors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                    />
                    {formErrors.name && (
                      <p className="type-meta text-red-400 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle size={11} /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="type-label text-xs mb-1.5 block">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`input ${formErrors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
                    />
                    {formErrors.email && (
                      <p className="type-meta text-red-400 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle size={11} /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="type-label text-xs mb-1.5 block">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    placeholder="What's this about?"
                    className={`input ${formErrors.subject ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  />
                  {formErrors.subject && (
                    <p className="type-meta text-red-400 mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle size={11} /> {formErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="type-label text-xs mb-1.5 block">Message</label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Tell me about your project or question..."
                    rows={5}
                    className={`input resize-none ${formErrors.message ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  />
                  {formErrors.message && (
                    <p className="type-meta text-red-400 mt-1 flex items-center gap-1" role="alert">
                      <AlertCircle size={11} /> {formErrors.message}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-md btn-primary w-full cursor-pointer">
                  <Send size={16} /> Send Message
                </button>
                <p className="type-meta text-center">
                  Opens your email client with a pre-filled draft.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
