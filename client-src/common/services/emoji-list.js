import _ from 'lodash';
import emojiRenderer from './emoji-renderer';

const names = _.map(emojiRenderer.data, v => v[3][0]);
const html = _.map(names, name => emojiRenderer.replace_colons(`:${name}:`));

export default _.zipObject(names, html);
