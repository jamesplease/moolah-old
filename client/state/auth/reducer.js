import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';
import xhrStatuses from '../util/xhr-statuses';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UNLINK_ACCOUNT: {
      const serviceName = action.serviceName;
      return {
        userMeta: _.merge(state.user, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.PENDING
          }
        })
      };
    }

    case actionTypes.UNLINK_ACCOUNT_ABORT: {
      const serviceName = action.serviceName;
      return {
        userMeta: _.merge(state.user, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.ABORTED
          }
        })
      };
    }

    case actionTypes.UNLINK_ACCOUNT_FAIL: {
      const serviceName = action.serviceName;
      return {
        userMeta: _.merge(state.user, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.FAILED
          }
        })
      };
    }

    case actionTypes.UNLINK_ACCOUNT_RESET: {
      const serviceName = action.serviceName;
      return {
        userMeta: _.merge(state.user, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.NULL
          }
        })
      };
    }

    case actionTypes.UNLINK_ACCOUNT_SUCCEED: {
      const serviceName = action.serviceName;
      return {
        userMeta: _.merge(state.user, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.SUCCEEDED
          }
        }),
        user: _.merge(state.user, {
          logins: {
            [serviceName]: false
          }
        })
      };
    }

    default: {
      return state;
    }
  }
};
