import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import type { UserProfile } from '../types';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

interface ContactSectionProps {
  profile: UserProfile;
  onOpenResume: () => void;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { name: '', email: '', subject: '', message: '' };

function CopyButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" onClick={copy} className="btn btn-sm btn-outline">
      {copied ? (
        <>
          <Check size={14} className="text-success" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Copy size={14} aria-hidden="true" />
          {label}
        </>
      )}
    </button>
  );
}

export function ContactSection({ profile, onOpenResume }: ContactSectionProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = () => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = 'Please add your name';
    if (!form.email.trim()) next.email = 'Please add your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Check the email format';
    if (!form.subject.trim()) next.subject = 'Please add a subject';
    if (!form.message.trim()) next.message = 'Please add a message';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const body = `From: ${form.name} (${form.email})\n\n${form.message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const socials = [
    { label: 'GitHub', href: profile.socialLinks.github, Icon: Github },
    { label: 'LinkedIn', href: profile.socialLinks.linkedin, Icon: Linkedin },
  ].filter((s): s is { label: string; href: string; Icon: typeof Github } => Boolean(s.href));

  return (
    <section id="contact" className="section">
      <div className="shell">
        <SectionHeading
          index="05"
          label="Contact"
          title="Let's build something worth shipping."
          intro="I'm open to full-time roles and interesting collaborations. The fastest way to reach me is email — I usually reply within a day or two."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Direct channels */}
          <div className="lg:col-span-5">
            <Reveal>
              <a
                href={`mailto:${profile.email}`}
                className="group block border-t border-line pt-6"
              >
                <span className="t-label">Email</span>
                <span className="font-display mt-2 flex items-center gap-2 break-all text-xl font-medium tracking-tight text-ink transition-colors group-hover:text-accent sm:text-2xl">
                  {profile.email}
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-6 flex flex-wrap gap-2">
                <CopyButton label="Copy email" value={profile.email} />
                {profile.phone && <CopyButton label="Copy phone" value={profile.phone} />}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="panel p-4">
                  <MapPin size={16} className="text-accent" aria-hidden="true" />
                  <div className="t-small mt-3 text-ink">{profile.location}</div>
                </div>
                <div className="panel p-4">
                  <Mail size={16} className="text-accent" aria-hidden="true" />
                  <div className="t-small mt-3 text-ink">{profile.availability}</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-md btn-outline"
                  >
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </a>
                ))}
                <button type="button" onClick={onOpenResume} className="btn btn-md btn-outline">
                  Résumé
                </button>
              </div>
            </Reveal>
          </div>

          {/* Message form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={onSubmit} noValidate className="window p-6 sm:p-8">
              <div className="marker justify-between">
                <span>Direct message</span>
                <span className="text-ink-2">/ mail client</span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  id="contact-name"
                  label="Name"
                  value={form.name}
                  error={errors.name}
                  placeholder="Your name"
                  onChange={(v) => update('name', v)}
                />
                <Field
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  placeholder="you@company.com"
                  onChange={(v) => update('email', v)}
                />
              </div>

              <div className="mt-5">
                <Field
                  id="contact-subject"
                  label="Subject"
                  value={form.subject}
                  error={errors.subject}
                  placeholder="What is this about?"
                  onChange={(v) => update('subject', v)}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="t-label block">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  placeholder="A little context helps me reply well."
                  onChange={(e) => update('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`field mt-2 resize-none ${errors.message ? 'field-error' : ''}`}
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="t-mono mt-2 text-[0.6875rem] text-danger">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn btn-lg btn-primary">
                  <Mail size={15} aria-hidden="true" />
                  Send message
                </button>
                <p className="t-mono text-[0.6875rem] text-ink-3">
                  {sent ? 'Opening your mail client…' : 'Opens a draft in your mail client.'}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}

function Field({ id, label, value, placeholder, onChange, error, type = 'text' }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="t-label block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`field mt-2 ${error ? 'field-error' : ''}`}
      />
      {error && (
        <p id={errorId} role="alert" className="t-mono mt-2 text-[0.6875rem] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
