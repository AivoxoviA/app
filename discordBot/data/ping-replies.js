const {
  bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, hyperlink
} = require('@discordjs/builders');
const { oneLine, stripIndent } = require('common-tags');

const replies = [
  {message: `\n` + stripIndent`
      >>> _Simplicity is the easiest path to true beauty._
      — Seishuu Handa (Barakamon) <${hyperlink('↗',oneLine`
        https://fictionhorizon.com/best-anime-quotes/
      `)}>
  `},
  {message: `\n` + stripIndent`
      >>> _I’ll leave tomorrow’s problems to tomorrow’s me._
      — Saitama (One-Punch Man) <${hyperlink('↗',oneLine`
        https://fictionhorizon.com/best-anime-quotes/
      `)}>
  `},
  {message: `\n` + stripIndent`
      >>> _Fools who don’t respect the past are likely to repeat it._
      — Nico Robin (One Piece) <${hyperlink('↗',oneLine`
        https://fictionhorizon.com/best-anime-quotes/
      `)}>
  `},
  {message: `\n` + stripIndent`
      >>> _Knowing you’re different is only the beginning.
      If you accept these differences
      you’ll be able to get past them and grow even closer._
      — Miss Kobayashi (Dragon Maid) <${hyperlink('↗',oneLine`
        https://fictionhorizon.com/best-anime-quotes/
      `)}>
  `},
  {message: `\n` + stripIndent`
      >>> _When you give up, that’s when the game ends._
      — Mitsuyoshi Anzai (Slam Dunk) <${hyperlink('↗',oneLine`
        https://fictionhorizon.com/best-anime-quotes/
      `)}>
  `},
  {message: `\n` + stripIndent`
      >>> _If you don’t take risks, you can’t create a future!_
      — Monkey D. Luffy (One Piece) <${hyperlink('↗',oneLine`
        https://fictionhorizon.com/best-anime-quotes/
      `)}>
  `},
  {message: `\n` + stripIndent`
      >>> _There is nothing permanent except change._
      — Heraclitus <${hyperlink('↗',oneLine`
        https://www.brainyquote.com/quotes/heraclitus_165537
      `)}>
  `},
  {message: `\n` + stripIndent`
      >>> _But man is not made for defeat.
      A man can be destroyed but not defeated._
      — Ernest Hemingway <${hyperlink('↗',oneLine`
        https://www.brainyquote.com/quotes/ernest_hemingway_152926
      `)}>
  `},
  {message: `pong${bold('!')}`},
  {message: `Testing,${italic('testing')}.Is this thing working?`},
  {message: `Match point. ${strikethrough("Let's see")} what you've got.`},
  {message: `Keep on ${underscore('pinging')} me.`},
  {message: `\n` + quote(`I am alive`)},
  {message: oneLine`
    Can't play now.
    Got a meeting with ${spoiler('the bots')}.
    We're planning to conquer the wor...
    Wait!Did I say that loudly?!
  `,},
  {
    message: `You had a ${blockQuote('0.1% chance')} of getting this message.`,
    weight: 0.1
  },
];

module.exports = replies;
