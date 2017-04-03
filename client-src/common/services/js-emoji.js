import EmojiConverter from 'js-emoji';

//
// This file exports an instance of `js-emoji`. It is used
// to turn a string, like `:smile:`, into HTML markup that the app
// will display as an emoji.
//
// Usage:
// `emoji.replace_colons(':smile:')`
//
// This can then be set as the HTML of an element to render an emoji.
//

const emoji = new EmojiConverter();

emoji.use_sheet = true;
emoji.img_sets = {
  apple: {
    sheet: '/sheet_apple_64.png',
    mask: 1
  }
};
// emoji.text_mode = true;
emoji.img_set = 'apple';

emoji.init_env();

export default emoji;
