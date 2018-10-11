import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
//import { Link } from 'react-router-dom'
//import isEmpty from '../../validation/is-Empty'

class ProfileItem extends Component {
    render () {
        const { profile } = this.props

        const fixedasset = profile.fixedassets.map(fix => (
            <tr key={fix._id}>
              <td>{fix.owner}</td>
              <td>{fix.assetdesc}</td>
              <td>{fix.location}</td>
              <td>{fix.country}</td>
              <td><Moment format='YYYY/MM/DD'>{fix.cobegdate}</Moment> -
                {fix.coenddate === null ? ('Now') :
                  (<Moment format='YYYY/MM/DD'>{fix.coenddate}</Moment>)
                }
              </td>
              <td><img src={fix.imageurl} alt=''/></td>
            </tr>
        ))

        return (
            <div className='card card-body bg-light mb-3'>
               <div className='row'>
                    <div className='col-2'>
                        <img src={profile.user.avatar} alt='' className='rounded-circle'/>
                    </div>
                    <div className='col-lg-6 col-md-4 col-8'>
                        <h3>{profile.user.name}</h3>
                        <div>
                            <h4 className='mb-4'>Asset details</h4>
                            <table className='table'>
                            <thead>
                                <tr>
                                <th>Owner</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>country</th>
                                <th>Years</th>
                                <th>Asset Picture</th>
                                </tr>
                                {fixedasset}
                            </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
