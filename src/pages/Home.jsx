import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

import feature1 from '../assets/feature1.png';
import feature2 from '../assets/feature2.png';
import feature3 from '../assets/feature3.png';
import testimonial1 from '../assets/testimonial1.png';
import testimonial2 from '../assets/testimonial1.png';
import cvPreview from '../assets/cv-preview.png';

const features = [
  {
    id: 1,
    icon: '✨',
    title: 'Professional Templates',
    description: 'Choose from multiple ATS-friendly templates designed to get you noticed by recruiters.',
    image: feature1,
    alt: 'Professional CV templates showcase',
    imagePosition: 'top' // or 'side' if you prefer side-by-side layout
  },
  {
    id: 2,
    icon: '🚀',
    title: 'Quick & Easy',
    description: 'Create a professional CV in minutes with our intuitive builder. No design skills needed.',
    image: feature2,
    alt: 'Easy-to-use CV builder interface',
    imagePosition: 'bottom'
  },
  {
    id: 3,
    icon: '📱',
    title: 'Mobile Responsive',
    description: 'Your CV looks great on any device, from mobile to desktop.',
    image: feature3, // You might want to use a different image for this
    alt: 'CV displayed on multiple devices',
    imagePosition: 'top'
  }
];

const steps = [
  {
    number: '01',
    title: 'Sign Up',
    description: 'Create your free account in seconds using Google.'
  },
  {
    number: '02',
    title: 'Build Your CV',
    description: 'Fill in your details using our easy-to-use editor.'
  },
  {
    number: '03',
    title: 'Download & Apply',
    description: 'Download as PDF and start applying for your dream job.'
  }
];

const testimonials = [
  {
    name: 'Ama Serwaa',
    role: 'Recent Graduate',
    content: 'Landed my first job within 2 weeks of using CVForge. The templates are modern and professional!',
    image: testimonial1
  },
  {
    name: 'Kwame Osei',
    role: 'IT Professional',
    content: 'As a hiring manager, I can spot a CVForge CV from a mile away - they always stand out in the pile.',
    image: testimonial2
  }
];

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="badge">🚀 New: AI-Powered CV Review</div>
            <h1 className="hero-title">Your Dream Job Starts With a Professional CV</h1>
            <p className="hero-sub">
              Create a standout CV in minutes with our easy-to-use builder. Designed for Ghanaian professionals and students 
              to make the best first impression with recruiters.
            </p>
            <div className="hero-ctas">
              <Link to="/builder" className="btn btn-primary">Create My CV — it's free</Link>
              <Link to="/dashboard" className="btn btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z" fill="currentColor"/>
                </svg>
                Watch Demo
              </Link>
            </div>
            <div className="trusted-by">
              <span>Trusted by professionals at</span>
              <div className="companies">
                <span>MTN</span>•<span>Vodafone</span>•<span>Ecobank</span>•<span>KPMG</span>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="card-preview">
              <img src={cvPreview} alt="Professional CV Example" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to land interviews</h2>
            <p>Our platform is packed with powerful features to help you create the perfect CV</p>
          </div>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.id} className={`feature-card ${feature.imagePosition || 'top'}`}>
                {feature.imagePosition === 'top' && (
                  <div className="feature-image-container">
                    <img src={feature.image} alt={feature.alt} className="feature-image" />
                  </div>
                )}
                <div className="feature-content">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                {feature.imagePosition === 'bottom' && (
                  <div className="feature-image-container">
                    <img src={feature.image} alt={feature.alt} className="feature-image" />
                  </div>
                )}
                {feature.imagePosition === 'side' && (
                  <div className="feature-image-container side">
                    <img src={feature.image} alt={feature.alt} className="feature-image" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How it works</span>
            <h2>Get Job-Ready in 3 Simple Steps</h2>
          </div>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
            <div className="timeline"></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Join thousands of professionals who got hired with CVForge</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="quote">"</div>
                <p>{testimonial.content}</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to land your dream job?</h2>
          <p>Create your professional CV in minutes. No design skills needed.</p>
          <Link to="/builder" className="btn btn-primary btn-large">Build My CV Now — It's Free</Link>
        </div>
      </section>
    </div>
  );
}
