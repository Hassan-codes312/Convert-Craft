import { Link } from 'react-router-dom'

const TermsOfUse = () => {
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

          <h1 style={{ color: '#2d3748', marginBottom: '1rem' }}>Terms of Use</h1>
          <p style={{ color: '#718096', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

          <div style={{ lineHeight: '1.8', color: '#4a5568' }}>
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
              <p>By accessing and using Convert Craft ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>2. Description of Service</h2>
              <p>Convert Craft provides online PDF conversion tools including:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>File to PDF conversion</li>
                <li>Image to PDF conversion</li>
                <li>Various PDF manipulation tools</li>
              </ul>
              <p style={{ marginTop: '0.5rem' }}>All processing occurs locally in your browser. We do not store your files on our servers.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>3. User Responsibilities</h2>
              <p>You agree not to use the Service:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>For any illegal purpose or to transmit illegal content</li>
                <li>To upload malicious files or viruses</li>
                <li>To violate any intellectual property rights</li>
                <li>To spam or abuse the service</li>
                <li>To attempt to disrupt or overload the service</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>4. Intellectual Property</h2>
              <p>The Service and its original content, features, and functionality are owned by Convert Craft and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>5. Service Availability</h2>
              <p>We strive to maintain 24/7 service availability but do not guarantee uninterrupted service. We may temporarily suspend the Service for maintenance, updates, or technical issues.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>6. Limitation of Liability</h2>
              <p>Convert Craft shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers</li>
                <li>Any interruption or cessation of transmission to or from our Service</li>
                <li>Any bugs, viruses, or similar that may be transmitted through our Service</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>7. Disclaimer</h2>
              <p>The Service is provided "as is" and "as available" without any warranties. We do not guarantee that:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>The Service will meet your specific requirements</li>
                <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                <li>The results from using the Service will be accurate or reliable</li>
                <li>Any errors in the Service will be corrected</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>8. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date at the top of this page.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>9. Governing Law</h2>
              <p>These Terms shall be governed by the laws of Pakistan without regard to its conflict of law provisions.</p>
            </section>

            <section>
              <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>10. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p style={{ background: '#f7fafc', padding: '1rem', borderRadius: '4px', marginTop: '0.5rem' }}>
                Email: terms@convertcraft.com<br />
                Website: https://convertcraft.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfUse