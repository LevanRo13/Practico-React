
const Footer = () => {
  return (
    <div className="main-footer">
    <div className="container">
    <div className="row">
          {/* Column 1 */}
|   <div className="col-md-3 col-sm-6">
    <h4>Titulo ejemplo</h4>
    <ul className="list-unstyled">
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
    </ul>
    </div>
          {/* Column 2 */}
|   <div className="col-md-3 col-sm-6">
    <h4>Titulo ejemplo</h4>
    <ul className="list-unstyled">
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
    </ul>
    </div>
             {/* Column 3 */}
|   <div className="col-md-3 col-sm-6">
    <h4>Titulo ejemplo</h4>
    <ul className="list-unstyled">
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
    </ul>
    </div>
             {/* Column 4 */}
|   <div className="col-md-2 col-sm-6">
    <h4>Titulo ejemplo</h4>
    <ul className="list-unstyled">
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
        <li> texto ejemplo linea</li>
    </ul>
    </div>
    
    </div>
    {/* Footer Bottom */}
    <div className="footer-bottom">
        <p className="text-xs-center">
            &copy;{new Date().getFullYear()} El buen Sabor App - Todos los derechos reservados
        </p>
    </div>
    </div>
    </div>
  )
}

export default Footer