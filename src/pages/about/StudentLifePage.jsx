import '../InnerPage.css';
import './StudentLifePage.css';
import PageHero from '../../components/PageHero';

export default function StudentLifePage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Student Life"
        subtitle="Life at Trent Education Centre"
        bgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
        bgPosition="center center"
      />

      {/* ── Student Council ─────────────────────────────── */}
      <section className="sl-council-section">
        <div className="container">
          <div className="sl-section-label">Our Students</div>

          {/* Two-column header: heading on left, intro paragraph on right (with green divider) */}
          <div className="sl-council-hero">
            <h2 className="sl-section-heading">Shaping TEC Together: The Student Council</h2>
            <div className="sl-council-hero-text">
              <p>
                Trent Education Centre (TEC) has a Student Council consisting of a Student President
                and other student representatives from Study Centres in Nottingham, Leicester, and Birmingham.
              </p>
            </div>
          </div>

          <div className="sl-council-body">
            <p>
              The Student Council meets throughout the year and the Student President and
              Vice-President are members of the TEC Board of Governors and Academic Board.
              This demonstrates our commitment to engaging students in our decision-making
              processes and enhancing the holistic education we provide. The Student Council
              receives training and support in how to effectively represent their fellow
              students. The Student Council develops an annual calendar of social and
              educational events that meet the needs and preferences of students.
            </p>
          </div>
        </div>
      </section>

      {/* ── Facilities ──────────────────────────────────── */}
      <section className="sl-facility-section">
        <div className="sl-facility-content">
          <div className="sl-section-label sl-label-light">Our Campuses</div>
          <h2>Well-Equipped Educational Facilities</h2>
          <p>
            Our Study Centres in Nottingham, Leicester and Birmingham have newly fitted
            IT equipment, including laptops and PCs with projectors and Smart Boards.
            Classrooms are spacious and designed for flexible seating arrangement so that
            you can participate in engaging lessons with good variety of interaction for
            knowledge and skills development.
          </p>
        </div>
      </section>

      {/* ── Learning & Wellbeing ─────────────────────────── */}
      <section className="sl-wellbeing-section">
        <div className="container">
          <div className="sl-wellbeing-header">
            <div className="sl-section-label sl-label-light">Beyond Academia</div>
            <h2>Learning &amp; Wellbeing<br/>Beyond the Classroom</h2>
            <p>
              Our trained support staff and learning teams are here to help you thrive —
              academically, personally, and professionally. At TEC, you're never alone on your journey.
            </p>
          </div>
        </div>

        <div className="sl-wellbeing-img-wrap">
          <img
            src="/assets/images/general/student-activities.png"
            alt="Student activities and events at TEC"
          />
        </div>

        <div className="container">
          <div className="sl-wellbeing-lists">
            <div className="sl-wellbeing-col">
              <h3>Experiential Learning</h3>
              <ul>
                {[
                  'Educational field trips and cultural visits',
                  'Collaborative projects and group work',
                  'Guest lectures from industry professionals',
                  'Workshops and practical learning sessions',
                  'Community engagement activities',
                ].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="sl-wellbeing-col">
              <h3>Wellbeing Support</h3>
              <ul>
                {[
                  'One-to-one counselling services',
                  'Mental health awareness workshops',
                  'Peer support networks',
                  'Connect & Chat drop-in sessions',
                  'Dedicated welfare staff on site',
                ].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Public Events ───────────────────────────────── */}
      <section className="sl-events-section">
        <div className="container">
          <div className="sl-section-label sl-label-light">Community</div>
          <h2>Public Events</h2>
          <p>
            Throughout the year, TEC hosts a range of public events — from open days and award
            ceremonies to community outreach programmes. These events celebrate our students'
            achievements and strengthen our ties with the wider community.
          </p>
        </div>
      </section>

      {/* ── Director's Message ──────────────────────────── */}
      <section className="sl-director-section">
        <div className="container">
          <div className="sl-section-label">Leadership</div>
          <h2 className="sl-section-heading">Director's Message</h2>
          <div className="sl-section-rule" />
          <div className="sl-director-card">
            <div className="sl-director-quote-mark">"</div>
            <blockquote>
              At Trent Education Centre, we are committed to providing not just academic
              excellence, but a holistic student experience that nurtures confidence,
              community, and character. Our students are our greatest asset, and we invest
              in every aspect of their journey — inside and outside the classroom.
            </blockquote>
            <div className="sl-director-author">
              <img
                src="/assets/images/general/pearson-partner.png"
                alt="Zaheer Ahmed, Director"
                className="sl-director-avatar"
              />
              <div>
                <strong>Zaheer Ahmed</strong>
                <span>Director, Trent Education Centre</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="sl-cta-section">
        <div className="container">
          <h2>Ready to take the next step?</h2>
          <p>Join thousands of students building their future at Trent Education Centre.</p>
          <a href="/apply" className="sl-cta-btn">Apply Now</a>
        </div>
      </section>

    </div>
  );
}
