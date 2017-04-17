import {
  CategoriesList, __Rewire__, __ResetDependency__, __get__
} from '../../../../../client/categories/components/categories-list';
import CategoryListItem from '../../../../../client/categories/components/category-list-item';
import DeleteCategoryModal from '../../../../../client/categories/components/delete-category-modal';
import Modal from '../../../../../client/common/components/modal';
import ReactCSSTransitionGroup from '../../../../../client/vendor/css-transition-group';
import generateWrapperGenerator from '../../../../services/generate-wrapper-generator';

const mapStateToProps = __get__('mapStateToProps');
const mapDispatchToProps = __get__('mapDispatchToProps');

describe('CategoriesList', function() {
  describe('mapStateToProps', () => {
    it('returns the right props', () => {
      expect(mapStateToProps({
        connection: true,
        categories: {
          categories: [1, 2, 3],
          categoriesMeta: 'hello'
        },
        transactions: {},
        oink: true
      })).to.deep.equal({
        isOnline: true,
        categories: [1, 2, 3],
        categoriesMeta: 'hello'
      });
    });
  });

  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      this.deleteCategory = stub().returns({pasta: true});
      this.updateCategory = stub().returns([1, 2, 3]);
      this.resetUpdateCategoryResolution = stub().returns(true);
      __Rewire__('categoriesActionCreators', {
        deleteCategory: this.deleteCategory,
        updateCategory: this.updateCategory,
        resetUpdateCategoryResolution: this.resetUpdateCategoryResolution
      });

      this.dispatch = stub();
      this.props = mapDispatchToProps(this.dispatch);
    });

    afterEach(() => {
      __ResetDependency__('categoriesActionCreators');
    });

    it('returns the right props', () => {
      expect(this.props).to.have.keys([
        'deleteCategory', 'updateCategory', 'resetUpdateCategoryResolution'
      ]);
    });

    it('returns a functioning `deleteCategory`', () => {
      this.props.deleteCategory();
      expect(this.deleteCategory).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly({pasta: true});
    });

    it('returns a functioning `updateCategory`', () => {
      this.props.updateCategory();
      expect(this.updateCategory).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly([1, 2, 3]);
    });

    it('returns a functioning `resetUpdateCategoryResolution`', () => {
      this.props.resetUpdateCategoryResolution();
      expect(this.resetUpdateCategoryResolution).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledOnce;
      expect(this.dispatch).to.have.been.calledWithExactly(true);
    });
  });

  beforeEach(() => {
    this.ModifyCategoryModal = () => {};
    __Rewire__('ModifyCategoryModal', this.ModifyCategoryModal);

    this.deleteCategory = stub();
    this.updateCategory = stub();
    this.resetUpdateCategoryResolution = stub();

    this.defaultProps = {
      categories: [
        {id: 10, attributes: {label: 'pizza'}},
        {id: 2, attributes: {label: 'asdf'}},
        {id: 5, attributes: {label: 'zebras'}}
      ],
      categoriesMeta: [
        {id: 10},
        {id: 2},
        {id: 5, updatingStatus: 'PENDING'}
      ],
      isOnline: true,
      deleteCategory: this.deleteCategory,
      updateCategory: this.updateCategory,
      resetUpdateCategoryResolution: this.resetUpdateCategoryResolution
    };
    this.generator = generateWrapperGenerator(this.defaultProps, CategoriesList);
  });

  afterEach(() => {
    __ResetDependency__('ModifyCategoryModal');
  });

  describe('rendering', () => {
    it('should have the right class', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.hasClass('categoriesList resourceListContainer')).to.be.true;
    });

    it('should not have any modal', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.find(Modal)).to.have.length(0);
    });

    it('should have a CSSTransitionGroup with the right props', () => {
      const wrapper = this.generator.shallow();
      const transitionGroup = wrapper.find(ReactCSSTransitionGroup);
      expect(transitionGroup.prop('transitionName')).to.equal('resourceListItem');
      expect(transitionGroup.prop('transitionEnterTimeout')).to.equal(250);
      expect(transitionGroup.prop('transitionLeaveTimeout')).to.equal(250);
      expect(transitionGroup.prop('component')).to.equal('ul');
      expect(transitionGroup.prop('className')).to.equal('resourceList');
    });

    it('should render the CategoriesListItems within the transition group in alphabetical order', () => {
      const wrapper = this.generator.shallow();
      const transitionGroup = wrapper.find(ReactCSSTransitionGroup);
      expect(transitionGroup.children()).to.have.length(3);

      expect(transitionGroup.childAt(0).type()).to.equal(CategoryListItem);
      expect(transitionGroup.childAt(0).prop('isOnline')).to.equal(true);
      expect(transitionGroup.childAt(0).prop('category')).to.deep.equal({id: 2, attributes: {label: 'asdf'}});
      expect(transitionGroup.childAt(0).prop('onClickEdit')).to.equal(wrapper.instance().onClickEdit);
      expect(transitionGroup.childAt(0).prop('onClickDelete')).to.equal(wrapper.instance().onClickDelete);

      expect(transitionGroup.childAt(1).type()).to.equal(CategoryListItem);
      expect(transitionGroup.childAt(1).prop('isOnline')).to.equal(true);
      expect(transitionGroup.childAt(1).prop('category')).to.deep.equal({id: 10, attributes: {label: 'pizza'}});
      expect(transitionGroup.childAt(1).prop('onClickEdit')).to.equal(wrapper.instance().onClickEdit);
      expect(transitionGroup.childAt(1).prop('onClickDelete')).to.equal(wrapper.instance().onClickDelete);

      expect(transitionGroup.childAt(2).type()).to.equal(CategoryListItem);
      expect(transitionGroup.childAt(2).prop('isOnline')).to.equal(true);
      expect(transitionGroup.childAt(2).prop('category')).to.deep.equal({id: 5, attributes: {label: 'zebras'}});
      expect(transitionGroup.childAt(2).prop('onClickEdit')).to.equal(wrapper.instance().onClickEdit);
      expect(transitionGroup.childAt(2).prop('onClickDelete')).to.equal(wrapper.instance().onClickDelete);
    });

    describe('calling `onClickDelete` with a category that is not being deleting', () => {
      beforeEach(() => {
        this.wrapper = this.generator.shallow();
        this.wrapper.instance().onClickDelete({id: 2, attributes: {label: 'asdf'}});
        this.wrapper.update();
      });

      it('should show the modal', () => {
        const modal = this.wrapper.find(Modal);
        expect(modal).to.have.length(1);
        expect(modal.prop('modalClassName')).to.equal('deleteCategoryModal-container');
      });

      it('should render a ModifyCategoryModal within the modal', () => {
        const modal = this.wrapper.find(Modal);
        const deleteCategoryModal = modal.find(DeleteCategoryModal);
        expect(deleteCategoryModal).to.have.length(1);
      });

      it('should pass the right props to DeleteCategoryModal', () => {
        const modal = this.wrapper.find(Modal);
        const deleteCategoryModal = modal.find(DeleteCategoryModal);
        expect(deleteCategoryModal.prop('onClickCancel')).to.equal(this.wrapper.instance().onClickModalCancel);
        expect(deleteCategoryModal.prop('onClickDelete')).to.equal(this.wrapper.instance().onConfirmDeleteModal);
        expect(deleteCategoryModal.prop('category')).to.deep.equal({id: 2, attributes: {label: 'asdf'}});
        expect(deleteCategoryModal.prop('deletingCategory')).to.be.falsey;
      });

      it('should close the modal when `onClickModalCancel` is called', () => {
        this.wrapper.instance().onClickModalCancel();
        this.wrapper.update();
        expect(this.wrapper.find(Modal)).to.have.length(0);
      });

      it('should close the modal when new props are passed in', () => {
        this.wrapper.setProps({
          categories: [
            {id: 10, attributes: {label: 'pizza'}},
            {id: 5, attributes: {label: 'zebras'}}
          ]
        });
        expect(this.wrapper.find(Modal)).to.have.length(0);
      });

      it('should call `deleteCategory` when `onConfirmDeleteModal` is called', () => {
        this.wrapper.instance().onConfirmDeleteModal();
        expect(this.deleteCategory).to.have.been.calledOnce;
        expect(this.deleteCategory).to.have.been.calledWithExactly(2);
      });
    });

    describe('calling `onClickDelete` with a category that has a delete in progress', () => {
      beforeEach(() => {
        this.wrapper = this.generator.shallow({
          categoriesMeta: [
            {id: 10},
            {id: 2, isDeleting: true},
            {id: 5}
          ]
        });
        this.wrapper.instance().onClickDelete({id: 2, attributes: {label: 'asdf'}});
        this.wrapper.update();
      });

      it('should pass the right props to DeleteCategoryModal', () => {
        const modal = this.wrapper.find(Modal);
        const deleteCategoryModal = modal.find(DeleteCategoryModal);
        expect(deleteCategoryModal.prop('onClickCancel')).to.equal(this.wrapper.instance().onClickModalCancel);
        expect(deleteCategoryModal.prop('onClickDelete')).to.equal(this.wrapper.instance().onConfirmDeleteModal);
        expect(deleteCategoryModal.prop('category')).to.deep.equal({id: 2, attributes: {label: 'asdf'}});
        expect(deleteCategoryModal.prop('deletingCategory')).to.be.true;
      });
    });

    describe('calling `onClickEdit` with a category that is not being edited', () => {
      beforeEach(() => {
        this.wrapper = this.generator.shallow();
        this.wrapper.instance().onClickEdit({id: 2, attributes: {label: 'asdf'}});
        this.wrapper.update();
      });

      it('should show the modal', () => {
        const modal = this.wrapper.find(Modal);
        expect(modal).to.have.length(1);
        expect(modal.prop('modalClassName')).to.equal('modifyCategoryModal-container');
      });

      it('should render a ModifyCategoryModal within the modal', () => {
        const modal = this.wrapper.find(Modal);
        const modifyCategoryModal = modal.find(this.ModifyCategoryModal);
        expect(modifyCategoryModal).to.have.length(1);
      });

      it('should pass the right props to ModifyCategoryModal', () => {
        const modal = this.wrapper.find(Modal);
        const modifyCategoryModal = modal.find(this.ModifyCategoryModal);
        expect(modifyCategoryModal.prop('categories')).to.deep.equal([
          {id: 10, attributes: {label: 'pizza'}},
          {id: 2, attributes: {label: 'asdf'}},
          {id: 5, attributes: {label: 'zebras'}}
        ]);
        expect(modifyCategoryModal.prop('onClickCancel')).to.equal(this.wrapper.instance().onClickModalCancel);
        expect(modifyCategoryModal.prop('onSubmit')).to.equal(this.wrapper.instance().onConfirmEditModal);
        expect(modifyCategoryModal.prop('category')).to.deep.equal({id: 2, attributes: {label: 'asdf'}});
        expect(modifyCategoryModal.prop('confirmInProgress')).to.be.false;
        expect(modifyCategoryModal.prop('initialValues')).to.deep.equal({id: 2, attributes: {label: 'asdf'}});
        expect(modifyCategoryModal.prop('isEditMode')).to.be.true;
      });

      it('should close the modal when `onClickModalCancel` is called', () => {
        this.wrapper.instance().onClickModalCancel();
        this.wrapper.update();
        expect(this.wrapper.find(Modal)).to.have.length(0);
      });

      it('should close the modal when new props are passed in', () => {
        this.wrapper.setProps({
          categoriesMeta: [
            {id: 10},
            {id: 2, updatingStatus: 'SUCCESS'},
            {id: 5}
          ]
        });
        expect(this.wrapper.find(Modal)).to.have.length(0);
        expect(this.resetUpdateCategoryResolution).to.have.been.calledOnce;
        expect(this.resetUpdateCategoryResolution).to.have.been.calledWithExactly({
          categoryId: 2
        });
      });

      it('should call `updateCategory` when `onConfirmEditModal` is called', () => {
        this.wrapper.instance().onConfirmEditModal({label: 'pizza', emoji: ':tada:'});
        expect(this.updateCategory).to.have.been.calledOnce;
        expect(this.updateCategory).to.have.been.calledWithExactly({
          id: 2,
          attributes: {
            label: 'pizza',
            emoji: ':tada:'
          }
        });
      });
    });

    describe('calling `onClickEdit` with a category that has an update in progress', () => {
      beforeEach(() => {
        this.wrapper = this.generator.shallow({
          categoriesMeta: [
            {id: 10},
            {id: 2, updatingStatus: 'PENDING'},
            {id: 5}
          ]
        });
        this.wrapper.instance().onClickEdit({id: 2, attributes: {label: 'asdf'}});
        this.wrapper.update();
      });

      it('should pass the right props to ModifyCategoryModal', () => {
        const modal = this.wrapper.find(Modal);
        const modifyCategoryModal = modal.find(this.ModifyCategoryModal);
        expect(modifyCategoryModal.prop('categories')).to.deep.equal([
          {id: 10, attributes: {label: 'pizza'}},
          {id: 2, attributes: {label: 'asdf'}},
          {id: 5, attributes: {label: 'zebras'}}
        ]);
        expect(modifyCategoryModal.prop('onClickCancel')).to.equal(this.wrapper.instance().onClickModalCancel);
        expect(modifyCategoryModal.prop('onSubmit')).to.equal(this.wrapper.instance().onConfirmEditModal);
        expect(modifyCategoryModal.prop('category')).to.deep.equal({id: 2, attributes: {label: 'asdf'}});
        expect(modifyCategoryModal.prop('confirmInProgress')).to.be.true;
        expect(modifyCategoryModal.prop('initialValues')).to.deep.equal({id: 2, attributes: {label: 'asdf'}});
        expect(modifyCategoryModal.prop('isEditMode')).to.be.true;
      });
    });
  });
});
