import configureStore from './configureStore';
import stateFromJS from '../../util/stateFromJS';

export default function(__INITIAL_STATE__){
	return configureStore(
			stateFromJS(
					__INITIAL_STATE__
			)
	)
};