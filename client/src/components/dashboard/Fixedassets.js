import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteFixedassets } from '../../actions/profileActions'

class Fixedassets extends Component {

    onDeleteClick (id) {
       this.props.deleteFixedassets(id)
    }

    render () {
        const fixedasset = this.props.fixedasset.map(fix => (
            <tr key={fix._id}>
              <td>{fix.owner}</td>
              <td>{fix.assetdesc}</td>
              <td>{fix.location}</td>
              <td>{fix.country}</td>
              <td><img src={fix.imageurl} alt='' /></td>
              <td><Moment format='YYYY/MM/DD'>{fix.cobegdate}</Moment> -
                {fix.coenddate === null ? ('Now') :
                  (<Moment format='YYYY/MM/DD'>{fix.coenddate}</Moment>)
                }
              </td>

              <td><button onClick={this.onDeleteClick.bind(this, fix._id)} className='btn btn-danger' >Delete</button></td>
            </tr>
        ))

        return (
            <div>

                <h4 className='mb-4'>Asset details</h4>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Owner</th>
                      <th>Description</th>
                      <th>Location</th>
                      <th>country</th>
                      <th>Photo</th>
                      <th></th>
                    </tr>
                    {fixedasset}
                  </thead>
                </table>
            </div>
        )
    }
}

Fixedassets.propTypes = {
  deleteFixedassets: PropTypes.func.isRequired
}

export default connect(null, { deleteFixedassets })(Fixedassets)
