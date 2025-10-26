const SupportSection = () => {
  return (
    <section id="support">
      <div className="container">
        <h2 className="section-title">Help Grow Convert Craft</h2>
        
        <div style={{
          background: 'linear-gradient(135deg, #4361ee, #3a0ca3)',
          color: 'white',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            🚀
          </div>
          
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
            Help Us Reach More Users!
          </h3>
          
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', opacity: 0.9 }}>
            Share Convert Craft with others who need free PDF tools. Every share helps us grow and improve our services!
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            flexWrap: 'wrap',
            marginBottom: '1.5rem'
          }}>
            <button 
              onClick={() => {
                const url = window.location.href;
                const text = 'Check out Convert Craft - Free online PDF converter tools!';
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
              }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              <i className="fab fa-twitter"></i>
              Share on Twitter
            </button>
            
            <button 
              onClick={() => {
                const url = window.location.href;
                const title = 'Convert Craft - Free PDF Tools';
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`, '_blank');
              }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              <i className="fab fa-facebook"></i>
              Share on Facebook
            </button>
            
            <button 
              onClick={() => {
                const url = window.location.href;
                const title = 'Convert Craft - Free Online PDF Converter';
                const summary = 'Convert images to PDF, merge, split and compress PDF files online. Free, fast, and secure PDF tools.';
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
              }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              <i className="fab fa-linkedin"></i>
              Share on LinkedIn
            </button>
          </div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '1rem', 
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
              <strong>Pro Tip:</strong> Bookmark this page for quick access to free PDF tools! 📚
            </p>
          </div>
        </div>
        
        {/* Adsense Placeholder - Remove this when you get actual ads */}
        <div style={{ 
          marginTop: '3rem',
          background: '#f8f9fa',
          border: '2px dashed #dee2e6',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#6c757d', marginBottom: '1rem' }}>Ad Space</h4>
          <p style={{ color: '#868e96', fontSize: '0.9rem' }}>
            This space will display relevant ads to support free tool development
          </p>
          <div style={{ 
            background: '#e9ecef', 
            height: '90px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '4px',
            color: '#6c757d',
            marginTop: '1rem'
          }}>
            Google Adsense Banner
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportSection