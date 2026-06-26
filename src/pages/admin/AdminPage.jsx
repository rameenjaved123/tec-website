import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    window.location.href = 'https://cms.trenteducation.ac.uk';
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Redirecting to the TEC Management System…</p>
    </div>
  );
}
