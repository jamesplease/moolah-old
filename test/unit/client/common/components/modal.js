import React from 'react';
import {shallow} from 'enzyme';
import preventScroll from 'prevent-scroll';
import Modal from '../../../../../client/common/components/modal';

describe('Modal', function() {
  describe('mounting', () => {
    beforeEach(() => {
      stub(preventScroll, 'on');
    });

    it('should disable scrolling', () => {
      const wrapper = shallow(<Modal/>);
      wrapper.instance().componentDidMount();
      expect(preventScroll.on).to.have.been.calledOnce;
    });
  });

  describe('unmounting', () => {
    beforeEach(() => {
      stub(preventScroll, 'off');
    });

    it('should disable scrolling', () => {
      const wrapper = shallow(<Modal/>);
      wrapper.instance().componentWillUnmount();
      expect(preventScroll.off).to.have.been.calledOnce;
    });
  });

  describe('rendering', () => {
    it('should render the modal as a child', () => {
      const wrapper = shallow(<Modal isOpen={true}/>);
      expect(wrapper.find('.modal')).to.have.length(1);
    });

    it('should attach the `modalClassName` to the modal', () => {
      const wrapper = shallow(<Modal modalClassName="sandwiches" isOpen={true}/>);
      const modal = wrapper.find('.modal');
      expect(modal.hasClass('sandwiches')).to.be.true;
    });

    it('should render the children', () => {
      const child = (<div className="oink"/>);
      const wrapper = shallow(
        <Modal isOpen={true}>
          {child}
        </Modal>
      );
      expect(wrapper.find('.oink')).to.have.length(1);
    });
  });
});
