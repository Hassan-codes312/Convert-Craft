import { useState } from 'react'
import jsPDF from 'jspdf'

const MoreTools = () => {
  const [activeTool, setActiveTool] = useState(null)
  const [imageFiles, setImageFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  const tools = [
    {
      id: 'image',
      icon: 'fas fa-image',
      name: 'Image to PDF',
      description: 'Convert images to PDF documents',
      working: true
    },
    {
      id: 'split',
      icon: 'fas fa-cut',
      name: 'Split PDF',
      description: 'Extract specific pages from PDF',
      working: false
    },
    {
      id: 'merge',
      icon: 'fas fa-object-group',
      name: 'Merge PDF',
      description: 'Combine multiple PDFs into one',
      working: false
    },
    {
      id: 'compress',
      icon: 'fas fa-compress',
      name: 'Compress PDF',
      description: 'Reduce PDF file size',
      working: false
    },
    {
      id: 'protect',
      icon: 'fas fa-lock',
      name: 'Protect PDF',
      description: 'Add password to PDF',
      working: false
    },
    {
      id: 'unlock',
      icon: 'fas fa-unlock',
      name: 'Unlock PDF',
      description: 'Remove password from PDF',
      working: false
    }
  ]

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsDataURL(file)
    })
  }

  // REAL Image to PDF function - No blank pages
  const handleImageToPDF = async () => {
    if (imageFiles.length === 0) {
      alert('Please select images to convert')
      return
    }

    setIsProcessing(true)
    
    try {
      const pdf = new jsPDF()
      
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]
        const img = await readFileAsDataURL(file)
        const imgProps = pdf.getImageProperties(img)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        
        if (i > 0) {
          pdf.addPage()
        }
        
        pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight)
      }
      
      const pdfBlob = pdf.output('blob')
      const pdfUrl = URL.createObjectURL(pdfBlob)
      
      const a = document.createElement('a')
      a.href = pdfUrl
      a.download = `Images_Converted_${imageFiles.length}_Pages.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000)
      alert(`✅ Successfully converted ${imageFiles.length} images to PDF!`)
      setImageFiles([])
      
    } catch (error) {
      alert('❌ Error converting images to PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleToolClick = (tool) => {
    if (!tool.working) {
      alert(`🚧 ${tool.name} is coming soon! We're working hard to add this feature.`)
      return
    }
    setActiveTool(activeTool === tool.id ? null : tool.id)
  }

  return (
    <section id="tools" style={{ background: '#edf2f7' }}>
      <div className="container">
        <h2 className="section-title">More PDF Tools</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          {tools.map((tool) => (
            <div key={tool.id} style={{
              background: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              width: '320px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative'
            }}>
              {!tool.working && <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: '#e53e3e',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>Coming Soon</div>}
              
              <div style={{ textAlign: 'center', cursor: 'pointer', position: 'relative' }} onClick={() => handleToolClick(tool)}>
                <div style={{ fontSize: '2rem', color: '#4361ee', marginBottom: '1rem' }}>
                  <i className={tool.icon}></i>
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <div style={{ position: 'absolute', top: '0', right: '0', color: '#718096' }}>
                  <i className={`fas fa-chevron-${activeTool === tool.id ? 'up' : 'down'}`}></i>
                </div>
              </div>

              {activeTool === tool.id && tool.working && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                  {tool.id === 'image' && (
                    <>
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                          Select Images to Convert:
                        </label>
                        <input 
                          type="file" 
                          accept="image/*"
                          multiple
                          onChange={(e) => setImageFiles(Array.from(e.target.files))}
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e0', borderRadius: '5px' }}
                        />
                        {imageFiles.length > 0 && (
                          <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#718096' }}>
                            {imageFiles.length} image(s) selected
                          </div>
                        )}
                      </div>
                      <button 
                        className="btn btn-primary" 
                        onClick={handleImageToPDF}
                        disabled={isProcessing || imageFiles.length === 0}
                        style={{ width: '100%' }}
                      >
                        {isProcessing ? <><i className="fas fa-spinner fa-spin"></i> Creating PDF...</> : <><i className="fas fa-file-pdf"></i> Convert to PDF</>}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MoreTools