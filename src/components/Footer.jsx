import { useState } from 'react'

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  return (
    <>
      <footer>
        <div className="container">
          <p>&copy; 2025 All Rights Reserved ® Hassan Mohammed</p>
          <p style={{ marginTop: '0.5rem' }}>Convert Craft - Simple PDF Solutions</p>
          
          {/* Policy Links */}
          <div style={{ 
            marginTop: '1rem', 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem',
            fontSize: '0.9rem',
            opacity: 0.8
          }}>
            <button 
              onClick={() => setShowPrivacy(true)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setShowTerms(true)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowPrivacy(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#718096'
              }}
            >
              ×
            </button>
            
            <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>Privacy Policy</h2>
            
            <div style={{ lineHeight: '1.6', color: '#4a5568' }}>
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              
              <h3 style={{ color: '#2d3748', marginTop: '1.5rem' }}>Information Collection</h3>
              <p>Convert Craft processes all files locally in your browser. We do not store, transmit, or save your files on any servers.</p>
              
              <h3 style={{ color: '#2d3748', marginTop: '1.5rem' }}>Data Usage</h3>
              <p>We may collect anonymous usage statistics to improve our service. Your files never leave your device.</p>
              
              <h3 style={{ color: '#2d3748', marginTop: '1.5rem' }}>Third Parties</h3>
              <p>We use Google Analytics for website analytics and Google Adsense for advertisements.</p>
              
              <h3 style={{ color: '#2d3748', marginTop: '1.5rem' }}>Contact</h3>
              <p>For privacy concerns, contact: privacy@convertcraft.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowTerms(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#718096'
              }}
            >
              ×
            </button>
            
            <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>Terms of Service</h2>
            
            <div style={{ lineHeight: '1.6', color: '#4a5568' }}>
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              
              <h3 style={{ color: '#2d3748', marginTop: '1.5rem' }}>Acceptance of Terms</h3>
              <p>By using Convert Craft, you agree to these terms. The service is provided "as is" without warranties.</p>
              
              <h3 style={{ color: '#2d3748', marginTop: '1.5rem' }}>Service Description</h3>
              <p>Convert Craft provides free online PDF conversion tools. All processing occurs locally in your browser.</p>
              
              <h3 style={{ color: '#2d3748', marginTop: '1.5rem' }}>User Responsibilities</h3>
              <p>You agree not to use the service for illegal purposes or to upload malicious content.</p>
              
              <h3 style={{ color: '#2d3748', marginTop: '1.5rem' }}>Limitation of Liability</h3>
              <p>Convert Craft is not liable for any damages resulting from service use. Files are processed locally and not stored by us.</p>
              
              <h3 style={{ color: '#2d3748', marginTop: '1.5rem' }}>Changes to Terms</h3>
              <p>We may update these terms. Continued use constitutes acceptance of changes.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer