import { combineReducers } from 'redux';
import { routerReducer} from './router/reducer';
import { overlayReducer} from './overlay/reducer';
import { tipReducer} from './tip/reducer';
import { userReducer} from './user/reducer';
import { clientReducer} from './client/reducer';
import { searchReducer} from './search/reducer';
import { contactReducer} from './contact/reducer';
import { recordReducer} from './record/reducer';
import { opportunityReducer} from './opportunity/reducer';

export default combineReducers({
  router: routerReducer,
  overlay: overlayReducer,
  tip: tipReducer,
  user: userReducer,
  client: clientReducer,
  search: searchReducer,
  contact: contactReducer,
  record: recordReducer,
  opportunity: opportunityReducer,
});
