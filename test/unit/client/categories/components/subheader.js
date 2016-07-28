import {CategoriesSubheader} from '../../../../../client-src/categories/components/subheader';
import generateWrapperGenerator from '../../../../services/generate-wrapper-generator';
import Modal from '../../../../../client-src/common/components/modal';

describe('CategoriesSubheader', function() {
  describe('rendering', () => {
    beforeEach(() => {
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
        expect(modal.prop('modalClassName')).to.equal('create-category-modal-container');
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
