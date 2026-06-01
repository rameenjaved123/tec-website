import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main container">
        {/* Logo & tagline */}
        <div className="footer-brand">
          <img
            src="/assets/logos/tec-logo-transparent.png"
            alt="Trent Education Centre"
            className="footer-logo"
          />
          <p className="footer-tagline">
            Be part of our vision. <strong>Join us today and start shaping your tomorrow!</strong>
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/profile.php?id=61551912643921" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://www.linkedin.com/company/trent-education-centre-ltd/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://www.youtube.com/channel/UCUuFPZAfppw5v36Kfg1VMxg" target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube size={20} />
            </a>
            <a href="https://www.instagram.com/trent_education_centre/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Important Links</h4>
          <ul>
            <li><Link to="/english-language-courses">Courses</Link></li>
            <li><Link to="/admission">Admission</Link></li>
            <li><Link to="/approvals">Approvals</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/news-events">News &amp; Events</Link></li>
            <li><Link to="/policies">Policies</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul className="footer-contact">
            <li>
              <Phone size={15} />
              <a href="tel:+441157950171">(+44) 1157950171</a>
            </li>
            <li>
              <Mail size={15} />
              <a href="mailto:info@trenteducation.co.uk">info@trenteducation.co.uk</a>
            </li>
            <li>
              <MapPin size={15} />
              <span>Head Office: Digital House 2.3, Clarendon Park, Nottingham, NG5 1AH</span>
            </li>
          </ul>
        </div>

        {/* Study Centres */}
        <div className="footer-col">
          <h4>Our Study Centres</h4>
          <ul>
            <li><Link to="/study-centres">Nottingham</Link></li>
            <li><Link to="/study-centres">Leicester</Link></li>
            <li><Link to="/study-centres">Birmingham</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>Copyright &copy; {new Date().getFullYear()} Trent Education Centre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
