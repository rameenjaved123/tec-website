import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../InnerPage.css';
import PageHero from '../../components/PageHero';

const BASE = '/assets/images/news/2026/09/';
const photos = Array.from({ length: 15 }, (_, i) => `${BASE}cothm-visit-${i + 1}.jpeg`);

export default function COTHMVisitPage() {
  const [lightbox, setLightbox] = useState(null); // index or null

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + photos.length) % photos.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Trent Education Centre Visits COTHM"
        subtitle="Exploring opportunities for future collaboration and partnership"
        bgImage={`${BASE}cothm-visit-1.jpeg`}
        bgPosition="center 40%"
      />

      <div className="container inner-content" style={{ maxWidth: 900 }}>

        <Link to="/news-events" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--tec-green)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', marginBottom: 18 }}>
          <ArrowLeft size={15} /> Back to News &amp; Events
        </Link>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--tec-green)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '5px 12px', borderRadius: 20 }}>
            <Calendar size={12} /> 21 September 2026
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--tec-gray)', color: 'var(--tec-text-light)', fontSize: '0.72rem', fontWeight: 600, padding: '5px 12px', borderRadius: 20 }}>
            <MapPin size={12} /> COTHM
          </span>
        </div>

        {/* Story */}
        <div style={{ color: 'var(--tec-text-light)', lineHeight: 1.9, fontSize: '1.02rem' }}>
          <p>
            Today, the Trent Education Centre team visited <strong>COTHM</strong> to discuss potential areas of
            collaboration and explore opportunities for future partnerships. We had a productive discussion and
            look forward to developing a mutually beneficial relationship in the future.
          </p>
          <p>
            The visit provided a valuable opportunity for both teams to share their expertise, learn about each
            other&rsquo;s programmes and facilities, and identify areas where working together could benefit
            students across both institutions. We are excited about the possibilities this partnership may bring
            and look forward to continuing these conversations in the months ahead.
          </p>
        </div>

        {/* Gallery */}
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--tec-green)', margin: '34px 0 16px' }}>
          Photos from the Visit
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 10,
        }}>
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              style={{
                padding: 0, border: 'none', cursor: 'pointer', borderRadius: 10, overflow: 'hidden',
                aspectRatio: '1/1', background: '#eee', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              }}
              aria-label={`Open photo ${i + 1}`}
            >
              <img src={src} alt={`COTHM visit ${i + 1}`} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .3s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')} />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 18, right: 20, background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 44, height: 44, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close"><X size={22} /></button>
          <button onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + photos.length) % photos.length); }} style={{ position: 'absolute', left: 16, background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 46, height: 46, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Previous"><ChevronLeft size={26} /></button>
          <img src={photos[lightbox]} alt={`COTHM visit ${lightbox + 1}`} onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '86vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
          <button onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % photos.length); }} style={{ position: 'absolute', right: 16, background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 46, height: 46, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Next"><ChevronRight size={26} /></button>
          <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>{lightbox + 1} / {photos.length}</div>
        </div>
      )}
    </div>
  );
}
