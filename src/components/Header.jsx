import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <div className="logo">
              <div className="logo-icon">
                <i className="fas fa-file-pdf"></i>
              </div>
              <h1>Convert Craft</h1>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header