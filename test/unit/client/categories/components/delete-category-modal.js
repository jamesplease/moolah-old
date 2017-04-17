import DeleteCategoryModal from '../../../../../client/categories/components/delete-category-modal';
import generateWrapperGenerator from '../../../../services/generate-wrapper-generator';

describe('DeleteCategoryModal', function() {
  describe('rendering', () => {
    beforeEach(() => {
      this.onClickCancel = stub();
      this.onClickDelete = stub();
      this.defaultProps = {
        category: {
          id: 2,
          attributes: {
            label: 'pasta',
            emoji: ':tada:'
          }
        },
        deletingCategory: false,
        onClickDelete: this.onClickDelete,
        onClickCancel: this.onClickCancel
      };
      this.generator = generateWrapperGenerator(this.defaultProps, DeleteCategoryModal);
    });

    it('should have the right class', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.hasClass('deleteCategoryModal')).to.be.true;
    });

    it('should have the category label in the title', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.find('.modal-title').text()).to.equal('Delete "pasta" category?');
    });

    describe('cancel button', () => {
      it('should have the right btn class', () => {
        const wrapper = this.generator.shallow();
        const cancelBtn = wrapper.find('.deleteCategoryModal-cancelBtn');
        expect(cancelBtn.hasClass('btn btn-secondary')).to.be.true;
      });

      it('should have the text "Cancel"', () => {
        const wrapper = this.generator.shallow();
        const cancelBtn = wrapper.find('.deleteCategoryModal-cancelBtn');
        expect(cancelBtn.text()).to.equal('Cancel');
      });

      it('should not be disabled', () => {
        const wrapper = this.generator.shallow();
        const cancelBtn = wrapper.find('.deleteCategoryModal-cancelBtn');
        expect(cancelBtn.prop('disabled')).to.be.false;
      });

      it('should be disabled when a delete is in progress', () => {
        const wrapper = this.generator.shallow({deletingCategory: true});
        const cancelBtn = wrapper.find('.deleteCategoryModal-cancelBtn');
        expect(cancelBtn.prop('disabled')).to.be.true;
      });

      it('should call `onClickCancel` when clicked', () => {
        const wrapper = this.generator.shallow();
        const cancelBtn = wrapper.find('.deleteCategoryModal-cancelBtn');
        cancelBtn.simulate('click');
        expect(this.onClickCancel).to.have.been.calledOnce;
      });
    });

    describe('delete button', () => {
      it('should have the right btn class', () => {
        const wrapper = this.generator.shallow();
        const deleteBtn = wrapper.find('.deleteCategoryModal-deleteBtn');
        expect(deleteBtn.hasClass('btn btn-danger')).to.be.true;
      });

      it('should have the text "Delete"', () => {
        const wrapper = this.generator.shallow();
        const deleteBtn = wrapper.find('.deleteCategoryModal-deleteBtn');
        expect(deleteBtn.text()).to.equal('Delete');
      });

      it('should have the text "Deleting..." when a delete is in progress', () => {
        const wrapper = this.generator.shallow({deletingCategory: true});
        const deleteBtn = wrapper.find('.deleteCategoryModal-deleteBtn');
        expect(deleteBtn.text()).to.equal('Deleting...');
      });

      it('should not be disabled', () => {
        const wrapper = this.generator.shallow();
        const deleteBtn = wrapper.find('.deleteCategoryModal-deleteBtn');
        expect(deleteBtn.prop('disabled')).to.be.false;
      });

      it('should be disabled when a delete is in progress', () => {
        const wrapper = this.generator.shallow({deletingCategory: true});
        const deleteBtn = wrapper.find('.deleteCategoryModal-deleteBtn');
        expect(deleteBtn.prop('disabled')).to.be.true;
      });

      it('should call `onClickDelete` when clicked', () => {
        const wrapper = this.generator.shallow();
        const deleteBtn = wrapper.find('.deleteCategoryModal-deleteBtn');
        deleteBtn.simulate('click');
        expect(this.onClickDelete).to.have.been.calledOnce;
      });
    });
  });
});
