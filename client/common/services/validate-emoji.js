import emoji from './js-emoji';

// If `emojiString` is a valid string, then this returns `true`.
// Otherwise, false is returned
//
// validateEmoji(':smile:') => true
// validateEmoji(':whatever:') => false
export default (emojiString) => {
  return emojiString !== emoji.replace_colons(emojiString);
};
