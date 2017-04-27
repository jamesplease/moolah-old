import _ from 'lodash';
import actionTypes from './action-types';
import initialState from './initial-state';
import xhrStatuses from '../util/xhr-statuses';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UNLINK_ACCOUNT: {
      const serviceName = action.serviceName;
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.PENDING
          }
        })
      };
    }

    case actionTypes.UNLINK_ACCOUNT_ABORT: {
      const serviceName = action.serviceName;
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.ABORTED
          }
        })
      };
    }

    case actionTypes.UNLINK_ACCOUNT_FAIL: {
      const serviceName = action.serviceName;
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.FAILED
          }
        })
      };
    }

    case actionTypes.UNLINK_ACCOUNT_RESET: {
      const serviceName = action.serviceName;
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.NULL
          }
        })
      };
    }

    case actionTypes.UNLINK_ACCOUNT_SUCCEED: {
      const serviceName = action.serviceName;
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          logins: {
            [`${serviceName}UnlinkXhrStatus`]: xhrStatuses.SUCCEEDED
          }
        }),
        user: _.merge({}, state.user, {
          logins: {
            [serviceName]: false
          }
        })
      };
    }

    case actionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          updateXhrStatus: 'PENDING',
          updatingAttributes: _.mapValues(action.resource.attributes, () => true)
        })
      };
    }

    case actionTypes.UPDATE_PROFILE_ABORT: {
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          updateXhrStatus: 'ABORTED',
          updatingAttributes: _.mapValues(action.resource.attributes, () => true)
        })
      };
    }

    case actionTypes.UPDATE_PROFILE_FAIL: {
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          updateXhrStatus: 'FAILED',
          updatingAttributes: _.mapValues(action.resource.attributes, () => true)
        })
      };
    }

    case actionTypes.UPDATE_PROFILE_RESET: {
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          updateXhrStatus: 'NULL',
          updatingAttributes: {}
        })
      };
    }

    case actionTypes.UPDATE_PROFILE_SUCCEED: {
      return {
        ...state,
        userMeta: _.merge({}, state.userMeta, {
          updateXhrStatus: 'SUCCEEDED',
          updatingAttributes: _.mapValues(action.resource.attributes, () => false)
        }),
        user: _.merge({}, state.user, {
          ...action.resource.attributes
        })
      };
    }

    default: {
      return state;
    }
  }
};
