import './PageHero.css';

const DEFAULT_BG = '/assets/images/general/student-unsplash.jpg';

/**
 * Consistent full-width photo hero used on every inner page.
 * Props:
 *   title     – white text inside the green box
 *   subtitle  – optional muted text rendered below the banner (constrained to box width)
 *   bgImage   – optional URL; falls back to DEFAULT_BG
 *   centered  – when true, title box sits centred inside the banner (no bottom overlap)
 */
export default function PageHero({ title, subtitle, bgImage, bgPosition, bgSize, children, centered }) {
  const bannerStyle = {
    backgroundImage: `url(${bgImage || DEFAULT_BG})`,
    backgroundPosition: bgPosition || 'center top',
    backgroundSize: bgSize || 'cover',
  };

  if (centered) {
    return (
      <>
        <div className="ph-banner ph-centered" style={bannerStyle}>
          <div className="ph-overlay" />
          <div className="ph-box-row ph-box-row--inside">
            <div className="ph-box">
              <h1>{title}</h1>
              {children && <div className="ph-box-extra">{children}</div>}
            </div>
          </div>
        </div>
        {subtitle && (
          <div className="ph-subtitle">
            <p>{subtitle}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="ph-banner" style={bannerStyle}>
        <div className="ph-overlay" />
      </div>

      {/* green title box overlaps the bottom of the banner */}
      <div className="ph-box-row">
        <div className="ph-box">
          <h1>{title}</h1>
          {children && <div className="ph-box-extra">{children}</div>}
        </div>
      </div>

      {subtitle && (
        <div className="ph-subtitle">
          <p>{subtitle}</p>
        </div>
      )}
    </>
  );
}
