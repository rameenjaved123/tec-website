import { ShoppingCart, Globe, Lightbulb, MapPin } from 'lucide-react';
import '../InnerPage.css';
import './ApplicationProcessPage.css';
import './PreArrivalPage.css';
import PageHero from '../../components/PageHero';

/* ════════════════════════════════════════════════════════════
   What to Eat Out in Nottingham page
   Mirrors WordPress /what-to-eat-out-in-nottingham/ — wording verbatim.
   ════════════════════════════════════════════════════════════ */

const regions = [
  {
    name: 'Africa & Caribbean',
    shops: [
      { name: 'Thamars Foods', desc: 'Specialises in Afro-Caribbean essentials like spices, fresh produce, pastries and snacks.', address: '3 Carlton Rd, NG3 2DG' },
      { name: '1212 Afro-Caribbean Food Shop', desc: 'Stocking goods from South Africa, Ghana, Nigeria, Jamaica; fresh spices and more.', address: '43 Mansfield Rd, NG1 3FB' },
      { name: 'Dammy African Food', desc: 'Great bulk deals on staples like rice and noodles.', address: '3 Carlton Rd, NG3 2L' },
    ],
    restaurants: [
      { name: 'Jollof Flavours West African', desc: 'Affordable halal dishes from Nigeria, Gambia, Senegal, plus African teas and desserts.', address: 'Terrace St, NG7 6ER' },
      { name: 'Pendy’s Caribbean Cuisine', desc: 'Try patties, saltfish, turnovers; dine in or takeaway.', address: '3 Radford Road, NG7 5DQ' },
      { name: 'Turtle Bay', desc: 'A laid-back Caribbean restaurant & cocktail bar near city campus.', address: '12 Trinity Sq, NG1 4DB' },
    ],
  },
  {
    name: 'Asia',
    shops: [
      { name: 'Oriental Mart', desc: 'Stocked with Japanese, Indian, Thai, Chinese ingredients, frozen meats, noodles.', address: '1A Goldsmith St, NG1 5ED' },
      { name: 'Asiana Express', desc: 'Ideal for sweets, buns, bubble tea, and Asian staples.', address: '54–56 Goose Gate, NG1 1FF' },
      { name: 'Asiana Hypermarket', desc: 'Extensive range across Chinese, Korean, Vietnamese, Indian and other Asian foods.', address: '108 Woodborough Rd, NG3 1AR' },
      { name: 'Fresh Asian Food Mart & Medina Continental & Falcon Supermarket', desc: 'Great for fresh produce, halal meats, and multi-region ingredients.', address: 'Various central locations' },
    ],
    restaurants: [
      { name: 'Zaap Thai', desc: 'Authentic Thai street food like Pad Thai, Tom Yum.', address: '6 Bromley Pl, NG1 6JG' },
      { name: 'Viet80s', desc: 'Vietnamese dishes in nostalgic décor.', address: '57–59 Friar Ln, NG1 6DH' },
      { name: 'Sarangchae', desc: 'Korean fried chicken hotspot.', address: '278–280 Huntingdon St, NG1 3NA' },
      { name: 'Panasia, Mowgli, Memsaab, Kayal, Colombo Street', desc: 'Pan-Asian, Indian regional cuisine, Sri Lankan dishes—all within easy reach of campus.', address: 'Various Lace Market locations' },
    ],
  },
  {
    name: 'Middle Eastern',
    shops: [
      { name: 'Ozan International Food Centre', desc: 'Middle Eastern staples, butcher counter, pastries like baklava and halva.', address: '586–590 Mansfield Rd, NG5 2FS' },
      { name: 'Murat International Food Store', desc: 'Middle Eastern, Polish, Turkish, Indian and Pakistani groceries.', address: '30–40 Bath Street, Sneinton, NG3 1JB' },
    ],
    restaurants: [
      { name: 'Pistachio Bar & Kitchen', desc: 'A Persian tapas-style experience with vegan & vegetarian selections.', address: '509 Mansfield Rd, Sherwood, NG5 2JL' },
      { name: 'Palms Cafe', desc: 'Casual Lebanese, Jordanian, Syrian & Palestinian cuisine near campus.', address: '3 Goldsmith St, NG1 6LP' },
    ],
  },
  {
    name: 'Americas',
    shops: [
      { name: 'Made In Brazil Market', desc: 'Latin American staples, fresh pastries, delivery options.', address: '11 Carlton Rd, NG3 2DG' },
      { name: '1212 Afro-Caribbean Food Shop', desc: 'Also stock Latin ingredients.', address: '43 Mansfield Rd, NG1 3FB' },
      { name: 'Bensons Sweet Shop', desc: 'American candy and snacks in Victoria Centre.', address: 'NG1 3QE' },
    ],
    restaurants: [
      { name: 'Las Iguanas', desc: 'Latin American dishes like fajitas, Brazilian moqueca.', address: 'Chapel Quarter, NG1 6JS' },
      { name: 'Annie’s Burger Shack', desc: 'Hearty American burgers and breakfast fare.', address: '5 Broadway, NG1 1PR' },
      { name: 'Ed’s Easy Diner', desc: 'Classic diner comfort food and milkshakes, in Victoria Centre.', address: 'Unit R10, Victoria Centre, NG1 3QN' },
      { name: 'Revolución de Cuba', desc: 'Cuban tapas, live music, salsa nights.', address: '26–28 Market St, NG1 6HW' },
    ],
  },
];

