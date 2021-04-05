import React from 'react';
import PropTypes from 'prop-types';
import NamePickerTableContainer from '../containers/NamePickerTableContainer';
import OrgTreeView from '../containers/OrgTreeView';
import '../../stylesheets/name-picker.less';
import {FormattedMessage} from 'react-intl';

class NamePicker extends React.Component {

  render() {
    return (
      <div className='name-picker'>
        <OrgTreeView></OrgTreeView>
        <div className='name-picker-table-container'>
          <NamePickerTableContainer></NamePickerTableContainer>
          <div className='name-picker-actions'>
            <button className='name-picker-btn' onClick={this.props.onOkBtnClick}>
              <FormattedMessage id="okBtn" defaultMessage="OK"/>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

NamePicker.propTypes = {
  onOkBtnClick: PropTypes.func
}

export default NamePicker;
