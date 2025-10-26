import { useState } from 'react'
import jsPDF from 'jspdf'

const PDFConverter = () => {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedFiles, setConvertedFiles] = useState([])
  const [whitePageOption, setWhitePageOption] = useState('none')

  const supportedFormats = {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    documents: ['.txt', '.doc', '.docx'],
    data: ['.xml', '.csv', '.json'],
    all: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.txt', '.doc', '.docx', '.xml', '.csv', '.json']
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFiles(selectedFiles)
    e.target.value = ''
  }

  const handleFiles = (fileList) => {
    const validFiles = fileList.filter(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase()
      return supportedFormats.all.includes(extension)
    })

    if (validFiles.length !== fileList.length) {
      alert('Some files were skipped. Supported formats: ' + supportedFormats.all.join(', '))
    }

    setFiles(prev => [...prev, ...validFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsText(file)
    })
  }

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsDataURL(file)
    })
  }

  const getFileExtension = (fileName) => {
    return '.' + fileName.split('.').pop().toLowerCase()
  }

  // Main conversion function
  const convertToPDF = async () => {
    if (files.length === 0) {
      alert('Please select files to convert')
      return
    }

    setIsConverting(true)

    try {
      const pdf = new jsPDF()
      let hasContent = false
      let currentPage = 0

      // Add white page at start if selected
      if (whitePageOption === 'start') {
        pdf.addPage()
        currentPage++
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const extension = getFileExtension(file.name)

        try {
          // Add new page for each file after the first one
          if (hasContent) {
            pdf.addPage()
            currentPage++
          }

          // Handle different file types
          if (supportedFormats.images.includes(extension)) {
            await convertImageToPDF(pdf, file)
          } else if (supportedFormats.documents.includes(extension) || supportedFormats.data.includes(extension)) {
            await convertTextToPDF(pdf, file, extension)
          }

          hasContent = true

        } catch (error) {
          console.error(`Error converting ${file.name}:`, error)
          // Continue with next file even if one fails
          if (!hasContent && i === files.length - 1) {
            pdf.setFontSize(16)
            pdf.text('Error converting files', 20, 30)
          }
        }
      }

      // Add white page at end if selected
      if (whitePageOption === 'end' && hasContent) {
        pdf.addPage()
      }

      // If no content was added, create a message
      if (!hasContent) {
        pdf.setFontSize(16)
        pdf.text('No convertible content found', 20, 30)
        pdf.setFontSize(12)
        pdf.text('Please check your file formats', 20, 50)
      }

      const pdfBlob = pdf.output('blob')
      const pdfUrl = URL.createObjectURL(pdfBlob)

      const convertedFile = {
        originalName: `Converted_${files.length}_Files.pdf`,
        pdfName: `Converted_${files.length}_Files.pdf`,
        pdfBlob: pdfBlob,
        pdfUrl: pdfUrl,
        size: pdfBlob.size,
        convertedAt: new Date().toLocaleString(),
        whitePages: whitePageOption
      }

      setConvertedFiles([convertedFile])
      alert(`✅ Successfully processed ${files.length} file(s)!`)
      setFiles([])

    } catch (error) {
      console.error('Conversion error:', error)
      alert('❌ Error converting files. Please try again.')
    } finally {
      setIsConverting(false)
    }
  }

  // Convert images to PDF
  const convertImageToPDF = async (pdf, file) => {
    const img = await readFileAsDataURL(file)
    const imgProps = pdf.getImageProperties(img)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // Calculate dimensions to maintain aspect ratio
    const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height)
    const imgWidth = imgProps.width * ratio
    const imgHeight = imgProps.height * ratio

    // Center the image on the page
    const x = (pdfWidth - imgWidth) / 2
    const y = (pdfHeight - imgHeight) / 2

    // Use correct image format
    const format = file.type === 'image/png' ? 'PNG' :
                  file.type === 'image/jpeg' ? 'JPEG' :
                  file.type === 'image/gif' ? 'GIF' :
                  file.type === 'image/webp' ? 'WEBP' : 'JPEG'

    pdf.addImage(img, format, x, y, imgWidth, imgHeight)
  }

  // Convert text-based files to PDF
  const convertTextToPDF = async (pdf, file, extension) => {
    const text = await readFileAsText(file)
    
    // Set styles
    pdf.setFont('helvetica')
    pdf.setFontSize(12)
    
    // Add file name as title
    pdf.setFontSize(16)
    pdf.setTextColor(40, 40, 40)
    pdf.text(`File: ${file.name}`, 20, 20)
    
    // Add file type
    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    pdf.text(`Type: ${extension.toUpperCase()}`, 20, 30)
    
    // Add separator
    pdf.setDrawColor(200, 200, 200)
    pdf.line(20, 35, pdf.internal.pageSize.getWidth() - 20, 35)
    
    // Add content
    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)
    
    // Split text into lines that fit the page
    const pageWidth = pdf.internal.pageSize.getWidth() - 40
    const lines = pdf.splitTextToSize(text, pageWidth)
    
    let yPosition = 50
    
    for (let line of lines) {
      if (yPosition > pdf.internal.pageSize.getHeight() - 20) {
        pdf.addPage()
        yPosition = 20
      }
      pdf.text(line, 20, yPosition)
      yPosition += 7
    }
  }

  const downloadPDF = (pdfFile) => {
    const url = pdfFile.pdfUrl
    const a = document.createElement('a')
    a.href = url
    a.download = pdfFile.pdfName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const clearAllFiles = () => {
    setFiles([])
  }

  const clearConvertedFiles = () => {
    convertedFiles.forEach(file => URL.revokeObjectURL(file.pdfUrl))
    setConvertedFiles([])
  }

  const getFileIcon = (fileName) => {
    const extension = getFileExtension(fileName)
    
    if (supportedFormats.images.includes(extension)) {
      return 'fas fa-file-image'
    } else if (supportedFormats.documents.includes(extension)) {
      return 'fas fa-file-word'
    } else if (supportedFormats.data.includes(extension)) {
      return 'fas fa-file-code'
    } else {
      return 'fas fa-file'
    }
  }

  const getFileColor = (fileName) => {
    const extension = getFileExtension(fileName)
    
    if (supportedFormats.images.includes(extension)) {
      return '#4361ee'
    } else if (supportedFormats.documents.includes(extension)) {
      return '#2a7bde'
    } else if (supportedFormats.data.includes(extension)) {
      return '#6c757d'
    } else {
      return '#4361ee'
    }
  }

  return (
    <section id="converter">
      <div className="container">
        <h2 className="section-title">Universal PDF Converter</h2>
        
        {/* Supported Formats Info */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>
            <i className="fas fa-check-circle"></i> Supported Formats
          </h4>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem' }}>
            <span><i className="fas fa-image"></i> Images (JPG, PNG, GIF, WEBP)</span>
            <span><i className="fas fa-file-alt"></i> Documents (TXT, DOC, DOCX)</span>
            <span><i className="fas fa-code"></i> Data (XML, CSV, JSON)</span>
          </div>
        </div>

        {/* White Page Options */}
        {files.length > 0 && (
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            marginBottom: '2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ marginBottom: '1rem', color: '#2d3748' }}>
              <i className="fas fa-cog"></i> PDF Options
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontWeight: '600', color: '#4a5568' }}>Add Blank Page:</label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="whitePageOption" 
                    value="none" 
                    checked={whitePageOption === 'none'}
                    onChange={(e) => setWhitePageOption(e.target.value)}
                  />
                  <span>No blank pages</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="whitePageOption" 
                    value="start" 
                    checked={whitePageOption === 'start'}
                    onChange={(e) => setWhitePageOption(e.target.value)}
                  />
                  <span>At start</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="whitePageOption" 
                    value="end" 
                    checked={whitePageOption === 'end'}
                    onChange={(e) => setWhitePageOption(e.target.value)}
                  />
                  <span>At end</span>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Upload Area */}
        <div 
          className="upload-area"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
          style={{ 
            border: '2px dashed #cbd5e0',
            borderRadius: '8px',
            padding: '3rem 2rem',
            textAlign: 'center',
            background: '#fff',
            marginBottom: '2rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            borderColor: isDragging ? '#4361ee' : '#cbd5e0',
            backgroundColor: isDragging ? '#f0f4ff' : '#fff'
          }}
        >
          <div className="upload-icon" style={{ fontSize: '3rem', color: '#4361ee', marginBottom: '1rem' }}>
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          <h3>Drop files here or click to upload</h3>
          <p>Supports: Images, Documents, XML, CSV, JSON, and more</p>
          <input 
            type="file" 
            id="file-input"
            multiple 
            style={{ display: 'none' }} 
            onChange={handleFileSelect}
            accept={supportedFormats.all.join(',')}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="file-list">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Selected Files ({files.length}):</h3>
              <button className="btn btn-secondary" onClick={clearAllFiles}>
                <i className="fas fa-trash"></i> Clear All
              </button>
            </div>
            
            {files.map((file, index) => (
              <div key={index} className="file-item" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'white',
                borderRadius: '8px',
                marginBottom: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderLeft: `4px solid ${getFileColor(file.name)}`
              }}>
                <div className="file-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="file-icon" style={{ color: getFileColor(file.name), fontSize: '1.5rem' }}>
                    <i className={getFileIcon(file.name)}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600' }}>{file.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {getFileExtension(file.name).toUpperCase()}
                    </div>
                  </div>
                </div>
                <button 
                  className="btn btn-secondary"
                  onClick={() => removeFile(index)}
                >
                  <i className="fas fa-times"></i> Remove
                </button>
              </div>
            ))}
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                className="btn btn-primary" 
                onClick={convertToPDF}
                disabled={isConverting}
                style={{ fontSize: '1.1rem', padding: '12px 24px' }}
              >
                {isConverting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Converting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-file-pdf"></i> Convert to PDF
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Converted Files */}
        {convertedFiles.length > 0 && (
          <div className="converted-files">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '2rem' }}>
              <h3 style={{ color: '#38a169' }}>
                <i className="fas fa-check-circle"></i> Converted Files
              </h3>
              <button className="btn btn-secondary" onClick={clearConvertedFiles}>
                <i className="fas fa-times"></i> Clear
              </button>
            </div>
            
            {convertedFiles.map((pdfFile, index) => (
              <div key={index} className="file-item converted" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#f0fff4',
                borderRadius: '8px',
                marginBottom: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #38a169'
              }}>
                <div className="file-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="file-icon" style={{ color: '#e53e3e', fontSize: '1.5rem' }}>
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#2d3748' }}>{pdfFile.pdfName}</div>
                    <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                      {pdfFile.convertedAt} • {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => downloadPDF(pdfFile)}
                >
                  <i className="fas fa-download"></i> Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .fa-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

export default PDFConverter