const tips = [
  { title: 'Late-night cravings?', text: 'City-centre supermarkets often stay open until 11 pm.' },
  { title: 'Picnic hotspots:', text: 'Pack snacks and head to the canal, Arboretum, or Wollaton Park for a scenic meal outdoors.' },
  { title: 'Looking for variety?', text: 'Visit Hockley and Lace Market—they’re bursting with independent cafés, bars, and eateries.' },
];

const learnMoreCards = [
  {
    title: 'Things to do in Nottingham',
    desc: 'Sightseeing, tours, museums, parks, and markets.',
    img: '/uploads/2025/03/5.jpg',
    href: '/things-to-do-nottingham',
    internal: true,
  },
  {
    title: 'Fees and Funding',
    desc: 'Tuition fees and payment plans, opening a UK bank account, scholarships and funding opportunities.',
    img: '/uploads/2025/06/Multi-faith-6.jpg',
    href: '/fees-and-funding',
    internal: true,
  },
  {
    title: 'Student Support Services',
    desc: 'Academic Support, International Student Support, Disability and Wellbeing Services.',
    img: '/uploads/2024/08/smiling-females-wearing-headphones-around-neck-looking-laptop-scaled.jpg',
    href: '/student-support',
    internal: true,
  },
  {
    title: 'Pre-Arrival Information',
    desc: 'Pre-departure checklist, packing essentials, important documents, transportation and accommodation options.',
    img: '/uploads/2025/03/10.jpg',
    href: '/pre-arrival',
    internal: true,
  },
];

function RegionCard({ region }) {
  return (
    <div className="pa-info" style={{ marginBottom: 24 }}>
      <div className="pa-info-head">
        <span className="pa-info-icon"><Globe size={18} /></span>
        <h3>{region.name}</h3>
      </div>
      <div className="pa-two-col" style={{ gap: 24 }}>
        <div>
          <h5 style={{ color: 'var(--tec-gold)', marginBottom: 12, marginTop: 0 }}>Shops & Grocery</h5>
          <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
            {region.shops.map((s, i) => (
              <li key={i} style={{ marginBottom: 14 }}>
                <strong>{s.name}</strong> — {s.desc}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontStyle: 'italic', opacity: 0.85, marginTop: 4, fontSize: '0.9em' }}>
                  <MapPin size={13} style={{ color: 'var(--tec-gold)' }} /> {s.address}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 style={{ color: 'var(--tec-gold)', marginBottom: 12, marginTop: 0 }}>Restaurants</h5>
          <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
            {region.restaurants.map((r, i) => (
              <li key={i} style={{ marginBottom: 14 }}>
                <strong>{r.name}</strong> — {r.desc}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontStyle: 'italic', opacity: 0.85, marginTop: 4, fontSize: '0.9em' }}>
                  <MapPin size={13} style={{ color: 'var(--tec-gold)' }} /> {r.address}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function EatOutPage() {
  return (
    <div className="inner-page page-enter">
      <PageHero
        title="What to Eat Out in Nottingham"
        subtitle="From local favourites to global flavours — your student guide to grocery shops, street eats and restaurants across the city."
        bgImage="/uploads/2025/07/tec-website-photos-29.7-x-21-cm.jpg"
        bgPosition="center 40%"
      />

      <div className="container inner-content">

        {/* Intro split */}
        <div className="aap-intro-split">
          <h2>From Local Favourites to Global Flavours</h2>
          <p>
            Nottingham is a vibrant city with a rich culinary scene, offering flavours from
            around the globe. Whether you’re craving comfort food, international street
            eats, or plant-based cuisine, here is your guide to the best places to grab a
            bite while studying here.
          </p>
        </div>

        {/* Step 1 — Everyday Grocery Shopping */}
        <div className="aap-split">
          <div className="aap-split-img">
            <img
              src="/uploads/2025/07/tec-website-photos-29.7-x-21-cm.jpg"
              alt="Everyday grocery shopping in Nottingham"
              loading="lazy"
            />
          </div>
          <div className="aap-split-body">
            <span className="aap-split-eyebrow">1 · Everyday Essentials</span>
            <h3>Everyday Grocery Shopping</h3>
            <p>
              You will find all major UK supermarkets — <strong>Tesco, Sainsbury’s, Aldi,
              Lidl</strong>, and <strong>Waitrose</strong> close to campus, open daily with
              extended hours in the city centre. These stores offer a wide selection of
              global food items, fresh produce, and ready meals for easy weeknight cooking.
            </p>
          </div>
        </div>

        {/* Section 2 — Regional Picks */}
        <div className="aap-section-head">
          <span className="aap-eyebrow"><ShoppingCart size={12} /> 2 · Regional Food & Grocery Picks</span>
          <h2>Shops and Restaurants by Region</h2>
          <p>
            Wherever you’re from — or whatever you’re craving — Nottingham’s independent
            food scene has something for you. Explore staples and standout restaurants
            grouped by region below.
          </p>
        </div>

        {regions.map((r, i) => <RegionCard key={i} region={r} />)}

        {/* Section 3 — Tips */}
        <div className="aap-section-head">
          <span className="aap-eyebrow"><Lightbulb size={12} /> 3 · Student Tips</span>
          <h2>Make the most of mealtimes</h2>
        </div>

        <div className="pa-two-col">
          {tips.map((t, i) => (
            <div key={i} className="pa-info">
              <div className="pa-info-head">
                <span className="pa-info-icon"><Lightbulb size={18} /></span>
                <h3>{t.title}</h3>
              </div>
              <p>{t.text}</p>
            </div>
          ))}
        </div>

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
