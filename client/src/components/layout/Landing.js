import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes }  from 'prop-types' // to allow auth
import { connect } from 'react-redux' /// to allow auth

class Landing extends Component {

  componentDidMount(){
    if(this.props.auth.isauthenticated){
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Japazy</h1>
              <p className="lead"> Create fixed assets reference and share information with the world</p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
              <Link to="/login" className="btn btn-lg btn-light">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Landing.propType = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing)