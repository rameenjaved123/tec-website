import './InnerPage.css';
import PageHero from '../components/PageHero';

export default function CarbonReductionPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Carbon Reduction Plan"
        subtitle="Our commitment to a sustainable future"
        bgImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80"
        bgPosition="center 30%"
        bgSize="70%"
      />

      <div className="container inner-content">

        <div className="two-col" style={{ marginBottom: '48px' }}>
          <div className="main-col">
            <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--tec-text-light)', marginBottom: '32px' }}>
              At Trent Education Centre (TEC), we recognise the importance of addressing climate change
              and are committed to reducing our environmental impact. As part of our sustainability
              journey, we are in the early stages of developing a comprehensive Carbon Reduction Plan
              to guide our efforts in minimising our carbon footprint and contributing to global
              sustainability goals.
            </p>

            <h2>Our Commitment</h2>
            <p>
              We pledge to work towards achieving <strong>Net Zero carbon emissions by 2050</strong>,
              aligning with national and international climate targets.
            </p>

            <h3>Initial Steps</h3>
            <ul className="styled-list" style={{ listStyle: 'disc', paddingLeft: '20px', display: 'block' }}>
              <li style={{ marginBottom: '12px', color: 'var(--tec-text-light)', lineHeight: 1.8 }}>
                <strong>Carbon Baseline Assessment:</strong> We are in the process of conducting a carbon
                audit to understand our current emissions and identify key areas for improvement, such
                as energy use, waste management, and transportation.
              </li>
              <li style={{ marginBottom: '12px', color: 'var(--tec-text-light)', lineHeight: 1.8 }}>
                <strong>Formulating a Strategy:</strong> Based on the findings of the audit, we will
                develop a strategic roadmap that outlines clear, measurable actions to reduce carbon
                emissions in all our study centres, including those we rent to third parties.
              </li>
              <li style={{ marginBottom: '12px', color: 'var(--tec-text-light)', lineHeight: 1.8 }}>
                <strong>Energy Efficiency Initiatives:</strong> Our first focus will be on improving
                the energy efficiency of our estates, exploring opportunities for renewable energy
                sources like solar and wind, and upgrading existing infrastructure for greater
                sustainability.
              </li>
            </ul>

            <h3>Future Goals</h3>
            <p>
              <strong>Short-Term Targets:</strong> We will establish interim carbon reduction targets
              by 2030, ensuring we are on a steady path to meet our Net Zero goal.
            </p>
            <p>
              <strong>Sustainable Study Centre Practices:</strong> Over the next year, we will
              introduce initiatives aimed at reducing waste, promoting recycling, and enhancing
              sustainable transportation options, including the installation of electric vehicle (EV)
              charging stations.
            </p>

            <h3>Collaborative Approach</h3>
            <p>
              We believe in fostering a culture of sustainability across the entire organisation. As we
              move forward with our Carbon Reduction Plan, we will actively engage with all our
              stakeholders including students, staff, tenants, and the wider community through
              workshops, campaigns, and research-based initiatives aimed at promoting and enhancing
              sustainable practices.
            </p>

            <h3>Looking Ahead</h3>
            <p>
              As we continue our journey towards Net Zero carbon emissions, we will publish carbon
              reduction updates on our website, sharing our commitment and contribution to creating a
              more sustainable future.
            </p>
          </div>

          <div className="side-col">
            <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img
                src="/assets/images/general/carbon-zero.jpg"
                alt="Net Zero by 2050"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="side-card">
              <h4>Net Zero by 2050</h4>
              <p>Our pledge to achieve net zero carbon emissions, aligned with national and international climate targets.</p>
            </div>
            <div className="side-card">
              <h4>2030 Interim Targets</h4>
              <p>Establishing short-term milestones to keep us on track toward our long-term sustainability goals.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
