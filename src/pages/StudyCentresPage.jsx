import { useState, useCallback } from 'react';
import './InnerPage.css';
import './StudyCentresPage.css';
import PageHero from '../components/PageHero';

const galleryItems = [
  // Nottingham Digital House 2.3
  { campus: 'Nottingham Digital House 2.3', src: `/assets/images/campus/digital-house/entrance.jpg`, label: 'Head Office Entrance' },
  { campus: 'Nottingham Digital House 2.3', src: `/assets/images/campus/digital-house/main-entrance.jpg`, label: 'Head Office Main Entrance' },
  { campus: 'Nottingham Digital House 2.3', src: `/assets/images/campus/digital-house/entrance-2.jpg`, label: 'Main Entrance' },
  { campus: 'Nottingham Digital House 2.3', src: `/assets/images/campus/digital-house/reception.jpg`, label: 'Reception' },
  { campus: 'Nottingham Digital House 2.3', src: `/assets/images/campus/digital-house/conference-room.jpg`, label: 'Conference Room' },
  { campus: 'Nottingham Digital House 2.3', src: `/assets/images/campus/digital-house/staff-training.jpg`, label: 'Staff Training' },
  { campus: 'Nottingham Digital House 2.3', src: `/assets/images/campus/digital-house/waiting-area.jpg`, label: 'First Floor Waiting Area' },
  { campus: 'Nottingham Digital House 2.3', src: `/assets/images/campus/digital-house/offices.jpg`, label: 'First Floor Offices' },
  { campus: 'Nottingham Digital House 2.3', src: `/assets/images/campus/digital-house/offices-2.jpg`, label: 'First Floor Offices View 2' },

  // Nottingham 2.1 Clarendon Park
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/main-entrance-1.jpg`, label: 'Main Entrance View 1' },
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/main-entrance-2.jpg`, label: 'Main Entrance View 2' },
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/entrance.jpg`, label: 'Entrance' },
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/reception.jpg`, label: 'Reception' },
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/hallway.jpg`, label: 'Hallway to Classrooms' },
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/classroom.jpg`, label: 'Classroom' },
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/classroom-2.jpg`, label: 'Classroom View 2' },
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/first-floor-hallway.jpg`, label: 'First Floor Hallway' },
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/it-lab.jpg`, label: 'IT Lab' },
  { campus: 'Nottingham 2.1 Clarendon Park', src: `/assets/images/campus/clarendon-park/day-trip.jpg`, label: 'Day Trip with Students' },

  // Nottingham Castle Boulevard
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/entrance.jpg`, label: 'Campus Main Entrance' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/exterior.jpg`, label: 'Campus Exterior' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/reception.jpg`, label: 'Reception' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/waiting-room.jpg`, label: 'Waiting Room' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/student-lounge.jpg`, label: 'Student Lounge' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/classroom.jpg`, label: 'Classroom' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/conference-room.jpg`, label: 'Conference Room' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/it-lab-library.jpg`, label: 'IT Lab & Library' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/exam-hall.jpg`, label: 'Exam Hall' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/multi-faith-room.jpg`, label: 'Multi-Faith Room' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/hallway.jpg`, label: 'Hallway' },
  { campus: 'Nottingham Castle Boulevard', src: `/assets/images/campus/castle-boulevard/back-entrance.jpg`, label: 'Back Entrance' },

  // Leicester
  { campus: 'Leicester', src: `/assets/images/campus/leicester/office-building.jpg`, label: 'Office Building' },
  { campus: 'Leicester', src: `/assets/images/campus/leicester/classroom.jpg`, label: 'Classroom' },
  { campus: 'Leicester', src: `/assets/images/campus/leicester/it-lab.jpg`, label: 'IT Lab' },
  { campus: 'Leicester', src: `/assets/images/campus/leicester/students.png`, label: 'Students' },
  { campus: 'Leicester', src: `/assets/images/campus/leicester/library.jpg`, label: 'Library' },

  // Birmingham
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/entrance-1.jpg`, label: 'Building Entrance View 1' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/entrance-2.jpg`, label: 'Building Entrance View 2' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/entrance-3.jpg`, label: 'Building Entrance View 3' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/main-entrance.jpg`, label: 'Main Front Entrance' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/reception.jpg`, label: 'Reception & Waiting Area' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/academic-room-it.jpg`, label: 'Academic Room – IT' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/board-room.jpg`, label: 'Board Room' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/classroom.jpg`, label: 'First Floor Class 2.2' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/it-lab.jpg`, label: 'First Floor IT Lab' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/library.jpg`, label: 'First Floor Library' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/main-hall.jpg`, label: 'Main Hall / Induction Hall' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/ground-floor-hall.jpg`, label: 'Ground Floor Hall' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/speaking-room.jpg`, label: 'Ground Floor Speaking Room' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/common-area.jpg`, label: 'Student Common Area' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/library-2.jpg`, label: 'Library' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/conference-room.jpg`, label: 'Conference Room' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/classroom-2.jpg`, label: 'Classroom' },
  { campus: 'Birmingham', src: `/assets/images/campus/birmingham/office-building.jpg`, label: 'Office Building' },
];

const tabs = [
  'All',
  'Nottingham Digital House 2.3',
  'Nottingham 2.1 Clarendon Park',
  'Nottingham Castle Boulevard',
  // 'Leicester',
  'Birmingham',
];

const campusImages = [
  { src: `/assets/images/campus/thumbnails/castle-boulevard.jpg`, city: 'Nottingham', label: 'Castle Boulevard' },
  { src: `/assets/images/campus/thumbnails/digital-house.jpg`, city: 'Nottingham', label: 'Digital House 2.3' },
  { src: `/assets/images/campus/thumbnails/clarendon-park.jpg`, city: 'Nottingham', label: 'Clarendon Park 2.1' },
  { src: `/assets/images/campus/thumbnails/leicester.jpg`, city: 'Leicester', label: 'Leicester Centre' },
  { src: `/assets/images/campus/thumbnails/birmingham.jpg`, city: 'Birmingham', label: 'Birmingham Centre' },
];

export default function StudyCentresPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeTab === 'All' ? galleryItems : galleryItems.filter(g => g.campus === activeTab);

  const closeLightbox = useCallback((e) => {
    if (e.target === e.currentTarget) setLightbox(null);
  }, []);

  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Our Study Centres"
        subtitle="Connected Campuses, One Community"
        bgImage="/assets/images/campus/digital-house/entrance-2.jpg"
        bgPosition="center 20%"
        bgSize="cover"
      />

      <div className="container inner-content">

        {/* Intro two-column */}
        <div className="sc-intro-row" style={{ marginBottom: '32px' }}>
          <div className="sc-intro-left">
            <h4>Connected Campuses, One Community</h4>
          </div>
          <div className="sc-intro-right">
            <p>
              Our Study Centres in <strong>Nottingham</strong>, <strong>Leicester</strong>, and <strong>Birmingham</strong> provide
              welcoming and vibrant environments where students and staff work together to achieve shared goals.
            </p>
          </div>
        </div>

        {/* Faculty paragraph */}
        <p className="sc-faculty-para">
          You'll find experienced academic faculty delivering <strong>high-quality teaching</strong>, alongside a team of dedicated
          support staff ready to guide you every step of the way. Our centres are equipped with modern facilities, resources,
          and learning spaces to help you achieve your full potential.
        </p>

        {/* Student Council dark block */}
        <div className="sc-council-block" style={{ marginBottom: '64px' }}>
          <div className="sc-council-left">
            <p className="sc-council-tag">Our Study Centres</p>
            <div className="sc-council-locations">
              <div className="sc-council-loc"><span className="sc-loc-dot" />Nottingham</div>
              <div className="sc-council-loc"><span className="sc-loc-dot" />Leicester</div>
              <div className="sc-council-loc"><span className="sc-loc-dot" />Birmingham</div>
            </div>
          </div>
          <div className="sc-council-inner">
            <h4>Empowering Student Voices</h4>
            <div className="sc-divider" />
            <p>
              We have established a Trent Education Centre (TEC) Student Council for all of our Study Centres in Nottingham,
              Leicester, and Birmingham, fulfilling our commitment to providing students with the holistic education they need.
            </p>
            <p>
              The Student Council receives training and support so that it can take the lead in developing an annual calendar
              of social and educational events that reflect students' needs and interests.
            </p>
          </div>
        </div>

        {/* Our Study Centres heading */}
        <div className="sc-centres-heading">
          <h4>Our Study Centres</h4>
          <div className="sc-divider-green" />
        </div>

        {/* Campus image mosaic */}
        <div className="sc-campus-mosaic">
          {campusImages.map((img, i) => (
            <a key={i} href="/contact" className={`sc-campus-tile sc-campus-tile-${i}`}>
              <img src={img.src} alt={img.label} loading="lazy" />
              <div className="sc-campus-overlay">
                <span className="sc-campus-city">{img.city}</span>
                <span className="sc-campus-name">{img.label}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Gallery section */}
        <div className="sc-gallery-section">
          <h2>Gallery</h2>
          <div className="sc-divider-green" style={{ marginBottom: '24px' }} />

          <div className="sc-filter-tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`sc-filter-btn${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filtered.map((item, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => setLightbox(item)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setLightbox(item)}
              >
                <img src={item.src} alt={item.label} loading="lazy" />
                <div className="gallery-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <img src={lightbox.src} alt={lightbox.label} />
        </div>
      )}
    </div>
  );
}
