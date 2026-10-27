import '../InnerPage.css';
import './StrategicPlanPage.css';
import PageHero from '../../components/PageHero';

const values = [
  { label: 'Respect', desc: 'commending courage and commitment for those returning to education' },
  { label: 'Integrity', desc: 'authenticity and credibility in academic and working practices' },
  { label: 'Inclusion', desc: 'widening participation so that no-one gets left behind' },
  { label: 'Creativity', desc: 'experimenting with new approaches to learning, teaching and assessment' },
  { label: 'Aspiration', desc: 'striving to reach beyond expectations' },
  { label: 'Sustainability', desc: 'securing a future for individuals, their families and communities' },
  { label: 'Professionalism', desc: 'working to high academic and service standards and sharing expertise' },
];

const priorities = [
  'Deliver high quality learning, teaching and assessment from basic skills up to and including university level education',
  'Widen university level access to people from under-represented and disadvantaged communities',
  'Give people the opportunity to develop the employability skills they need for gainful employment and career success',
  'Enhance learning through the ongoing development and improvement of the TEC holistic approach to education',
  'Develop the quality and international recognition of our English language courses to meet the needs of local and international students aiming to improve their life chances',
];

export default function StrategicPlanPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Strategic Plan 2024 – 2028"
        subtitle="Our vision for the future"
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
        bgPosition="center center"
      />

      <div className="container inner-content">

        {/* Purpose */}
        <div className="sp-section">
          <h2 className="sp-heading">Purpose</h2>
          <p className="sp-body">
            Trent Education Centre (TEC) has been providing functional skills and vocational training
            courses to adults in Nottingham, Leicester and Birmingham since 2012. Many of the people
            we support believe that they have missed their chance for an education. They may have left
            school recently or many years ago and lack the academic skills or confidence to study at
            a university. TEC exists to support such people. We help them build their self-esteem and
            competencies including English language skills, so they can succeed in education at
            university level and go on to career success.
          </p>
        </div>

        {/* Aim */}
        <div className="sp-section">
          <h2 className="sp-heading">Aim</h2>
          <p className="sp-body" style={{ marginBottom: '20px' }}>
            Empowering futures and nurturing talent by providing the complete education journey.
          </p>
          <p className="sp-body" style={{ marginBottom: '20px' }}>
            In its recent Higher Education Statement and Reform consultation response (2023), the UK
            Government recognises that the skills and education of all its citizens need to be improved
            in order to meet the challenges of the future, by providing "good quality qualifications,
            which equip students with the skills they need to achieve their potential." (Department for
            Education, 2023, p. 3).
          </p>
          <p className="sp-body" style={{ marginBottom: '20px' }}>
            TEC aims to assist the UK Government in achieving its goal by providing high quality
            qualifications, up to and including higher education, which supports students into gainful
            employment and contributes to the growth of the local and national economy. This strategy is
            fully aligned with the following UK Government statement of belief:
          </p>
          <p className="sp-body">
            "all students should expect their higher education studies to advance them on the ladder of
            opportunity and lead them into gainful employment. Higher education qualifications should be
            of a high quality, give students the skills they need to improve their outcomes in life, and
            support the growth of our economy by embedding careers-based learning throughout the course
            of their studies." (Department for Education, 2023, p. 5).
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="sp-mv-grid">
          <div className="sp-mv-card">
            <p className="sp-mv-label">Mission</p>
            <p className="sp-mv-text">
              To provide students within local and international communities with the holistic education
              they need to improve their life chances.
            </p>
          </div>
          <div className="sp-mv-card">
            <p className="sp-mv-label">Vision</p>
            <p className="sp-mv-text">
              To become a foremost provider of the complete education journey, supporting adults from
              basic skills courses up to university degrees and career success.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="sp-section sp-values-section">
          <h2 className="sp-heading">Values</h2>
          <p className="sp-body" style={{ marginBottom: '28px' }}>
            Trent Education Centre prioritises the well-being and growth of the people we exist to serve,
            underpinned by our core values:
          </p>
          <div className="sp-values-grid">
            {values.map((v, i) => (
              <div key={i} className="sp-value-card">
                <span className="sp-value-label">{v.label}</span>
                <span className="sp-value-desc">{v.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Holistic Approach */}
        <div className="sp-section">
          <h2 className="sp-heading">Our Holistic Approach to Education</h2>
          <p className="sp-body" style={{ marginBottom: '28px' }}>
            We believe that the well-being and personal growth of our students is essential to their
            academic achievement and career success. We focus, therefore, on integrating personal, social
            and emotional development, with the knowledge and skills required for university level
            qualifications, and the modern workplace.
          </p>

          <h3 className="sp-subheading">Future Plans (2024-2026)</h3>
          <p className="sp-body" style={{ marginBottom: '20px' }}>
            We have many students graduating from NCFE Functional Skills Level 2 English and vocational
            training courses who are looking for progression into university-level higher education. We
            have therefore begun to deliver our own higher education programmes so that students can
            complete their full education journey with us. Our first cohort of the ATHE Level 5 Extended
            Diploma in Business and Management will complete in 2026, and we have registered with the
            Pearson awarding body to deliver the BTEC HND in Business. We have also applied to register
            with the Office for Students (OfS). Alignment with the UK higher education regulatory
            framework will enhance the quality of our provision and enable eligible students to apply for
            student loan funding.
          </p>
          <p className="sp-body" style={{ marginBottom: '20px' }}>
            In 2025, we established an English Language Study Centre at our Castle Boulevard site in
            Nottingham and registered with the Ascentis awarding body to deliver ESOL courses from Entry 1
            to Level 2. We also became a British Council IELTS Registration Centre and attained ASIC
            accreditation. We are currently running NCFE Functional Skills English courses (Levels 1 and
            2) and Ascentis ESOL Entry 2 courses at the Study Centre.
          </p>
          <p className="sp-body" style={{ marginBottom: '20px' }}>
            We have applied for British Council Accreditation UK to enhance the quality of our English
            language provision and to enable us to recruit international students to study in Nottingham.
            Following the British Council inspection in March 2026, we expect an accreditation decision in
            May 2026.
          </p>
          <p className="sp-body" style={{ marginBottom: '28px' }}>
            From 2026 to 2028, we aim to recruit international students and expand our English language
            offer. By 2027, we plan to run IELTS Preparation courses and English for Academic Purposes
            courses alongside our Functional Skills English and ESOL provision, supporting progression
            into higher education and improving local and international student outcomes.
          </p>

          <h3 className="sp-subheading">Strategic Priorities (2024-2028)</h3>
          <p className="sp-body" style={{ marginBottom: '20px' }}>Our priorities meet the needs of the communities we serve:</p>
          <ol className="sp-priorities-list">
            {priorities.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </div>

      </div>

    </div>
  );
}
