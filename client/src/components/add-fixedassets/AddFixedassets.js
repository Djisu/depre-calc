import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectListGroup from '../common/SelectListGroup'
import { addFixedassets } from '../../actions/profileActions'

class AddFixedassets extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assettype: '',
      assetdesc: '',
      assetcost: '',
      serialno: '',
      location: '',
      country: '',
      owner: '',
      gpsaddress: '',
      bank: '',
      cobegdate: '',
      coenddate: '',
      status: '',
      imageurl: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit (e) {
    e.preventDefault()


    var filename =  this.state.imageurl.split(/(\\|\/)/g).pop();
    this.setState({
      imageurl: 'api/profile/fixedassets/' + filename
    })

    alert(this.state.imageurl);

    const fixData = {
      assettype: this.state.assettype,
      assetdesc: this.state.assetdesc,
      assetcost: this.state.assetcost,
      serialno: this.state.serialno,
      location: this.state.location,
      country: this.state.country,
      owner: this.state.owner,
      gpsaddress: this.state.gpsaddress,
      bank: this.state.bank,
      cobegdate: this.state.cobegdate,
      coenddate: this.state.coenddate,
      status: this.state.status,
      imageurl: this.state.imageurl,
      errors: {}
    }

    this.props.addFixedassets(fixData, this.props.history)
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onCheck (e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  render () {
    const { errors } = this.state

    // Select options for status
    const options = [
      {label: '* Select Asset Type', value: 0 },
      {label: 'House', value: 'House'},
      {label: 'Land', value: 'Land'},
      {label: 'Car', value: 'Car'},
      {label: 'Truck', value: 'Truck'},
      {label: 'Bus', value: 'Bus'},
      {label: 'Furniture', value: 'Furniture'},
      {label: 'Electronics', value: 'Electronics'}
    ]

    const statusOptions = [
        {label: '* Select the status of the asset', value: 0 },
        {label: 'Not used as colateral', value: 'Not used as colateral'},
        {label: 'Used as colateral', value: 'Used as colateral'}
    ]

    return (
      <div className='create-fixedassets'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className='btn btn-light'>
                  Go Back
              </Link>


              <h1 className="display-4 text-center">Create Your Fixed Asset</h1>

              <small className="d-block pb-3">
                * = required fields
              </small>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                    placeholder='Asset Type'
                    name='assettype'
                    value={this.state.assettype}
                    onChange={this.onChange}
                    options={options}
                    error={errors.assettype}
                    info='Select the asset type, like house, land, car etc...'
                />
                <TextFieldGroup
                      placeholder='Enter the name of the asset'
                      name='assetdesc'
                      value={this.state.assetdesc}
                      onChange={this.onChange}
                      error={errors.assetdesc}
                      info='A unique name the asset'
                  />
                  <TextFieldGroup
                      placeholder='Enter the initial cost of the asset'
                      name='assetcost'
                      type='number'
                      value={this.state.assetcost}
                      onChange={this.onChange}
                      error={errors.assetcost}
                      info='The initial cost of the asset'
                  />
                  <TextFieldGroup
                      placeholder='Enter the serial number/house number, etc of the asset'
                      name='serialno'
                      value={this.state.serialno}
                      onChange={this.onChange}
                      error={errors.serialno}
                      info='The serial number of the asset'
                  />
                  <TextFieldGroup
                      placeholder='City or town of the asset'
                      name='location'
                      value={this.state.location}
                      onChange={this.onChange}
                      error={errors.location}
                      info='Enter the asset location'
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
                      placeholder='Owner'
                      name='owner'
                      value={this.state.owner}
                      onChange={this.onChange}
                      error={errors.owner}
                      info='Could be the owner of the asset'
                  />
                  <TextFieldGroup
                      placeholder='The GPS address of the asset'
                      name='gpsaddress'
                      value={this.state.gpsaddress}
                      onChange={this.onChange}
                      error={errors.gpsaddress}
                      info='Could be the gpsaddress of the asset'
                  />
                  <TextFieldGroup
                      placeholder='If asset is used as colateral for bank, then enter the bank'
                      name='bank'
                      value={this.state.bank}
                      onChange={this.onChange}
                      error={errors.bank}
                      info='The bank holding the colateral of the asset'
                  />
                  <TextFieldGroup
                      placeholder='If asset is used as colateral for bank, then enter the start date of the colateral'
                      name='cobegdate'
                      type='Date'
                      value={this.state.cobegdate}
                      onChange={this.onChange}
                      error={errors.cobegdate}
                      info='The colateral start date holding the colateral of the asset'
                  />
                  <TextFieldGroup
                      placeholder='If asset is used as colateral for bank, then enter the end date of the colateral'
                      name='coenddate'
                      type='Date'
                      value={this.state.coenddate}
                      onChange={this.onChange}
                      error={errors.coenddate}
                      info='The colateral endding date holding the colateral of the asset'
                  />
                  <SelectListGroup
                      placeholder='Asset used as colateral or not'
                      name='status'
                      value={this.state.status}
                      onChange={this.onChange}
                      options={statusOptions}
                      error={errors.status}
                      info='Asset used as colateral or not'
                  />
                  <input
                      type="file"
                      placeholder='Select the name of the image of the asset'
                      name='imageurl'
                      value={this.state.imageurl}
                      onChange={this.onChange}
                      error={errors.imageurl}
                      info='The url of the image of the asset'
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

AddFixedassets.propTypes = {
  addFixedassets: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addFixedassets })(withRouter(AddFixedassets))
