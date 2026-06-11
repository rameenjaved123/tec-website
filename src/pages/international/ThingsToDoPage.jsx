import { ArrowUpRight, Landmark, ShoppingBag, Map, TreePine, MapPin, Clock, Ticket } from 'lucide-react';
import '../InnerPage.css';
import './ApplicationProcessPage.css';
import './PreArrivalPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   Things to do in Nottingham page
   Mirrors WordPress /thing-to-do-in-nottingham/ — wording verbatim.
   ════════════════════════════════════════════════════════════ */

const museums = [
  {
    name: 'Nottingham Castle',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/2-1.jpg',
    address: 'Lenton Road, Nottingham NG1 6EL',
    admission: 'Adults £15 (+ booking fee); children (15 years and under) go free (up to 3 per paying adult).',
    hours: 'Daily 10am–5pm',
    highlights: 'Museum and art galleries featuring fine art, lace, and exhibits on Robin Hood and the castle’s history.',
  },
  {
    name: 'National Justice Museum',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/3-1.jpg',
    address: 'High Pavement, Nottingham NG1 1HN',
    admission: 'Fees apply; check the official website for details.',
    hours: 'Daily 10am–5pm',
    highlights: 'Explore historic courtrooms, dungeons, and engaging exhibitions on crime and punishment.',
    btn: { label: 'Link to the fees', href: 'https://tickets.nationaljusticemuseum.org.uk/8780/9291' },
  },
  {
    name: 'Nottingham Contemporary',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/4-1.jpg',
    address: 'Weekday Cross, Nottingham NG1 2GB',
    admission: 'Free entry',
    hours: 'Tuesday–Saturday 10am–6pm; Sunday 11am–5pm; closed on Mondays',
    highlights: 'One of the largest contemporary art centers in the UK, hosting a range of exhibitions and events.',
  },
];

const markets = [
  {
    name: 'Old Market Square',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/1.jpg',
    address: 'Nottingham NG1 2DT',
    highlights: 'The largest public space in the UK, hosting regular markets, events, and a vibrant atmosphere.',
  },
  {
    name: 'Sneinton Market',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/5.jpg',
    address: 'Gedling Street, Nottingham NG1 1DS',
    hours: 'Varies by event; typically active on weekends',
    highlights: 'A hub for independent traders, artisans, and food vendors, offering a unique shopping experience.',
  },
];

const tours = [
  {
    name: 'The Robin Hood Town Tour',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/6.jpg',
    details: 'Guided walking tour exploring the legends of Robin Hood and historic Nottingham.',
    booking: { label: 'Click this link to book your tickets', href: 'https://www.visit-nottinghamshire.co.uk/whats-on/robin-hood-town-tour-p454981' },
  },
  {
    name: 'City of Caves Tour',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/7.jpg',
    details: 'Discover Nottingham’s hidden underground caves with guided tours.',
    booking: { label: 'Click this link to book your tickets', href: 'https://www.nationaljusticemuseum.org.uk/cityofcaves' },
  },
];

const parks = [
  {
    name: 'Wollaton Hall and Park',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/8.jpg',
    address: 'Wollaton, Nottingham NG8 2AE',
    highlights: '500-acre parkland with a stunning Elizabethan mansion, deer park, and lake.',
  },
  {
    name: 'The Arboretum',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/9.jpg',
    address: 'Waverley Street, Nottingham NG7 4HF',
    highlights: 'Nottingham’s oldest public park, featuring beautiful gardens, a lake, and historic monuments.',
  },
  {
    name: 'Highfields Park',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/10.jpg',
    address: 'University Boulevard, Nottingham NG7 2RD',
    highlights: 'Lakeside park offering boating, walking trails, and picturesque landscapes.',
  },
];

const learnMoreCards = [
  {
    title: 'Student Support Services',
    desc: 'Academic Support, International Student Support, Disability and Wellbeing Services.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2024/08/smiling-females-wearing-headphones-around-neck-looking-laptop-scaled.jpg',
    href: '/student-support',
    internal: true,
  },
  {
    title: 'Pre-Arrival Information',
    desc: 'Pre-departure checklist, packing essentials, important documents to carry, airport transfers and transportation options, accommodation options.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/03/10.jpg',
    href: '/pre-arrival',
    internal: true,
  },
  {
    title: 'Post-Arrival Information',
    desc: 'Complete your enrolment, collect your student ID, attend orientation sessions, and explore the campus.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/04/tec-website-photos-3.jpg',
    href: '/post-arrival',
    internal: true,
  },
  {
    title: 'Where to Eat Out in Nottingham',
    desc: 'Discover essential tips on where to find diverse and affordable food options in Nottingham.',
    img: 'https://trenteducation.co.uk/wp-content/uploads/2025/03/6-1.jpg',
    href: '/eat-out-nottingham',
    internal: true,
  },
];

