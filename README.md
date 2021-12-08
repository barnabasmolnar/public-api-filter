# Public API filter

This project provides a frontend for the [excellent Public APIs collection available on GitHub](https://github.com/public-apis/public-apis). You can filter by title, category, auth and HTTPS options.

## Notes

As far as I know, there is no official JSON data provided for the list, so I came up with a [quick little script](https://stackblitz.com/edit/node-bzt7td?file=index.js) to parse and collect the relevant data into a single `.json` file which the React frontend can then consume. It appears that `markdown-tables-to-json` dependency I'm using escapes some characters which leads to occasional results such as `"title": "Abstract&#39;s Holiday API"`. For now, this remains a temporary shortcoming with my humble apologies. The data isn't very fresh either, last time I ran this script was back in Sept 2021, I believe, so some of the latest additions to the list are missing.

I'm currently working on a fancy little Haskell version of this parser which should address the shortcoming mentioned above. 👀 It's also gonna be tons cooler, naturally, so there's that. 😎

Finally, at some point I might also look into setting up some sort of pipeline/automation to run the parser and upload the resulting fresh `.json` file at regular intervals. No promises, though.
