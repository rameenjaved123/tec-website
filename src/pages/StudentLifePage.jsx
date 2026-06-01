import './InnerPage.css';
import './StudentLifePage.css';
import PageHero from '../components/PageHero';

const facilityPhotos = [
  '/assets/images/campus/rooms/classroom-1.jpg',
  '/assets/images/campus/rooms/it-lab.jpg',
  '/assets/images/campus/rooms/classroom-2.jpg',
  '/assets/images/campus/rooms/room-1.jpg',
  '/assets/images/campus/rooms/classroom-3.jpg',
  '/assets/images/campus/rooms/room-2.jpg',
  '/assets/images/campus/rooms/room-3.jpg',
  '/assets/images/campus/rooms/room-4.jpg',
  '/assets/images/campus/rooms/room-5.jpg',
];

export default function StudentLifePage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Student Life"
        subtitle="Life at Trent Education Centre"
        bgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
        bgPosition="center center"
      />

      <div className="container inner-content">

        {/* Student Council intro */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ color: 'var(--tec-green)', marginBottom: '12px', fontSize: '1.75rem' }}>
            Shaping TEC Together: The Student Council
          </h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--tec-gold)', borderRadius: '2px', marginBottom: '32px' }} />

          <div className="sl-council-grid">
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '28px 24px', borderTop: '4px solid var(--tec-gold)' }}>
              <p style={{ fontWeight: 700, color: 'var(--tec-green)', marginBottom: '10px', fontSize: '1rem' }}>Student Voice</p>
              <p style={{ lineHeight: 1.8, color: 'var(--tec-text-light)', fontSize: '0.95rem' }}>
                A formal body that gives students a real voice in shaping their educational experience at TEC.
              </p>
            </div>
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '28px 24px', borderTop: '4px solid var(--tec-gold)' }}>
              <p style={{ fontWeight: 700, color: 'var(--tec-green)', marginBottom: '10px', fontSize: '1rem' }}>Elected Leadership</p>
              <p style={{ lineHeight: 1.8, color: 'var(--tec-text-light)', fontSize: '0.95rem' }}>
                Led by a <strong>Student President</strong> and <strong>Vice-President</strong>, elected by peers and represented on the Board of Governors.
              </p>
            </div>
            <div style={{ background: 'var(--tec-gray)', borderRadius: '12px', padding: '28px 24px', borderTop: '4px solid var(--tec-gold)' }}>
              <p style={{ fontWeight: 700, color: 'var(--tec-green)', marginBottom: '10px', fontSize: '1rem' }}>Community Impact</p>
              <p style={{ lineHeight: 1.8, color: 'var(--tec-text-light)', fontSize: '0.95rem' }}>
                Meets regularly to raise welfare concerns, organise events, and collaborate with staff on life at TEC.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--tec-text-light)', maxWidth: '820px' }}>
            At Trent Education Centre, we believe that students are at the heart of everything we do.
            Whether it's feeding back on teaching quality, driving community outreach, or shaping
            institutional policy — our Student Council is a powerful force for positive change.
          </p>

          <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', maxWidth: '820px', marginTop: '20px' }}>
            Trent Education Centre (TEC) has a Student Council consisting of a Student President and
            other student representatives from Study Centres in Nottingham, Leicester, and Birmingham.
          </p>

          <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', maxWidth: '820px', marginTop: '20px' }}>
            The Student Council meets throughout the year and the Student President and Vice-President
            are members of the TEC Board of Governors and Academic Board. This demonstrates our
            commitment to engaging students in our decision-making processes and enhancing the holistic
            education we provide. The Student Council receives training and support in how to effectively
            represent their fellow students. The Student Council develops an annual calendar of social
            and educational events that meet the needs and preferences of students.
          </p>
        </div>

      </div>

      {/* Well-Equipped Educational Facilities */}
      <div className="sl-facility-outer">

        {/* Text panel */}
        <div className="sl-facility-text">
          <div>
            <h2 style={{ color: 'var(--tec-white)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.25 }}>
              Well-Equipped Educational Facilities
            </h2>
            <p style={{ lineHeight: 1.9, color: 'rgba(255,255,255,0.92)', fontSize: '1.02rem' }}>
              Our Study Centres in Nottingham, Leicester and Birmingham have newly fitted IT equipment,
              including laptops and PCs with projectors and Smart Boards. Classrooms are spacious and
              designed for flexible seating arrangement so that you can participate in engaging lessons
              with good variety of interaction for knowledge and skills development.
            </p>
          </div>
        </div>

        {/* Photo grid */}
        <div className="sl-photo-grid">
          {facilityPhotos.map((src, i) => (
            <div key={i} className="sl-photo-cell">
              <img
                src={src}
                alt={`TEC facility ${i + 1}`}
                loading="lazy"
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Learning & Wellbeing section — dark green band */}
      <div style={{ background: 'var(--tec-green)', padding: '72px 0' }}>
        <div className="container">
          <h2 style={{ color: 'var(--tec-white)', textAlign: 'center', marginBottom: '56px', fontSize: '2rem' }}>
            Learning &amp; Wellbeing Beyond the Classroom
          </h2>

          <div className="sl-learning-grid">

            {/* Left: two lists side by side */}
            <div>
              <div className="sl-learning-lists">
                <div>
                  <h3 style={{ color: 'var(--tec-gold)', marginBottom: '18px', fontSize: '1.05rem' }}>Experiential Learning</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[
                      'Educational field trips and cultural visits',
                      'Collaborative projects and group work',
                      'Guest lectures from industry professionals',
                      'Workshops and practical learning sessions',
                      'Community engagement activities',
                    ].map((item, i) => (
                      <li key={i} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, marginBottom: '12px', paddingLeft: '22px', position: 'relative', fontSize: '0.95rem' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--tec-gold)', fontWeight: 700 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 style={{ color: 'var(--tec-gold)', marginBottom: '18px', fontSize: '1.05rem' }}>Wellbeing Support</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[
                      'One-to-one counselling services',
                      'Mental health awareness workshops',
                      'Peer support networks',
                      'Connect & Chat drop-in sessions',
                      'Dedicated welfare staff on site',
                    ].map((item, i) => (
                      <li key={i} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, marginBottom: '12px', paddingLeft: '22px', position: 'relative', fontSize: '0.95rem' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--tec-gold)', fontWeight: 700 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, fontSize: '0.95rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '24px' }}>
                Our trained support staff and learning teams are here to help you thrive —
                academically, personally, and professionally. At TEC, you're never alone on your journey.
              </p>
            </div>

            {/* Right: large collage image */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/assets/images/general/student-activities.png"
                alt="Student activities and events"
                style={{ width: '100%', display: 'block', filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.4))' }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Public Events */}
      <div style={{
        backgroundImage: 'linear-gradient(rgba(26,58,42,0.82), rgba(26,58,42,0.82)), url(https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ color: 'var(--tec-white)', fontSize: '2rem', marginBottom: '20px' }}>Public Events</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.9, fontSize: '1.05rem' }}>
            Throughout the year, TEC hosts a range of public events — from open days and award
            ceremonies to community outreach programmes. These events celebrate our students'
            achievements and strengthen our ties with the wider community.
          </p>
        </div>
      </div>

      {/* Director's Message */}
      <div style={{ background: 'var(--tec-gray)', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ color: 'var(--tec-green)', textAlign: 'center', marginBottom: '40px', fontSize: '1.8rem' }}>
            Director's Message
          </h2>
          <div className="sl-director-card">
            <img
              src="/assets/images/general/pearson-partner.png"
              alt="Zaheer Ahmed, Director"
              className="sl-director-avatar"
            />
            <div>
              <p style={{ lineHeight: 1.9, color: 'var(--tec-text-light)', fontStyle: 'italic', fontSize: '1.05rem', marginBottom: '20px' }}>
                "At Trent Education Centre, we are committed to providing not just academic excellence,
                but a holistic student experience that nurtures confidence, community, and character.
                Our students are our greatest asset, and we invest in every aspect of their journey —
                inside and outside the classroom."
              </p>
              <p style={{ fontWeight: 700, color: 'var(--tec-green)' }}>Zaheer Ahmed</p>
              <p style={{ color: 'var(--tec-text-light)', fontSize: '0.9rem' }}>Director, Trent Education Centre</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--tec-green)', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--tec-white)', fontSize: '2rem', marginBottom: '24px' }}>
            Are you ready to take the next step?
          </h2>
          <a href="/apply" className="btn-primary">
            Application Form
          </a>
        </div>
      </div>

    </div>
  );
}
