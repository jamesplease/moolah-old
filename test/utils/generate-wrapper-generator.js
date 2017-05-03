import React from 'react';
import {shallow, mount, render} from 'enzyme';

// This is a function that returns wrapped enzyme methods that are useful
// for testing complex components.
// Pass it `defaultProps` and a `Component`, and you can access Enzyme's
// three methods to render that component. For example:
//
// ```
// const generate = generateWrapperGenerator(defaultProps, MyComponent);
// ```

// Once you have a generator, you can call methods to get an instance of your
// component with the `defaultProps` passed in.
//
// ```
// const wrapper = generate.shallow();
// ```
//
// If you need to override some of the default props, pass them to the function.
//
// ```
// const wrapper = generate.mount({color: 'blue'});
// ```
export default function(defaultProps, Component) {
  return {
    shallow(props) {
      const mergedProps = {
        ...defaultProps,
        ...props
      };

      return shallow(<Component {...mergedProps}/>);
    },

    mount(props) {
      const mergedProps = {
        ...defaultProps,
        ...props
      };

      return mount(<Component {...mergedProps}/>);
    },

    render(props) {
      const mergedProps = {
        ...defaultProps,
        ...props
      };

      return render(<Component {...mergedProps}/>);
    }
  };
}
