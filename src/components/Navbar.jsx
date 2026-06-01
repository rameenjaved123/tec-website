import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Search } from 'lucide-react';
import './Navbar.css';


const IS_DEV = import.meta.env.DEV;

const ALL_PAGES = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Mission & Values', path: '/mission-values' },
  { label: 'Our Study Centres', path: '/study-centres' },
  { label: 'Carbon Reduction Plan', path: '/carbon-reduction-plan' },
  { label: 'Student Life', path: '/student-life' },
  { label: 'Strategic Plan 2024–2028', path: '/strategic-plan' },
  { label: 'Approvals & Accreditations', path: '/approvals' },
  { label: 'Awarding Organisations', path: '/awarding-organisations' },
  { label: 'Accreditations', path: '/accreditations' },
  { label: 'Approved Supplier Status', path: '/approved-supplier-status' },
  { label: 'Memberships (PSRB)', path: '/memberships' },
  { label: 'Careers', path: '/careers' },
  { label: 'News & Events', path: '/news-events' },
  { label: 'Complaints', path: '/complaint' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Admission', path: '/admission' },
  { label: 'Enrolment / Apply', path: '/apply' },
  { label: 'English Language Courses', path: '/english-language-courses' },
  { label: 'Policies for English Language Courses', path: '/policies-english' },
  { label: 'Higher Education Courses', path: '/higher-education' },
  { label: 'ATHE Level 4 Extended Diploma in Business', path: '/athe-level-4' },
  { label: 'ATHE Level 5 Extended Diploma in Business', path: '/athe-level-5' },
  { label: 'Pearson BTEC Level 4 & 5 HND in Business', path: '/btec-hnd' },
  { label: 'Further Education Courses', path: '/further-education' },
  { label: 'ATHE Level 3 Diploma in Business', path: '/athe-level-3' },
  { label: 'NCFE Level 1 Functional Skills in Maths', path: '/ncfe-maths-l1' },
  { label: 'NCFE Level 2 Functional Skills in Maths', path: '/ncfe-maths-l2' },
  { label: 'SIA Level 2 Award for Door Supervisors', path: '/sia-door-supervisors' },
  { label: 'Digital Skills for Beginners', path: '/digital-skills' },
  { label: 'Policies', path: '/policies' },
];

function DevSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = query.trim().length > 0
    ? ALL_PAGES.filter(p => p.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); setQuery(''); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const go = (path) => {
    navigate(path);
    setOpen(false);
    setQuery('');
  };

  return (
    <div className="dev-search-wrap">
      <button
        className="dev-search-btn"
        onClick={() => setOpen(o => !o)}
        title="Dev search (local only)"
      >
        <Search size={16} />
        <span className="dev-search-label">Search</span>
        <span className="dev-badge">DEV</span>
      </button>

      {open && (
        <div className="dev-search-panel">
          <input
            ref={inputRef}
            className="dev-search-input"
            placeholder="Search pages…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <ul className="dev-search-results">
              {results.map((r, i) => (
                <li key={i}>
                  <button onClick={() => go(r.path)}>
                    <span>{r.label}</span>
                    <span className="dev-result-path">{r.path}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {query.trim().length > 0 && results.length === 0 && (
            <div className="dev-no-results">No pages found</div>
          )}
        </div>
      )}
    </div>
  );
}

const navItems = [
  {
    label: 'Admission',
    path: '/admission',
    children: [
      { label: 'Overview', path: '/admission' },
      { label: 'Enrolment', path: '/apply' },
    ],
  },
  {
    label: 'English Language Courses',
    path: '/english-language-courses',
    children: [
      { label: 'About our English Language Courses', path: '/english-language-courses' },
      { label: 'Policies for English Language Courses', path: '/policies-english' },
    ],
  },
  {
    label: 'Higher Education Courses',
    path: '/higher-education',
    children: [
      {
        label: 'ATHE Level 4 & 5 Extended Diploma in Business',
        path: '/athe-level-4-5',
        children: [
          { label: 'ATHE Level 4 Extended Diploma in Business and Management', path: '/athe-level-4' },
          { label: 'ATHE Level 5 Extended Diploma in Business and Management', path: '/athe-level-5' },
        ],
      },
      { label: 'Pearson BTEC Level 4 & 5 HND in Business', path: '/btec-hnd' },
    ],
  },
  {
    label: 'Further Education Courses',
    path: '/further-education',
    children: [
      { label: 'ATHE Level 3 Diploma in Business', path: '/athe-level-3' },
      { label: 'NCFE Level 1 Functional Skills in Maths', path: '/ncfe-maths-l1' },
      { label: 'NCFE Level 2 Functional Skills in Maths', path: '/ncfe-maths-l2' },
      { label: 'SIA Level 2 Award for Door Supervisors', path: '/sia-door-supervisors' },
      { label: 'Digital Skills for Beginners', path: '/digital-skills' },
    ],
  },
  {
    label: 'About',
    path: '/about',
    children: [
      { label: 'Overview', path: '/about' },
      { label: 'Mission & Values', path: '/mission-values' },
      { label: 'Our Study Centres', path: '/study-centres' },
      { label: 'Carbon Reduction Plan', path: '/carbon-reduction-plan' },
      { label: 'Student Life', path: '/student-life' },
      { label: 'Strategic Plan 2024–2028', path: '/strategic-plan' },
      {
        label: 'Approvals',
        path: '/approvals',
        children: [
          { label: 'Awarding Organisations', path: '/awarding-organisations' },
          { label: 'Accreditations', path: '/accreditations' },
          { label: 'Approved Supplier Status', path: '/approved-supplier-status' },
        ],
      },
      { label: 'Memberships (PSRB)', path: '/memberships' },
      { label: 'Careers', path: '/careers' },
      { label: 'News & Events', path: '/news-events' },
      { label: 'Complaints', path: '/complaint' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
  {
    label: 'Policies',
    path: '/policies',
  },
];

function DropdownMenu({ items, depth = 0 }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <ul className={`dropdown depth-${depth}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className={item.children ? 'has-sub' : ''}
          onMouseEnter={() => item.children && setOpenIndex(i)}
          onMouseLeave={() => setOpenIndex(null)}
        >
          {item.noLink ? (
            <span className="dropdown-link no-navigate">
              {item.label}
              {item.children && <ChevronDown size={14} className="sub-arrow" />}
            </span>
          ) : item.path ? (
            <Link to={item.path} className="dropdown-link">
              {item.label}
              {item.children && <ChevronDown size={14} className="sub-arrow" />}
            </Link>
          ) : (
            <span className="dropdown-link no-navigate">
              {item.label}
              {item.children && <ChevronDown size={14} className="sub-arrow" />}
            </span>
          )}
          {item.children && openIndex === i && (
            <DropdownMenu items={item.children} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const timeoutRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location]);

  const handleMouseEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setOpenMenu(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img
            src="/assets/logos/tec-logo-transparent.png"
            alt="Trent Education Centre"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-desktop">
          {navItems.map((item, i) => (
            <div
              key={i}
              className="nav-item"
              onMouseEnter={() => item.children && handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={item.path} className="nav-link">
                {item.label}
                {item.children && <ChevronDown size={14} className="nav-arrow" />}
              </Link>
              {item.children && openMenu === i && (
                <DropdownMenu items={item.children} />
              )}
            </div>
          ))}
        </nav>

        {/* Dev-only search */}
        {IS_DEV && <DevSearch />}

        {/* Mobile toggle */}
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {navItems.map((item, i) => (
            <div key={i} className="mobile-item">
              <div
                className="mobile-link"
                onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
              >
                <Link to={item.path}>{item.label}</Link>
                {item.children && (
                  <ChevronDown
                    size={16}
                    className={`mobile-arrow ${mobileExpanded === i ? 'open' : ''}`}
                  />
                )}
              </div>
              {item.children && mobileExpanded === i && (
                <div className="mobile-sub">
                  {item.children.map((sub, j) => (
                    <Link key={j} to={sub.path} className="mobile-sub-link">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
