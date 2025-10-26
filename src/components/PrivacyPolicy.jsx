import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8f9fa',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div style={{ 
          background: 'white', 
          padding: '3rem', 
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <Link to="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: '#4361ee',
            textDecoration: 'none',
            marginBottom: '2rem',
            fontWeight: '600'
          }}>
            <i className="fas fa-arrow-left"></i>
            Back to Convert Craft
          </Link>

          <h1 style={{ color: '#2d3748', marginBottom: '1rem' }}>Privacy Policy</h1>
          <p style={{ color: '#718096', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

          <div style={{ lineHeight: '1.8', color: '#4a5568' }}>
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>1. Information We Collect</h2>
              <p>Convert Craft is committed to protecting your privacy. We collect minimal information to provide our services:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li><strong>Files you upload:</strong> All file processing happens in your browser. We do not store, transmit, or save your files on our servers.</li>
                <li><strong>Usage data:</strong> We may collect anonymous usage statistics to improve our service.</li>
                <li><strong>Technical information:</strong> Browser type, device information, and IP address for analytics.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>To provide and maintain our PDF conversion services</li>
                <li>To improve user experience and service quality</li>
                <li>To analyze usage patterns and optimize our tools</li>
                <li>To display relevant advertisements (when applicable)</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>3. File Processing & Security</h2>
              <p>Your privacy and security are our top priorities:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>All file conversions happen locally in your web browser</li>
                <li>We do not upload your files to any server</li>
                <li>Your files are never stored on our systems</li>
                <li>Once you close the browser tab, all file data is cleared</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>4. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li><strong>Google Analytics:</strong> To understand how users interact with our site</li>
                <li><strong>Google Adsense:</strong> To display relevant advertisements (when enabled)</li>
                <li><strong>Vercel/Netlify:</strong> For hosting and deployment services</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>5. Cookies</h2>
              <p>We use cookies to:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Serve relevant advertisements</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Access any personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of analytics tracking</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>7. Children's Privacy</h2>
              <p>Our service is not intended for children under 13. We do not knowingly collect information from children under 13.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>8. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            </section>

            <section>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p style={{ background: '#f7fafc', padding: '1rem', borderRadius: '4px', marginTop: '0.5rem' }}>
                Email: privacy@convertcraft.com<br />
                Website: https://convertcraft.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy