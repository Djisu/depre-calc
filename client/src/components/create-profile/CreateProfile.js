import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' // Supports this.props.history
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import { createProfile } from '../../actions/profileActions'


class CreateProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      handle: '',
      location: '',
      country: '',
      company: '',
      date: Date.now,
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit(e){
    e.preventDefault()

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      country: this.state.country,
      company: this.state.company
    }

    this.props.createProfile(profileData, this.props.history)
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { errors } = this.state

    return (
      <div className='create-profile'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to let your profile stand out
              </p>
              <small className="d-block pb-3">
                * = required fields
              </small>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                    placeholder='* Profile Handle'
                    name='handle'
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                    info='A unique handle for your profile URL.'
                />

                <TextFieldGroup
                    placeholder='Location'
                    name='location'
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info='City or city and your state/region'
                />
                <TextFieldGroup
                    placeholder='Country'
                    name='country'
                    value={this.state.country}
                    onChange={this.onChange}
                    error={errors.country}
                    info='Enter your country'
                />
                <TextFieldGroup
                    placeholder='Company'
                    name='company'
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info='Could be your own company or the one you work for'
                />
                <input type="submit" value="Submit" className='btn btn-info btn-block mt-4'/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))