import React from 'react';
import PropTypes from 'prop-types';
import BizcardList from './BizcardList';
import {FormattedMessage} from 'react-intl';
import _ from 'lodash';
import '../../stylesheets/recipient-list.less';

class RecipientList extends React.Component {

  render() {
    var toRecipients = [];
    var ccRecipients = [];
    var bccRecipients = [];

    if(this.props.recipients) {
      toRecipients = _.values(this.props.recipients.to);
      ccRecipients = _.values(this.props.recipients.cc);
      bccRecipients = _.values(this.props.recipients.bcc);
    }

    var toList = <BizcardList
                    bizcards={toRecipients}
                    selectedBizcards={this.props.selectedRecipientsTo}
                    onBizcardClick={_.curry(this.props.onRecipientClick)('to')}
                 ></BizcardList>;
    var ccList = <BizcardList
                    bizcards={ccRecipients}
                    selectedBizcards={this.props.selectedRecipientsCc}
                    onBizcardClick={_.curry(this.props.onRecipientClick)('cc')}
                 ></BizcardList>;
    var bccList = <BizcardList
                    bizcards={bccRecipients}
                    selectedBizcards={this.props.selectedRecipientsBcc}
                    onBizcardClick={_.curry(this.props.onRecipientClick)('bcc')}
                 ></BizcardList>;
    return (
      <div className='recipient-list'>
        <div className='recipient-to-container'>
          <div className='recipient-to-header'>
            <FormattedMessage id="selectedTo" defaultMessage="To"/>
          </div>
          {toList}
        </div>
        <div className='recipient-cc-container'>
          <div className='recipient-cc-header'>
            <FormattedMessage id="selectedCc" defaultMessage="cc"/>
          </div>
          {ccList}
        </div>
        <div className='recipient-bcc-container'>
          <div className='recipient-bcc-header'>
            <FormattedMessage id="selectedBcc" defaultMessage="bcc"/>
          </div>
          {bccList}
        </div>
      </div>
    );
  }
}

function onRecipientClick(type) {
  this.props.onRecipientClick(type);
}

RecipientList.propTypes = {
  recipients: PropTypes.object,
  selectedRecipientsTo: PropTypes.array,
  selectedRecipientsCc: PropTypes.array,
  selectedRecipientsBcc: PropTypes.array,
  onRecipientClick: PropTypes.func
}

export default RecipientList;
