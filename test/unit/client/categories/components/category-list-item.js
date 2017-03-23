import CategoryListItem from '../../../../../client-src/categories/components/category-list-item';
// import emoji from '../../../../../client-src/common/services/js-emoji';
import generateWrapperGenerator from '../../../../services/generate-wrapper-generator';

describe('CategoryListItem', function() {
  beforeEach(() => {
    // stub(emoji, 'replace_colons').returns('<b>hello</b>');

    this.onClickDelete = stub();
    this.onClickEdit = stub();

    this.defaultProps = {
      category: {
        id: 2,
        label: 'pasta',
        emoji: ':tada:'
      },
      isOnline: true,
      onClickDelete: this.onClickDelete,
      onClickEdit: this.onClickEdit
    };
    this.generator = generateWrapperGenerator(this.defaultProps, CategoryListItem);
  });

  describe('rendering', () => {
    it('should have the right class name', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.hasClass('resourceListItem categoryListItem')).to.be.true;
    });

    describe('label button', () => {
      it('should exist', () => {
        const wrapper = this.generator.shallow();
        expect(wrapper.find('.categoryListItem-labelBtn')).to.have.length(1);
      });

      it('should render the emoji', () => {
        const wrapper = this.generator.shallow();
        const emojiContainer = wrapper.find('.categoryListItem-emoji');
        expect(emojiContainer.prop('dangerouslySetInnerHTML')).to.deep.equal({
          __html: '<b>hello</b>'
        });
      });

      it('should have the category label as text within it', () => {
        const wrapper = this.generator.shallow();
        expect(wrapper.text()).to.contain('pasta');
      });

      it('should call `onClickEdit` when clicked, passing the category', () => {
        const wrapper = this.generator.shallow();
        const labelBtn = wrapper.find('.categoryListItem-labelBtn');
        labelBtn.simulate('click');
        expect(this.onClickEdit).to.have.been.calledOnce;
        expect(this.onClickEdit).to.have.been.calledWithExactly({
          id: 2,
          label: 'pasta',
          emoji: ':tada:'
        });
      });
    });

    describe('delete button', () => {
      it('should exist', () => {
        const wrapper = this.generator.shallow();
        expect(wrapper.find('.resourceListItem-deleteBtn')).to.have.length(1);
      });

      it('should have the text "Delete"', () => {
        const wrapper = this.generator.shallow();
        const deleteBtn = wrapper.find('.resourceListItem-deleteBtn');
        expect(deleteBtn.text()).to.equal('Delete');
      });

      it('should not be disabled', () => {
        const wrapper = this.generator.shallow();
        const deleteBtn = wrapper.find('.resourceListItem-deleteBtn');
        expect(deleteBtn.prop('disabled')).to.be.false;
      });

      it('should be disabled when `isOnline` is false', () => {
        const wrapper = this.generator.shallow({isOnline: false});
        const deleteBtn = wrapper.find('.resourceListItem-deleteBtn');
        expect(deleteBtn.prop('disabled')).to.be.true;
      });

      it('should call `onClickDelete` when clicked, passing the category', () => {
        const wrapper = this.generator.shallow();
        const deleteBtn = wrapper.find('.resourceListItem-deleteBtn');
        deleteBtn.simulate('click');
        expect(this.onClickDelete).to.have.been.calledOnce;
        expect(this.onClickDelete).to.have.been.calledWithExactly({
          id: 2,
          label: 'pasta',
          emoji: ':tada:'
        });
      });
    });
  });
});
