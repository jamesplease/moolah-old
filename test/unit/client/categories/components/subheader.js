import {
  CategoriesSubheader, __Rewire__, __ResetDependency__, __get__
} from '../../../../../client-src/categories/components/subheader';
import Modal from '../../../../../client-src/common/components/modal';
import generateWrapperGenerator from '../../../../services/generate-wrapper-generator';

const mapStateToProps = __get__('mapStateToProps');
const mapDispatchToProps = __get__('mapDispatchToProps');

describe('CategoriesSubheader', function() {
  describe('mapStateToProps', () => {
    it('returns the right props', () => {
      expect(mapStateToProps({
        connection: true,
        categories: {
          categories: [1, 2, 3],
          creatingCategoryStatus: 'hello'
        },
        transactions: {},
        oink: true
      })).to.deep.equal({
        isOnline: true,
        categories: [1, 2, 3],
        creatingCategoryStatus: 'hello'
      });
    });
  });

  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      this.createCategory = stub().returns({pasta: true});
      __Rewire__('categoriesActionCreators', {
        createCategory: this.createCategory
      });

      this.dispatch = stub();
      this.props = mapDispatchToProps(this.dispatch);
    });

    afterEach(() => {
      __ResetDependency__('categoriesActionCreators');
    });

    it('returns the right props', () => {
      expect(this.props).to.have.keys(['createCategory']);
    });

    it('returns a functioning `createCategory`', () => {
      this.props.createCategory();
      expect(this.createCategory).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({pasta: true});
    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      this.ModifyCategoryModal = () => {};
      __Rewire__('ModifyCategoryModal', this.ModifyCategoryModal);

      this.createCategory = stub();
      this.defaultProps = {
        createCategory: this.createCategory,
        isOnline: true,
        categories: [{id: 1}, {id: 2}],
        creatingCategoryStatus: null
      };
      this.generator = generateWrapperGenerator(this.defaultProps, CategoriesSubheader);
    });

    afterEach(() => {
      __ResetDependency__('ModifyCategoryModal');
    });

    it('has the right class', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.hasClass('subheader listHeader')).to.be.true;
    });

    it('has a title with the right text', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.find('.subheader-title').text()).to.equal('Categories');
    });

    it('does not render the modal', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.find(Modal)).to.have.length(0);
    });

    describe('create button', () => {
      it('has the right text', () => {
        const wrapper = this.generator.shallow();
        const createBtn = wrapper.find('.subheader-action');
        expect(createBtn.text()).to.equal('+ Category');
      });

      it('is not disabled', () => {
        const wrapper = this.generator.shallow();
        const createBtn = wrapper.find('.subheader-action');
        expect(createBtn.prop('disabled')).to.be.false;
      });

      it('is disabled when the user is not online', () => {
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

      it('shows the modal', () => {
        const modal = this.wrapper.find(Modal);
        expect(modal).to.have.length(1);
        expect(modal.prop('modalClassName')).to.equal('modifyCategoryModal-container');
      });

      it('has a ModifyCategoryModal', () => {
        const modal = this.wrapper.find(Modal);
        const modifyCategoryModal = modal.find(this.ModifyCategoryModal);
        expect(modifyCategoryModal).to.have.length(1);
      });

      it('passes the right props to ModifyCategoryModal', () => {
        const modal = this.wrapper.find(Modal);
        const modifyCategoryModal = modal.find(this.ModifyCategoryModal);
        expect(modifyCategoryModal.prop('categories')).to.deep.equal([{id: 1}, {id: 2}]);
        expect(modifyCategoryModal.prop('isEditMode')).to.be.false;
        expect(modifyCategoryModal.prop('actionFailure')).to.be.false;
        expect(modifyCategoryModal.prop('confirmInProgress')).to.be.true;
        expect(modifyCategoryModal.prop('onClickCancel')).to.equal(this.wrapper.instance().onClickModalCancel);
        expect(modifyCategoryModal.prop('onSubmit')).to.equal(this.wrapper.instance().onClickModalCreate);
      });

      it('closes the modal when `onClickModalCancel` is called', () => {
        this.wrapper.instance().onClickModalCancel();
        this.wrapper.update();
        expect(this.wrapper.find(Modal)).to.have.length(0);
      });

      it('closes the modal when new props are passed in', () => {
        this.wrapper.setProps({
          creatingCategoryStatus: 'SUCCESS'
        });
        expect(this.wrapper.find(Modal)).to.have.length(0);
      });
    });

    describe('onClickModalCreate', () => {
      it('calls `createCategory` with the props', () => {
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

      it('calls `createCategory`, filling in missing props', () => {
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
