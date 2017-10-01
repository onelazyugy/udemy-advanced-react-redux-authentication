import axios from "axios";
import { browserHistory } from 'react-router';

const ROOT_URL = "http://localhost:3090";

export function signinUser({ email, password }) {
  //use redux thunk here to get the dispatch function
  //why return function? because we want dispatch function instead of an action
  return function(dispatch) {
    //submit email/password to server
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        //if request is good...
        //-update state to indicate user is authenticated
        //-save the JWT token

        //-redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        //if request is bad...
        //-show an error to the user0
      });
  };
}
