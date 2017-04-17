import {
  ModifyCategoryModal, __GetDependency__
} from '../../../../../client/categories/components/modify-category-modal';
import generateWrapperGenerator from '../../../../services/generate-wrapper-generator';

const validate = __GetDependency__('validate');

describe('ModifyCategoryModal', function() {
  describe('validate', () => {
    describe('"empty" errors', () => {
      it('should error when the label is an empty string', () => {
        const errors = validate(
          {label: ''},
          {categories: []}
        );
        expect(errors.label).to.equal('empty');
      });

      it('should error when the label is only whitespace', () => {
        const errors = validate(
          {label: '   '},
          {categories: []}
        );
        expect(errors.label).to.equal('empty');
      });

      it('should not error when there is text', () => {
        const errors = validate(
          {label: ' a   '},
          {categories: []}
        );
        expect(errors).to.be.empty;
      });
    });

    describe('duplicate', () => {
      it('should error when the label matches another', () => {
        const errors = validate(
          {label: 'sandwich'},
          {
            category: {id: 1, attributes: {label: 'pizza'}},
            categories: [
              {id: 3, attributes: {label: 'sandwich'}},
              {id: 4, attributes: {label: 'pasta'}},
            ]
          }
        );
        expect(errors.label).to.equal('duplicate');
      });

      it('should not error when the label matches itself', () => {
        const errors = validate(
          {label: 'sandwich'},
          {
            category: {id: 1, attributes: {label: 'sandwich'}},
            categories: [
              {id: 1, attributes: {label: 'sandwich'}},
              {id: 3, attributes: {label: 'pizza'}},
              {id: 4, attributes: {label: 'pasta'}},
            ]
          }
        );
        expect(errors).to.be.empty;
      });
    });
  });

  describe('rendering with `isEditMode` false', () => {
    beforeEach(() => {
      this.handleSubmit = stub();
      this.onClickCancel = stub();

      this.defaultProps = {
        fields: {
          label: {}
        },
        handleSubmit: this.handleSubmit,
        confirmInProgress: false,
        onClickCancel: this.onClickCancel,
        isEditMode: false
      };

      this.generator = generateWrapperGenerator(this.defaultProps, ModifyCategoryModal);
    });

    it('should have the right class name', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.hasClass('createCategoryModal')).to.be.true;
    });

    it('should have the right modal title when edit mode is false', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.find('.modal-title').text()).to.equal('Create new category');
    });

    it('should have the right modal title when edit mode is true', () => {
      const wrapper = this.generator.shallow({isEditMode: true});
      expect(wrapper.find('.modal-title').text()).to.equal('Edit category');
    });

    it('should not render an error', () => {
      const wrapper = this.generator.shallow();
      expect(wrapper.find('.modal-error')).to.have.length(0);
    });

    it('should focus the label on mount', () => {
      const wrapper = this.generator.shallow();
      const focusStub = stub();
      wrapper.instance().labelInput = {
        focus: focusStub
      };
      wrapper.instance().componentDidMount();
      expect(focusStub).to.have.been.calledOnce;
    });

    it('should not render an error when the label has not been touched', () => {
      const props = {
        fields: {
          label: {
            error: 'sorry',
            touched: false
          }
        }
      };
      const wrapper = this.generator.shallow(props);
      expect(wrapper.find('.modal-error')).to.have.length(0);
    });

    it('should render an empty error when the label has an "empty" error', () => {
      const props = {
        fields: {
          label: {
            error: 'empty',
            touched: true
          }
        }
      };
      const wrapper = this.generator.shallow(props);
      const errorEl = wrapper.find('.modal-error');
      expect(errorEl).to.have.length(1);
      expect(errorEl.text()).to.equal('A name is required');
    });

    it('should render a duplicate error when the label has an "duplicate" error', () => {
      const props = {
        fields: {
          label: {
            error: 'duplicate',
            touched: true
          }
        }
      };
      const wrapper = this.generator.shallow(props);
      const errorEl = wrapper.find('.modal-error');
      expect(errorEl).to.have.length(1);
      expect(errorEl.text()).to.equal('Category already exists');
    });

    describe('the form', () => {
      it('should contain an emoji picker', () => {
        const form = this.generator.shallow().find('form');
        expect(form.find('.createCategoryModal-emojiSelect')).to.have.length(1);
      });

      it('should contain a label input with the right props', () => {
        const form = this.generator.shallow().find('form');
        const labelInput = form.find('.newCategoryName');
        expect(labelInput).to.have.length(1);
        expect(labelInput.hasClass('text-input')).to.be.true;
        expect(labelInput.hasClass('invalid-input')).to.be.false;
        expect(labelInput.prop('type')).to.equal('text');
        expect(labelInput.prop('placeholder')).to.equal('Enter name');
        expect(labelInput.prop('disabled')).to.be.falsey;
      });

      it('should have a disabled input when a creation is in progress', () => {
        const props = {confirmInProgress: true};
        const form = this.generator.shallow(props).find('form');
        const labelInput = form.find('.newCategoryName');
        expect(labelInput.prop('disabled')).to.be.true;
      });

      it('should call preventDefault and `handleSubmit` when submitted', () => {
        const form = this.generator.shallow().find('form');
        const preventDefault = stub();
        form.simulate('submit', {preventDefault});
        expect(preventDefault).to.have.been.calledOnce;
        expect(this.handleSubmit).to.have.been.calledOnce;
      });

      describe('cancel button', () => {
        it('should exist', () => {
          const wrapper = this.generator.shallow();
          const cancelBtn = wrapper.find('.createCategoryModal-cancelBtn');
          expect(cancelBtn).to.have.length(1);
        });

        it('should not be disabled when no confirm is in progress', () => {
          const wrapper = this.generator.shallow();
          const cancelBtn = wrapper.find('.createCategoryModal-cancelBtn');
          expect(cancelBtn.prop('disabled')).to.be.falsey;
        });

        it('should not be disabled even when there is an error', () => {
          const props = {
            fields: {
              label: {
                error: 'sorry',
                touched: true
              }
            }
          };
          const wrapper = this.generator.shallow(props);
          const cancelBtn = wrapper.find('.createCategoryModal-cancelBtn');
          expect(cancelBtn.prop('disabled')).to.be.falsey;
        });

        it('should be disabled when a creation is in progress', () => {
          const props = {confirmInProgress: true};
          const wrapper = this.generator.shallow(props);
          const cancelBtn = wrapper.find('.createCategoryModal-cancelBtn');
          expect(cancelBtn.prop('disabled')).to.be.true;
        });

        it('should have the right text', () => {
          const wrapper = this.generator.shallow();
          const cancelBtn = wrapper.find('.createCategoryModal-cancelBtn');
          expect(cancelBtn.text()).to.equal('Cancel');
        });

        it('should preventDefault and call `onClickCancel` when clicked', () => {
          const preventDefault = stub();
          const wrapper = this.generator.shallow();
          const cancelBtn = wrapper.find('.createCategoryModal-cancelBtn');
          cancelBtn.simulate('click', {preventDefault});
          expect(preventDefault).to.have.been.calledOnce;
          expect(this.onClickCancel).to.have.been.calledOnce;
        });
      });

      describe('confirm button', () => {
        it('should exist', () => {
          const wrapper = this.generator.shallow();
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn).to.have.length(1);
        });

        it('should be the submit button', () => {
          const wrapper = this.generator.shallow();
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn.prop('type')).to.equal('submit');
        });

        it('should not be disabled when there are no errors & no save in progress', () => {
          const wrapper = this.generator.shallow();
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn.prop('disabled')).to.be.falsey;
        });

        it('should not be disabled when there is an error but the form has not been touched', () => {
          const props = {
            fields: {
              label: {
                error: 'sorry',
                touched: false
              }
            }
          };
          const wrapper = this.generator.shallow(props);
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn.prop('disabled')).to.be.falsey;
        });

        it('should be disabled when there is an error and the form has been touched', () => {
          const props = {
            fields: {
              label: {
                error: 'sorry',
                touched: true
              }
            }
          };
          const wrapper = this.generator.shallow(props);
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn.prop('disabled')).to.be.true;
        });

        it('should be disabled when a creation is in progress', () => {
          const props = {confirmInProgress: true};
          const wrapper = this.generator.shallow(props);
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn.prop('disabled')).to.be.true;
        });

        it('should have the right text', () => {
          const wrapper = this.generator.shallow();
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn.text()).to.equal('Create');
        });

        it('should have the right text when edit mode is true', () => {
          const wrapper = this.generator.shallow({isEditMode: true});
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn.text()).to.equal('Edit');
        });

        it('should have the right text when a create is in progress', () => {
          const wrapper = this.generator.shallow({confirmInProgress: true});
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn.text()).to.equal('Creating...');
        });

        it('should have the right text when a create is in progress in edit mode', () => {
          const props = {
            confirmInProgress: true,
            isEditMode: true
          };
          const wrapper = this.generator.shallow(props);
          const confirmBtn = wrapper.find('.createCategoryModal-confirmBtn');
          expect(confirmBtn.text()).to.equal('Editing...');
        });
      });
    });
  });
});
