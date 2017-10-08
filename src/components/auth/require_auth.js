//this is HOC 'higher order component that will wrap around another react component
import React, { Component } from "react";
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {

    //prevent abusing the use of context
    //a property on a class 'Authentication'
    static contextTypes = {
      router: React.PropTypes.object
    }

    //run everytime when the component is about to render onto the DOM
    componentWillMount() {
      console.log('componentWillMount require_authentication');
      if(!this.props.authenticated) {
        this.context.router.push('/');    
      }
    }

    //call when the component is about to be handed a new set of prop to be re-render
    //nextProps is the new set of props that the component will be rendering with
    componentWillUpdate(nextProps) {
      console.log('componentWillUpdate require_authentication');
      if(!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      //console.log(this.context);
      //console.log('rendering', ComposedComponent);
      console.log('render require_authentication');
      console.log(this.props.authenticated);
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    console.log('mapStateToProps from require_authentication');
    return {authenticated: state.auth.authenticated};
  }
  return connect(mapStateToProps)(Authentication);
}

// In some other location ... not in this file
// We want to use this HOC
// EXAMPLE
// import Authentication //this is my HOC
// import Resources //this is the component that I want to wrap with Authentication

// const ComposedComponent = Authentication(Resources);

// In some render method...
// <ComposedComponent />