function PlaceCard({ item, reverse }) {
  return (
    <div className="aap-split" style={reverse ? { flexDirection: 'row-reverse' } : {}}>
      <div className="aap-split-img">
        <img src={item.img} alt={item.name} loading="lazy" />
      </div>
      <div className="aap-split-body">
        <h3>{item.name}</h3>
        <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
          {item.address && (
            <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
              <MapPin size={16} style={{ flexShrink: 0, marginTop: 3, color: 'var(--tec-gold)' }} />
              <span><strong>Address:</strong> {item.address}</span>
            </li>
          )}
          {item.admission && (
            <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
              <Ticket size={16} style={{ flexShrink: 0, marginTop: 3, color: 'var(--tec-gold)' }} />
              <span><strong>Admission:</strong> {item.admission}</span>
            </li>
          )}
          {item.hours && (
            <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
              <Clock size={16} style={{ flexShrink: 0, marginTop: 3, color: 'var(--tec-gold)' }} />
              <span><strong>Opening Hours:</strong> {item.hours}</span>
            </li>
          )}
          {item.details && (
            <li style={{ marginBottom: 8 }}>
              <strong>Details:</strong> {item.details}
            </li>
          )}
          {item.highlights && (
            <li style={{ marginBottom: 8 }}>
              <strong>Highlights:</strong> {item.highlights}
            </li>
          )}
          {item.booking && (
            <li style={{ marginBottom: 8 }}>
              <strong>Booking:</strong> Check the official website for schedules and booking information:{' '}
              <a href={item.booking.href} target="_blank" rel="noreferrer" style={{ color: 'var(--tec-gold)', textDecoration: 'underline' }}>
                {item.booking.label}
              </a>
            </li>
          )}
        </ul>
        {item.btn && (
          <a href={item.btn.href} target="_blank" rel="noreferrer" className="aap-split-btn" style={{ marginTop: 14 }}>
            {item.btn.label} <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

function SectionHead({ icon, eyebrow, title }) {
  return (
    <div className="aap-section-head">
      <span className="aap-eyebrow">{icon} {eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function ThingsToDoPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="Things to do in Nottingham"
        subtitle="Sightseeing, tours, museums, parks, and markets — discover the city beyond your studies."
        bgImage="https://trenteducation.co.uk/wp-content/uploads/2025/03/5.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        <SectionHead icon={<Landmark size={12} />} eyebrow="Culture & Heritage" title="Museums and Galleries" />
        {museums.map((m, i) => <PlaceCard key={i} item={m} reverse={i % 2 === 1} />)}

        <SectionHead icon={<ShoppingBag size={12} />} eyebrow="Shop & Explore" title="Markets and Bazaars" />
        {markets.map((m, i) => <PlaceCard key={i} item={m} reverse={i % 2 === 1} />)}

        <SectionHead icon={<Map size={12} />} eyebrow="Guided Experiences" title="Sightseeing Tours (Fees Required)" />
        {tours.map((t, i) => <PlaceCard key={i} item={t} reverse={i % 2 === 1} />)}

        <SectionHead icon={<TreePine size={12} />} eyebrow="The Outdoors" title="Parks and Gardens (Free)" />
        {parks.map((p, i) => <PlaceCard key={i} item={p} reverse={i % 2 === 1} />)}

        {/* Learn more */}
        <h2 className="aap-learn-head">Learn more</h2>
        <div className="aap-cards-4">
          {learnMoreCards.map((c, i) => {
            const linkProps = c.internal
              ? { href: c.href }
              : { href: c.href, target: '_blank', rel: 'noreferrer' };
            return (
              <a key={i} {...linkProps} className="aap-card">
                <div className="aap-card-img">
                  <img src={c.img} alt={c.title} loading="lazy" />
                </div>
                <div className="aap-card-body">
                  <h3 className="aap-card-title">{c.title}</h3>
                  <p className="aap-card-desc">{c.desc}</p>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
}
