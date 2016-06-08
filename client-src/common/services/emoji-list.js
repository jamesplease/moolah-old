import _ from 'lodash';
import emoji from 'emoji-data';
import emojiRenderer from './emoji-renderer';

const categoryOrder = [
  'People',
  'Nature',
  'Foods',
  'Activity',
  'Places',
  'Objects',
  'Symbols',
  'Flags',
];

function generateHtml(name) {
  return emojiRenderer.replace_colons(`:${name}:`);
}

const categories = _.map(categoryOrder, category => {
  const emojiList = _.filter(emoji, e => e.category === category);
  return {
    name: category,
    emoji: emojiList.map(e => {
      return {
        ...e,
        html: generateHtml(e.short_name)
      };
    })
  };
});

const byName = _.chain(categories)
  .map((category) => {
    return _.chain(category.emoji)
      .sortBy('sort_order')
      .map(e => {
        return {
          name: e.short_name,
          html: e.html
        };
      })
      .value();
  })
  .flatten()
  .value();

export default {
  byName,
  categories
};
