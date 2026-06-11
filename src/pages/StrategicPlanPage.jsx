import './InnerPage.css';
import './StrategicPlanPage.css';
import PageHero from '../components/PageHero';

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
            school recently or many years ago, and lack the academic skills or confidence to study at
            a university. TEC exists to support such people. We help them build their self-esteem and
            competencies, so they can succeed in education at university level and go on to career success.
          </p>
        </div>

        {/* Aim */}
        <div className="sp-section">
          <h2 className="sp-heading">Aim</h2>
          <p className="sp-body">
            Empowering futures and nurturing talent by providing the complete education journey. In its
            recent Higher Education Statement and Reform consultation response (2023), the UK Government
            recognises that the skills and education of all its citizens need to be improved in order to
            meet the challenges of the future, by providing "good quality qualifications, which equip
            students with the skills they need to achieve their potential." (Department for Education,
            2023, p. 3). TEC aims to assist the UK Government in achieving its goal by providing high
            quality qualifications, up to and including higher education, which supports students into
            gainful employment and contributes to the growth of the local and national economy. This
            strategy is fully aligned with the following UK Government statement of belief: "all students
            should expect their higher education studies to advance them on the ladder of opportunity and
            lead them into gainful employment."
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="sp-mv-grid">
          <div className="sp-mv-card">
            <p className="sp-mv-label">Mission</p>
            <p className="sp-mv-text">
              To provide students within local communities with the holistic education they need to
              improve their life chances.
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

          <h3 className="sp-subheading">Future Plans (2024)</h3>
          <p className="sp-body" style={{ marginBottom: '28px' }}>
            We have many students graduating from functional skills and vocational training courses who
            are looking for progression into university level higher education. We aspire, therefore, to
            run our own higher education courses in the near future, so that our students can complete
            their education with us. We plan to start with ATHE Level 4 in Business and Management, and
            to register with the Pearson awarding organisation to deliver the BTEC HND in Business. We
            are also applying to register with the Office for Students. Alignment with the regulatory
            body for higher education in the UK, will enhance the quality of our provision. It will also
            allow our higher education students to apply for student loan funding.
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

      {/* Strategic Objectives Tables — full width images */}
      <div className="sp-tables-section">
        <div className="container">
          <h2 className="sp-heading" style={{ marginBottom: '32px' }}>Strategic Objectives (2024-2028)</h2>
        </div>
        <img src="/assets/images/general/photo-1.jpg" alt="Strategic Objectives Table 1" className="sp-table-img" />
        <img src="/assets/images/general/photo-2.jpg" alt="Strategic Objectives Table 2" className="sp-table-img" />
        <img src="/assets/images/general/photo-3.jpg" alt="Strategic Objectives Table 3" className="sp-table-img" />
        <img src="/assets/images/general/photo-4.jpg" alt="Strategic Objectives Table 4" className="sp-table-img" />
      </div>

      {/* Appendix */}
      <div className="container inner-content" style={{ paddingTop: 0 }}>
        <div className="sp-section">
          <img
            src="/assets/images/general/photo-5.jpg"
            alt="Appendix: Calculating Academic Staff to Student Ratios"
            style={{ maxWidth: '560px', width: '100%', display: 'block', borderRadius: '8px', margin: '0 auto 0 0' }}
          />
        </div>

        {/* References */}
        <div className="sp-section">
          <h2 className="sp-heading">References</h2>
          <p className="sp-body" style={{ marginBottom: '12px' }}>
            Department for Education, 2023. Higher Education Policy Statement and Reform. [Online]<br />
            Available at:{' '}
            <a
              href="https://assets.publishing.service.gov.uk/media/6516a49b6a423b0014f4c5fe/CP876_Higher_Education_policy_statement_and_reform_government_consultation_response_web_.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1a6bb5', wordBreak: 'break-all' }}
            >
              https://assets.publishing.service.gov.uk/...CP876_Higher_Education_policy_statement_and_reform_government_consultation_response_web_.pdf
            </a><br />
            [Accessed 9 December 2023].
          </p>
          <p className="sp-body">
            Matrix, 2023. The Matrix Standard. [Online]<br />
            Available at:{' '}
            <a href="https://matrixstandard.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#1a6bb5' }}>
              https://matrixstandard.com/
            </a><br />
            [Accessed 08-12-2023 December 2023].
          </p>
        </div>
      </div>

    </div>
  );
}
