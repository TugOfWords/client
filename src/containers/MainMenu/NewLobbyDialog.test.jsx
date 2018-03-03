import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// components
import { Button, Header, Modal } from 'semantic-ui-react';
import { NewLobbyDialog } from './NewLobbyDialog';

configure({ adapter: new Adapter() });

describe('<NewLobbyDialog />', () => {
  let wrapper;

  beforeEach(() => {
    // stubs
    const doNothing = () => { };
    const content = <div />;

    wrapper = shallow(<NewLobbyDialog
      trigger={doNothing}
      confirm={doNothing}
      cancel={doNothing}
      content={content}
    />);
  });

  it('should render the correct components', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Modal.Content)).toHaveLength(1);
    expect(wrapper.find(Modal.Actions)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
  });
});
