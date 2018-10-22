import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount, getProfileByHandle } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Fixedassets from './Fixedassets'


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      handle: ''
    };

    this.onChange= this.onChange.bind(this)
  }

  componentDidMount () {
    this.props.getCurrentProfile()
  }

  onDeleteClick (e) {
    this.props.deleteAccount()
  }

  onSearchClick (e) {
    console.log('In onSearchClick')
    this.props.getProfileByHandle(this.state.handle)
    console.log('after getProfileByHandle')
  }

  onChange(e){
    this.setState({handle: e.target.value})
  }

  render () {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile // these values are from the profileReducer.js

    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome <Link to={`/profile/${profile.handle}`}>
              { user.name }</Link>
            </p>
            <div>
              Search for Handle:
                  <input
                     type= "search"
                     value= {this.state.handle}
                     onChange= {this.onChange}
                  />

                  <button onClick={this.onSearchClick.bind(this, this.state.handle)} className='btn btn-small' >Click to search</button>
            </div>

            <ProfileActions />
            <Fixedassets fixedasset={profile.fixedassets} />

            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick.bind(this)} className='btn btn-danger'>Delete My Account</button>
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome { user.name }</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-lg btn-info'>
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps,
  { getCurrentProfile, deleteAccount, getProfileByHandle })(Dashboard)



