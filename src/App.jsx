import PDFConverter from './components/PDFConverter'
import MoreTools from './components/MoreTools'
import SupportSection from './components/SupportSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <i className="fas fa-file-pdf"></i>
              </div>
              <h1>Convert Craft</h1>
            </div>
          </div>
        </div>
      </header>

      <main>
        <PDFConverter />
        <MoreTools />
        <SupportSection />
      </main>

      <Footer />
    </div>
  )
}

export default App