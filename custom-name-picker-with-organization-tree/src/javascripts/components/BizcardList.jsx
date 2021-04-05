import React from 'react';
import Bizcard from './Bizcard';
import PropTypes from 'prop-types';
import _ from 'lodash';
import '../../stylesheets/bizcard-list.less';

function convertSelectedBizcardsToMap(selectedBizcardArray) {
  return _.keyBy(selectedBizcardArray, value => value);
}

/**
 * Used to render a list of Bizcards.
 * It takes an array of bizcards definition from its bizcards property.
 *
 * It's an uncontrolled component and rely on the selectedBizcards property to
 * determine the selection status. While the selectedBizcards property doesn't contain
 * the whole bizcard object, it only contains the email addresss of the bizcard,
 * as the email address is good enough to identify a bizcard.
 *
 * It also takes a onBizcardClick event handler.
 * The handler is called with the bizcard object being clicked.
 */
class BizcardList extends React.Component {

  render() {
    if(this.props.isLoading) {
      return <div>loading...</div>
    }

    if(!this.props.bizcards) {
      return <ul className='bizcard-list'></ul>
    }

    var selectedBizcards = convertSelectedBizcardsToMap(this.props.selectedBizcards || []);
    var children = this.props.bizcards.map( bizcard =>
      <li key={bizcard.email} className={selectedBizcards[bizcard.email] ? 'selected' : ''}>
        <Bizcard {...bizcard} onClick={() => this.props.onBizcardClick(bizcard)}></Bizcard>
      </li>
    );

    return <ul className='bizcard-list'>{children}</ul>
  }
}

BizcardList.propTypes = {
  isLoading: PropTypes.bool,
  bizcards: PropTypes.array,
  selectedBizcards: PropTypes.array,
  onBizcardClick: PropTypes.func
}

export default BizcardList;
