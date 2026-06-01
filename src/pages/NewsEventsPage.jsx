import { useState, useEffect } from 'react';
import './InnerPage.css';
import PageHero from '../components/PageHero';

/* ─── helpers ──────────────────────────────────────────────────── */
function Carousel({ images, alt }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#111', aspectRatio: '4/3', width: '100%' }}>
      <img
        src={images[idx]}
        alt={`${alt} ${idx + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={() => setIdx(i => (i - 1 + images.length) % images.length)}
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >‹</button>
          <button
            onClick={() => setIdx(i => (i + 1) % images.length)}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >›</button>
          <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {images.map((_, i) => (
              <span key={i} onClick={() => setIdx(i)} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'block' }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function VideoBlock({ src, poster }) {
  return (
    <div style={{ overflow: 'hidden', background: '#000', aspectRatio: '4/3', width: '100%' }}>
      <video controls poster={poster} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function YouTubeBlock({ videoId, poster }) {
  const thumb = poster || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noreferrer"
      style={{ position: 'relative', display: 'block', overflow: 'hidden', width: '100%', aspectRatio: '16/9', textDecoration: 'none' }}
    >
      <img src={thumb} alt="Video thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--tec-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>
        </div>
      </div>
    </a>
  );
}

function InstaEmbed({ url }) {
  useEffect(() => {
    const process = () => { if (window.instgrm?.Embeds) window.instgrm.Embeds.process(); };
    if (!document.getElementById('ig-embed-script')) {
      const s = document.createElement('script');
      s.id = 'ig-embed-script';
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      s.onload = process;
      document.body.appendChild(s);
    } else {
      process();
    }
  }, []);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: '#FFF', border: 0, borderRadius: 0, margin: 0, maxWidth: '100%', minWidth: '200px', padding: 0, width: '100%' }}
      />
    </div>
  );
}

function MediaBlock({ media, title }) {
  if (!media) return null;
  if (media.type === 'carousel') return <Carousel images={media.images} alt={title} />;
  if (media.type === 'video') return <VideoBlock src={media.src} poster={media.poster} />;
  if (media.type === 'youtube') return <YouTubeBlock videoId={media.videoId} poster={media.poster} />;
  return (
    <div style={{ overflow: 'hidden', width: '100%', aspectRatio: '1/1' }}>
      <img src={media.src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}

const BASE = '/uploads/';

/* ─── news data ─────────────────────────────────────────────────── */
const news = [
  {
    day: '03', month: 'Dec', year: '2025',
    title: 'Team Birmingham Brings the Festive Spirit to Campus! 🎄✨',
    desc: 'Our Birmingham Study Centre came alive with festive cheer as students and staff gathered to celebrate the season together — sharing food, laughter, and community spirit.',
    location: 'Birmingham',
    media: { type: 'carousel', images: [
      BASE + '2025/12/WhatsApp-Image-2025-12-03-at-10.55.18-AM-5.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-03-at-10.55.18-AM-3.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-03-at-10.55.18-AM.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-03-at-10.55.18-AM-2.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-03-at-10.55.18-AM-1.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-03-at-10.55.18-AM-4.jpeg',
    ]},
    instaLink: null,
  },
  {
    day: '01', month: 'Dec', year: '2025',
    title: 'Leicester Campus Sparkles: A Festive Celebration of Teamwork and Joy',
    desc: 'Students at our Leicester Study Centre joined together to mark the festive season with warmth and joy — a wonderful celebration of culture and community.',
    location: 'Leicester',
    media: { type: 'carousel', images: [
      BASE + '2025/12/WhatsApp-Image-2025-12-01-at-11.26.04-AM.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-01-at-11.26.04-AM-1.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-01-at-11.26.04-AM-2.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-01-at-11.26.04-AM-3.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-01-at-11.26.05-AM-1.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-01-at-11.26.05-AM-2.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-01-at-11.26.05-AM-3.jpeg',
      BASE + '2025/12/WhatsApp-Image-2025-12-01-at-11.26.05-AM-4.jpeg',
    ]},
    instaLink: 'https://www.instagram.com/p/DRuCamxDOSF/?img_index=1',
  },
  {
    day: '07', month: 'Nov', year: '2025',
    title: 'TEC Awarded ASIC Accreditation',
    desc: 'We are delighted to announce that Trent Education Centre has been awarded accreditation by ASIC (Accreditation Service for International Schools, Colleges and Universities). This recognition is a testament to our commitment to quality education and student experience.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2025/12/TEC-November-Content-2-819x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DQwsl9HDPbV/',
  },
  {
    day: '14', month: 'Aug', year: '2025',
    title: 'CPD Training with Dr. Sajid Kazmi',
    desc: 'Our dedicated staff took part in a Continuing Professional Development (CPD) training day with Dr. Sajid Kazmi — investing in their skills and knowledge to continue delivering excellent education to our students.',
    location: 'Nottingham',
    media: { type: 'image', src: BASE + '2025/10/SnapInsta.to_532496590_17941687251045882_5604281431896958087_n-1024x664.webp' },
    instaLink: 'https://www.instagram.com/p/DNVJBY9sywb/?img_index=1',
  },
  {
    day: '12', month: 'Aug', year: '2025',
    title: 'International Youth Day',
    desc: 'Celebrating International Youth Day, TEC honours the energy, creativity, and potential of young people everywhere. Our students are the future — and we are proud to support their journeys.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2025/08/august-12-1-1024x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DNP3WTGsQ0z/',
  },
  {
    day: '01', month: 'Aug', year: '2025',
    title: 'Class of 2025 Celebration',
    desc: 'Congratulations to our incredible Class of 2025! We celebrated your achievements, your resilience, and the bright futures that lie ahead. We are enormously proud of every one of you.',
    location: 'All Centres',
    media: {
      type: 'video',
      src: BASE + '2025/08/SnapInsta.to_AQNJNDGJvkeTSq6fd4Cz_aMagZ16H35fk99O2trh7-AKnbHeTQaBrcWIqhLWu7yH_hzWv6Ri2AlxQjC-257ac68bHQQJ_21M7vfWBZA.mp4',
      poster: BASE + '2025/08/AWARD-CEREMONY-2025-1.jpg',
    },
    instaLink: 'https://www.instagram.com/p/DMz1QEeMldi/',
  },
  {
    day: '24', month: 'Jun', year: '2025',
    title: 'Fire Marshal Training',
    desc: 'TEC staff completed Fire Marshal Training — ensuring our campuses remain safe environments for everyone. Health and safety is a core part of how we care for our community.',
    location: 'Nottingham',
    media: { type: 'image', src: BASE + '2025/07/Swapping-Classrooms-for-Fresh-Air-4-819x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DLSS29aC20H/?img_index=1',
  },
  {
    day: '17', month: 'Jun', year: '2025',
    title: 'British Council IELTS Partnership',
    desc: 'TEC proudly announces its affiliate partnership with the British Council IELTS Programme. Students can now access support, advice, and booking for IELTS for UKVI and Life Skills tests directly through TEC.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2025/07/Add-a-little-bit-of-body-text-1024x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DK_1MYTNMan/',
  },
  {
    day: '11', month: 'Jun', year: '2025',
    title: 'Ascentis Approved Centre',
    desc: 'Trent Education Centre is now an approved centre for Ascentis qualifications — expanding the range of accredited programmes available to our students and opening new pathways to success.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2025/07/TEC-SOCIALS-819x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DK1X0vhMf_b/',
  },
  {
    day: '30', month: 'Apr', year: '2025',
    title: 'Focus Awards Approved Centre',
    desc: 'TEC has become an approved centre for Focus Awards — adding another nationally recognised awarding body to our growing portfolio of partnerships and qualifications.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2025/07/Trent-Education-Centre-is-Now-an-Approved-Learning-Partner-of-Pearson-Instagram-Post-1024x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DJEL9pEAH9c/',
  },
  {
    day: '02', month: 'Apr', year: '2025',
    title: 'ASIC Interim Accreditation',
    desc: 'TEC received its ASIC Interim Accreditation — a key milestone on our journey to full accreditation, recognising the quality standards we uphold across all our programmes.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2025/07/White-and-Blue-Clean-and-Modern-New-Employees-LinkedIn-Post-1024x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DH8JKMygUr9/',
  },
  {
    day: '25', month: 'Nov', year: '2024',
    title: 'Safeguarding Adults Week',
    desc: 'During Safeguarding Adults Week, TEC highlighted its commitment to student welfare and the wellbeing of all members of our community. Supporting one another is at the heart of who we are.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2025/07/Supporting-Wellbeing-Marking-Safeguarding-Adults-Week-1024x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DCyiEIKNaiN/?img_index=1',
  },
  {
    day: '04', month: 'Nov', year: '2024',
    title: 'Advance HE Membership',
    desc: 'TEC celebrates its membership with Advance HE — a prestigious UK body supporting excellence in higher education. This partnership enhances the professional development of our academic staff.',
    location: 'All Centres',
    media: {
      type: 'video',
      src: BASE + '2024/11/Trent-Education-Centre-is-Now-an-Approved-Learning-Partner-of-Pearson-Instagram-Post-1.mp4',
      poster: BASE + '2024/11/Screenshot-2024-11-04-164701.png',
    },
    instaLink: 'https://www.instagram.com/p/DCB0qNkNbYz/',
  },
  {
    day: '28', month: 'Oct', year: '2024',
    title: 'Breast Cancer Awareness Month',
    desc: 'TEC joined the global movement for Breast Cancer Awareness Month — raising awareness among our students and staff, and showing solidarity with those affected by this important cause.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2024/10/WhatsApp-Image-2024-10-18-at-1.50.17-PM-1024x1024.jpeg' },
    instaLink: 'https://www.instagram.com/p/DBqh81MScn1/?img_index=1',
  },
  {
    day: '15', month: 'Oct', year: '2024',
    title: 'World Mental Health Day — Tea & Talk',
    desc: 'To mark World Mental Health Day, TEC hosted a Tea & Talk drop-in event — a welcoming space for students and staff to connect, share, and support one another\'s mental wellbeing.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2024/10/World-Mental-Health-Day-Part-2-1-1024x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DBJWkwPSwoD/?img_index=1',
  },
  {
    day: '08', month: 'Oct', year: '2024',
    title: 'J9 Domestic Abuse Awareness',
    desc: 'TEC supported J9 Domestic Abuse Awareness Month — shining a light on this critical issue and reinforcing our commitment to the safety and dignity of every member of our community.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2024/10/1-1-1024x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/DA3QPZmthPY/?img_index=1',
  },
  {
    day: '20', month: 'Sep', year: '2024',
    title: 'Pearson Approved Centre',
    desc: 'TEC is proud to announce it is now an approved Pearson learning centre — one of the world\'s leading education companies. This milestone opens even more pathways for our students.',
    location: 'All Centres',
    media: {
      type: 'video',
      src: BASE + '2024/09/Animated-Social-Media-Post-1.mp4',
    },
    instaLink: 'https://www.instagram.com/p/DAIyVccNytj/',
  },
  {
    day: '01', month: 'Jul', year: '2024',
    title: 'Plastic Free July',
    desc: 'TEC joined the Plastic Free July movement — encouraging students and staff to reduce single-use plastic and take small, meaningful steps for our planet\'s future.',
    location: 'All Centres',
    media: { type: 'image', src: BASE + '2024/07/1st-July-1024x1024.jpg' },
    instaLink: 'https://www.instagram.com/p/C84UtxmNVa0/',
  },
  {
    day: '20', month: 'Jun', year: '2024',
    title: 'Prevent Duty Training',
    desc: 'TEC delivered Prevent Duty awareness sessions for staff — reinforcing our responsibilities under the UK Government\'s Prevent strategy and our commitment to keeping students safe.',
    location: 'All Centres',
    media: { type: 'carousel', images: [
      BASE + '2024/07/Screenshot-2024-07-03-113531.png',
      BASE + '2024/07/Screenshot-2024-07-03-113523.png',
      BASE + '2024/07/Screenshot-2024-07-03-113538.png',
      BASE + '2024/07/Screenshot-2024-07-03-113545.png',
    ]},
    instaLink: 'https://www.instagram.com/p/C8cQWbtNi_x/?img_index=1',
  },
  {
    day: '08', month: 'May', year: '2024',
    title: 'Introducing TrentCare',
    desc: 'TrentCare is TEC\'s community outreach programme — connecting students with volunteering, local support, and charitable activities that make a real difference beyond the classroom.',
    location: 'Nottingham',
    media: { type: 'youtube', videoId: 'IikTsUMieh8', poster: '/assets/images/general/thumbnail.jpg' },
    instaLink: 'https://www.instagram.com/p/C6q9uJ-IlqN/',
  },
  {
    day: '10', month: 'Apr', year: '2024',
    title: 'Eid Celebration at TEC',
    desc: 'TEC celebrated Eid with students and staff from across all our campuses — sharing food, culture, and the joy of community. A beautiful reminder of the diversity that makes TEC so special.',
    location: 'All Centres',
    media: { type: 'youtube', videoId: 'jdpnBSlHHSs', poster: '/assets/images/general/group-photo.jpg' },
    instaLink: 'https://www.instagram.com/p/C52-38Ktgdv/',
  },
  {
    day: '08', month: 'Mar', year: '2024',
    title: 'International Women\'s Day',
    desc: 'On International Women\'s Day, TEC celebrated the incredible women in our community — students, staff, and leaders — who inspire us every day. Here\'s to equity, empowerment, and progress.',
    location: 'All Centres',
    media: { type: 'youtube', videoId: 'GecpEbSeJoE', poster: '/assets/images/general/team-photo-2.jpg' },
    instaLink: 'https://www.instagram.com/p/C4Qnr_Jtzlz/',
  },
  {
    day: '25', month: 'Nov', year: '2023',
    title: 'IUPT Annual Conference',
    desc: 'TEC representatives attended the IUPT Annual Conference — engaging with sector leaders and peers to discuss innovation, quality, and the future of independent higher education in the UK.',
    location: 'London',
    media: { type: 'youtube', videoId: '7KdHjj1kjkw', poster: '/assets/images/general/artboard-3.jpg' },
    instaLink: 'https://www.instagram.com/reel/CyOWffgiRfe/?igsh=MWFseHhmdXltdDI4ZQ==',
  },
  {
    day: '10', month: 'Oct', year: '2023',
    title: 'World Mental Health Day 2023',
    desc: 'For World Mental Health Day 2023, TEC raised awareness through activities, conversations, and resources — reaffirming that mental health matters as much as academic achievement.',
    location: 'All Centres',
    media: { type: 'video', src: '/assets/media/mental-health-day.mp4' },
    instaLink: 'https://www.instagram.com/reel/CyOWffgiRfe/?igsh=MWFseHhmdXltdDI4ZQ==',
  },
  {
    day: '13', month: 'Sep', year: '2023',
    title: 'New Art Exchange Visit',
    desc: 'TEC students visited the New Art Exchange in Nottingham — a world-class venue celebrating diverse global art and culture. An inspiring day of creativity and cultural exploration.',
    location: 'Nottingham',
    media: { type: 'youtube', videoId: 'o4RtnFub9vE', poster: '/assets/images/general/team-photo-1.jpg' },
    instaLink: 'https://www.instagram.com/reel/C1HlvlmIO3O/?igsh=cHlyeHUwOXZ3emZ6',
  },
];

/* ─── Instagram SVG icon ────────────────────────────────────────── */
function IgIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

/* ─── page ──────────────────────────────────────────────────────── */
export default function NewsEventsPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="News &amp; Events"
        subtitle="Celebrating achievements and keeping our community informed"
        bgImage="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=80"
        bgPosition="center center"
      />

      <div className="container inner-content">

        <p style={{ fontSize: '1rem', color: 'var(--tec-text-light)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '720px' }}>
          From student milestones and cultural events to accreditations and professional development
          — here you'll find a record of what makes TEC such a vibrant place to learn and work.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'start',
        }}>
          {news.map((item, i) => (
            <article key={i} style={{
              background: '#fff',
              borderRadius: '14px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              border: '1px solid #efefef',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,0,0,0.13)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)'; e.currentTarget.style.transform = 'none'; }}
            >
              {/* ── Thumbnail ── */}
              <div style={{ width: '100%', lineHeight: 0, position: 'relative' }}>
                <MediaBlock media={item.media} title={item.title} />
                {/* Instagram badge overlay */}
                {item.instaLink && (
                  <a
                    href={item.instaLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      position: 'absolute', top: '10px', right: '10px',
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      background: 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af)',
                      color: '#fff', fontSize: '0.68rem', fontWeight: 700,
                      padding: '5px 10px', borderRadius: '20px',
                      textDecoration: 'none', backdropFilter: 'blur(4px)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    }}
                  >
                    <IgIcon /> View post
                  </a>
                )}
                {/* YouTube badge overlay */}
                {item.media?.type === 'youtube' && (
                  <a
                    href={`https://www.youtube.com/watch?v=${item.media.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      position: 'absolute', top: '10px', left: '10px',
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      background: '#ff0000', color: '#fff',
                      fontSize: '0.68rem', fontWeight: 700,
                      padding: '5px 10px', borderRadius: '20px',
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>
                    YouTube
                  </a>
                )}
              </div>

              {/* ── Content ── */}
              <div style={{ padding: '14px 16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>

                {/* Date + location */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'var(--tec-green)', color: '#fff',
                    fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px',
                    borderRadius: '20px', letterSpacing: '0.3px',
                  }}>
                    {item.day} {item.month} {item.year}
                  </span>
                  <span style={{
                    background: 'var(--tec-gray)', color: 'var(--tec-text-light)',
                    fontSize: '0.65rem', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
                  }}>
                    📍 {item.location}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4, margin: 0 }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.8rem', color: 'var(--tec-text-light)', lineHeight: 1.7, margin: 0, flex: 1 }}>
                  {item.desc}
                </p>

              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
