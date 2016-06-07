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

// Returns a list of names mapped to their representation on the particular
// platform. For instance,
// {
//   smile: "<span>...</span>"
// }
//
// The mapped version will be platform-specific, so on iOS it would be the
// Emoji themselves rather than, say, spans.
const names = _.map(emojiRenderer.data, v => v[3][0]);
const html = _.map(names, name => emojiRenderer.replace_colons(`:${name}:`));

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
  .map((category, index) => {
    const relativeIndex = (categories.length - index) * 10000;
    return _.map(category.emoji, e => {
      return {
        name: e.short_name,
        html: e.html,
        order: -relativeIndex + e.sort_order
      };
    });
  })
  .flatten()
  .sortBy('order')
  .value();

export default {
  byName,
  categories
};
