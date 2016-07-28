import {
  CategoriesSubheader, __Rewire__, __ResetDependency__
} from '../../../../../client-src/categories/components/subheader';
import Modal from '../../../../../client-src/common/components/modal';
import generateWrapperGenerator from '../../../../services/generate-wrapper-generator';

describe('CategoriesSubheader', function() {
  describe('rendering', () => {
    beforeEach(() => {
      this.ModifyCategoryModal = () => {};
      __Rewire__('ModifyCategoryModal', this.ModifyCategoryModal);

      this.createCategory = stub();
      this.defaultProps = {
        categoriesActions: {
          createCategory: this.createCategory
        },
        isOnline: true,
        categories: [{id: 1}, {id: 2}],
        creatingCategoryStatus: null
      };
      this.generator = generateWrapperGenerator(this.defaultProps, CategoriesSubheader);
    });

    afterEach(() => {
      __ResetDependency__('ModifyCategoryModal');
    });

    it('should have the right class', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.hasClass('subheader listHeader')).to.be.true;
    });

    it('should have a title with the right text', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.find('.subheader-title').text()).to.equal('Categories');
    });

    it('should not render the modal', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.find(Modal)).to.have.length(0);
    });

    describe('create button', () => {
      it('should have the right text', () => {
        const wrapper = this.generator.shallow();
        const createBtn = wrapper.find('.subheader-action');
        expect(createBtn.text()).to.equal('+ Category');
      });

      it('should not be disabled', () => {
        const wrapper = this.generator.shallow();
        const createBtn = wrapper.find('.subheader-action');
        expect(createBtn.prop('disabled')).to.be.false;
      });

      it('should be disabled when the user is not online', () => {
        const wrapper = this.generator.shallow({isOnline: false});
        const createBtn = wrapper.find('.subheader-action');
        expect(createBtn.prop('disabled')).to.be.true;
      });
    });

    describe('clicking create', () => {
      beforeEach(() => {
        this.wrapper = this.generator.shallow({creatingCategoryStatus: 'PENDING'});
        const createBtn = this.wrapper.find('.subheader-action');
        createBtn.simulate('click');
        this.wrapper.update();
      });

      it('should show the modal', () => {
        const modal = this.wrapper.find(Modal);
        expect(modal).to.have.length(1);
        expect(modal.prop('modalClassName')).to.equal('modifyCategoryModal-container');
      });

      it('should have a ModifyCategoryModal', () => {
        const modal = this.wrapper.find(Modal);
        const modifyCategoryModal = modal.find(this.ModifyCategoryModal);
        expect(modifyCategoryModal).to.have.length(1);
      });

      it('should pass the right props to ModifyCategoryModal', () => {
        const modal = this.wrapper.find(Modal);
        const modifyCategoryModal = modal.find(this.ModifyCategoryModal);
        expect(modifyCategoryModal.prop('categories')).to.deep.equal([{id: 1}, {id: 2}]);
        expect(modifyCategoryModal.prop('isEditMode')).to.be.false;
        expect(modifyCategoryModal.prop('actionFailure')).to.be.false;
        expect(modifyCategoryModal.prop('confirmInProgress')).to.be.true;
        expect(modifyCategoryModal.prop('onClickCancel')).to.equal(this.wrapper.instance().onClickModalCancel);
        expect(modifyCategoryModal.prop('onSubmit')).to.equal(this.wrapper.instance().onClickModalCreate);
      });

      it('should close the modal when `onClickModalCancel` is called', () => {
        this.wrapper.instance().onClickModalCancel();
        this.wrapper.update();
        expect(this.wrapper.find(Modal)).to.have.length(0);
      });

      it('should close the modal when new props are passed in', () => {
        this.wrapper.instance().componentWillReceiveProps({
          creatingCategoryStatus: 'SUCCESS'
        });
        this.wrapper.update();
        expect(this.wrapper.find(Modal)).to.have.length(0);
      });
    });

    describe('onClickModalCreate', () => {
      it('should call `createCategory` with the props', () => {
        const wrapper = this.generator.shallow();
        wrapper.instance().onClickModalCreate({
          label: '  pizza   ',
          emoji: ':tada:'
        });
        expect(this.createCategory).to.have.been.calledOnce;
        expect(this.createCategory).to.have.been.calledWithExactly({
          label: 'pizza',
          emoji: ':tada:'
        });
      });

      it('should call `createCategory`, filling in missing props', () => {
        const wrapper = this.generator.shallow();
        wrapper.instance().onClickModalCreate();
        expect(this.createCategory).to.have.been.calledOnce;
        expect(this.createCategory).to.have.been.calledWithExactly({
          label: '',
          emoji: null
        });
      });
    });
  });
});
