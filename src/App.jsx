import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('pdf-to-word')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionDone, setConversionDone] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [selectedFormat, setSelectedFormat] = useState('pdf') // New state for format selection

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Basic file validation
      if (file.size > 50 * 1024 * 1024) {
        alert('File size must be less than 50MB')
        return
      }
      
      if (activeTab.includes('pdf') && !file.type.includes('pdf')) {
        alert('Please select a PDF file')
        return
      }
      
      setSelectedFile(file)
      setConversionDone(false)
      setDownloadUrl('')
    }
  }

  const handleConvert = () => {
    if (!selectedFile) {
      alert('Please select a file first!')
      return
    }

    setIsConverting(true)
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false)
      setConversionDone(true)
      
      // Create a dummy download URL for demo
      const fileExtension = getFileExtension()
      const dummyContent = `Converted from: ${selectedFile.name}
Conversion type: ${activeTab}
Target format: ${selectedFormat.toUpperCase()}
Date: ${new Date().toLocaleString()}

This is a simulated ${selectedFormat.toUpperCase()} file conversion.
In a real application, this would be an actual ${selectedFormat.toUpperCase()} file.`
      
      const blob = new Blob([dummyContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
    }, 2000)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setConversionDone(false)
    setDownloadUrl('')
    setSelectedFormat('pdf') // Reset to default format
    // Reset file input
    document.querySelector('input[type="file"]').value = ''
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file) {
        // Basic file validation
        if (file.size > 50 * 1024 * 1024) {
          alert('File size must be less than 50MB')
          return
        }
        
        if (activeTab.includes('pdf') && !file.type.includes('pdf')) {
          alert('Please select a PDF file')
          return
        }
        
        setSelectedFile(file)
        setConversionDone(false)
        setDownloadUrl('')
      }
    }
  }

  const getFileAccept = () => {
    switch (activeTab) {
      case 'pdf-to-word':
      case 'pdf-to-text':
        return '.pdf'
      case 'misc':
        return '*/*'
      default:
        return '*/*'
    }
  }

  const getOutputFormat = () => {
    switch (activeTab) {
      case 'pdf-to-word': return 'DOCX'
      case 'pdf-to-text': return 'TXT'
      case 'misc': return selectedFormat.toUpperCase()
      default: return 'File'
    }
  }

  const getFileExtension = () => {
    switch (selectedFormat) {
      case 'pdf': return 'pdf'
      case 'word': return 'docx'
      case 'text': return 'txt'
      case 'image': return 'png'
      default: return 'txt'
    }
  }

  const handleFormatSelect = (format) => {
    setSelectedFormat(format)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>ConvertCraft</h1>
        <p>Transform your files with precision and ease</p>
      </header>

      <div className="container">
        <div className="tabs">
          <button 
            className={activeTab === 'pdf-to-word' ? 'active' : ''}
            onClick={() => {
              setActiveTab('pdf-to-word')
              handleReset()
            }}
          >
            📄→📝 PDF to Word
          </button>
          <button 
            className={activeTab === 'pdf-to-text' ? 'active' : ''}
            onClick={() => {
              setActiveTab('pdf-to-text')
              handleReset()
            }}
          >
            📄→📃 PDF to Text
          </button>
          <button 
            className={activeTab === 'misc' ? 'active' : ''}
            onClick={() => {
              setActiveTab('misc')
              handleReset()
            }}
          >
            🔄 Miscellaneous
          </button>
        </div>

        <div className="tab-content">
          <div className="converter">
            {/* File Upload Area */}
            <div 
              className={`upload-area ${selectedFile ? 'file-selected' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <div className="upload-icon">
                {selectedFile ? '✅' : '📁'}
              </div>
              {selectedFile ? (
                <>
                  <p className="file-name">{selectedFile.name}</p>
                  <p className="file-size">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {activeTab === 'misc' && (
                    <p className="selected-format">
                      Converting to: <strong>{selectedFormat.toUpperCase()}</strong>
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p>Drag & Drop your file here</p>
                  <p className="upload-subtext">or click to browse</p>
                  <p className="upload-subtext">Max file size: 50MB</p>
                </>
              )}
              <input 
                id="file-input"
                type="file" 
                onChange={handleFileSelect}
                accept={getFileAccept()}
                style={{ display: 'none' }}
              />
            </div>

            {/* Conversion Options for Miscellaneous */}
            {activeTab === 'misc' && selectedFile && (
              <div className="conversion-options">
                <h4>Convert to:</h4>
                <div className="options-grid">
                  <button 
                    className={`format-option ${selectedFormat === 'pdf' ? 'selected' : ''}`}
                    onClick={() => handleFormatSelect('pdf')}
                  >
                    📄 PDF
                  </button>
                  <button 
                    className={`format-option ${selectedFormat === 'word' ? 'selected' : ''}`}
                    onClick={() => handleFormatSelect('word')}
                  >
                    📝 Word
                  </button>
                  <button 
                    className={`format-option ${selectedFormat === 'text' ? 'selected' : ''}`}
                    onClick={() => handleFormatSelect('text')}
                  >
                    📃 Text
                  </button>
                  <button 
                    className={`format-option ${selectedFormat === 'image' ? 'selected' : ''}`}
                    onClick={() => handleFormatSelect('image')}
                  >
                    🖼️ Image
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              {selectedFile && !conversionDone && (
                <button 
                  className={`convert-btn ${isConverting ? 'converting' : ''}`}
                  onClick={handleConvert}
                  disabled={isConverting}
                >
                  {isConverting ? (
                    <>
                      <div className="spinner"></div>
                      Converting to {getOutputFormat()}...
                    </>
                  ) : (
                    `Convert to ${getOutputFormat()}`
                  )}
                </button>
              )}

              {selectedFile && (
                <button className="reset-btn" onClick={handleReset}>
                  Reset
                </button>
              )}
            </div>

            {/* Conversion Result */}
            {conversionDone && downloadUrl && (
              <div className="result">
                <div className="success-message">
                  <span className="success-icon">✅</span>
                  <h3>Conversion Successful!</h3>
                </div>
                <p>Your file has been converted to {getOutputFormat()} format.</p>
                <a 
                  href={downloadUrl} 
                  download={`converted-file.${getFileExtension()}`}
                  className="download-btn"
                >
                  📥 Download {getOutputFormat()} File
                </a>
              </div>
            )}

            {/* Info Section */}
            <div className="info">
              <h4>💡 How it works:</h4>
              <ul>
                <li>Select your file by clicking or dragging</li>
                {activeTab === 'misc' && <li>Choose your target format</li>}
                <li>Click convert to process your file</li>
                <li>Download your converted file instantly</li>
                <li>Supports files up to 50MB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>All rights reserved ® Hassan Mohammed 2008-Present</p>
          <div className="footer-links">
  <a href="/privacy.html" className="footer-link">Privacy Policy</a>
  <a href="#" className="footer-link">Terms of Service</a>
  <a href="#" className="footer-link">Contact</a>
</div>
          
        </div>
      </footer>
    </div>
  )
}

export default App