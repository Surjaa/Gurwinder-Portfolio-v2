import Magnetic from "./Magnetic";
import Heading from "./Heading";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { person } from "../data";
import PlainNote from "./PlainNote";

// Fill these in from your EmailJS dashboard.
const EMAILJS = {
  serviceId: "service_pra81fk",
  ownerTemplateId: "template_v8wj3yb",
  replyTemplateId: "template_9doii34",
  publicKey: "hjDYho1Zz-aNreUSw",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const params = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      };
      await Promise.all([
        emailjs.send(EMAILJS.serviceId, EMAILJS.ownerTemplateId, params, {
          publicKey: EMAILJS.publicKey,
        }),
        emailjs.send(
          EMAILJS.serviceId,
          EMAILJS.replyTemplateId,
          { ...params, to_name: form.name, to_email: form.email },
          { publicKey: EMAILJS.publicKey },
        ),
      ]);
      setForm({ name: "", email: "", message: "" });
      setPopup(true);
    } catch {
      setError(
        "Message could not be sent. Please try again, or use Copy email.",
      );
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  const field = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1.5px solid var(--ink)",
    padding: "0.75rem 0",
    color: "var(--ink)",
    fontSize: "1.1rem",
    borderRadius: 0,
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="eyebrow mb-3">Contact</p>
        <Heading
          lines={["Let us build", "something."]}
          accentLine={1}
          className="big-title mb-4"
        />
        <p className="lead-text mb-5">
          Hiring a Full Stack Developer, need a dashboard or MIS reporting
          system, or have a business project in mind? Send a message and I will
          reply.
        </p>

        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <form onSubmit={onSubmit} className="d-grid gap-4">
              <div>
                <label htmlFor="c-name" className="eyebrow">
                  Name
                </label>
                <input
                  id="c-name"
                  style={field}
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                />
              </div>
              <div>
                <label htmlFor="c-email" className="eyebrow">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  style={field}
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                />
              </div>
              <div>
                <label htmlFor="c-msg" className="eyebrow">
                  Message
                </label>
                <textarea
                  id="c-msg"
                  rows={4}
                  style={{ ...field, resize: "vertical" }}
                  required
                  value={form.message}
                  onChange={update("message")}
                />
              </div>
              <div>
                <Magnetic>
                  <button type="submit" className="btn-pill" disabled={sending}>
                    {sending ? "Sending..." : "Send message"}
                  </button>
                </Magnetic>
              </div>
              {error && (
                <p role="alert" style={{ color: "var(--accent)" }}>
                  {error}
                </p>
              )}
            </form>
            <PlainNote>Your message is sent straight from this page.</PlainNote>
          </div>
          <div className="col-12 col-lg-5">
            <p className="eyebrow mb-2">Email</p>
            <a
              className="fs-4 fw-bold text-break"
              href={`mailto:${person.email}`}
              style={{ fontFamily: "var(--font-display)", fontStretch: "85%" }}
            >
              {person.email}
            </a>
            <div className="d-flex flex-wrap gap-2 mt-3 mb-4">
              <button
                type="button"
                className="btn-pill ghost"
                onClick={copyEmail}
              >
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>
            <p className="eyebrow mb-2">Phone</p>
            <p className="mb-4">{person.phone}</p>
            <p className="eyebrow mb-2">Elsewhere</p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              <a
                className="chip"
                href={person.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                className="chip"
                href={person.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                className="chip"
                href={person.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
            </div>
            <a
              className="btn-pill"
              href={person.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download resume
            </a>
          </div>
        </div>
      </div>

      {popup && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPopup(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 4000,
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
              borderRadius: 20,
              padding: "2rem",
              maxWidth: 420,
              width: "100%",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontWeight: 800, marginBottom: ".75rem" }}>
              Thanks, message received
            </h3>
            <p className="mb-4">
              Your message is on its way. I will get back to you soon.
            </p>
            <button
              type="button"
              className="btn-pill"
              onClick={() => setPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
