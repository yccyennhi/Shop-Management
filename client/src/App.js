import { useDispatch} from 'react-redux';

import * as actions from './redux/actions';


function App() {
  const dispatch = useDispatch();
  dispatch(actions.getSanPhams.getSanPhamsRequest());
  return <p>jgkbgjg</p>
}

export default App;
