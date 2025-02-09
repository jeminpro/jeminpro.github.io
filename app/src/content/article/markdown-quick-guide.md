---
title: Markdown quick guide
description: This Astro website uses Markdown to format its content. This article covers basic and extended Markdown syntax, along with custom sections relevant to this site.
publishedDate: '2025-02-07'
category: Front End


# References
# https://www.markdownguide.org/basic-syntax/#code
# https://www.markdownguide.org/extended-syntax/#tables

---

This Astro website uses Markdown to format its content. 
This article covers basic and extended Markdown syntax, along with custom sections relevant to this site.

## Headings
To create a heading, add number signs (#) in front of a word or phrase. The number of number signs you use should correspond to the heading level.

<pre>
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6
</pre>

# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

## Paragraphs
To create paragraphs, use a blank line to separate one or more lines of text.

<pre>

I really like using Markdown.

I think I'll use it to format all of my documents from now on.
</pre>


I really like using Markdown.

I think I'll use it to format all of my documents from now on.

## Line Breaks

To create a line break or new line, end a line with `two or more spaces`, and then type return.
Or use  `<br>` to be explicit

<pre>
This is the first line.  
And this is the second line. &lt;br&gt; Explicit third line
</pre>


This is the first line.  
And this is the second line.<br>Explicit third line

##  Bold, Italics, and Strikethrough
You can add emphasis by making text bold (**) or italic (*) or strikethrough (~~).

<pre>

**Bold Text**  
*Italic Text*  
~~Strikethrough~~
</pre>


**Bold Text**  
*Italic Text*  
~~Strikethrough~~

## Links
To create a link, enclose the link text in brackets (e.g., [Duck Duck Go]) and then follow it immediately with the URL in parentheses (e.g., (https://duckduckgo.com)).

<pre>
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
</pre>


My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

You can optionally add a title for a link. This will appear as a tooltip when the user hovers over the link. To add a title, enclose it in quotation marks after the URL.


<pre>
My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").
</pre>

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

To quickly turn a URL or email address into a link, enclose it in angle brackets.

<pre>
&lt;https://www.markdownguide.org&gt;

&lt;fake@example.com&gt;
</pre>


<https://www.markdownguide.org>

<fake@example.com>


## Images
To add an image, add an exclamation mark (!), followed by alt text in brackets, and the path or URL to the image asset in parentheses. You can optionally add a title in quotation marks after the path or URL.

<pre>
![Flying over a mountain!](https://images.unsplash.com/photo-1736967439874-d0c856eacda1 "Optional title")
</pre>


![Flying over a mountain!](https://images.unsplash.com/photo-1736967439874-d0c856eacda1 "Optional title")


To add a link to an image, enclose the Markdown for the image in brackets, and then add the link in parentheses.

<pre>
[![Mountains](https://images.unsplash.com/photo-1736195197369-cb7c27899172 "Staffal, Aosta Valley, Italy")](https://unsplash.com/photos/a-snow-covered-mountain-with-a-sky-background-N3MU65BEOY0)
</pre>


[![Mountains](https://images.unsplash.com/photo-1736195197369-cb7c27899172 "Staffal, Aosta Valley, Italy")](https://unsplash.com/photos/a-snow-covered-mountain-with-a-sky-background-N3MU65BEOY0)



## Blockquotes

To create a blockquote, add a > in front of a paragraph.

<pre>
> This is a blockquote.
</pre>


> This is a blockquote.

Blockquotes can contain multiple paragraphs. Add a > on the blank lines between the paragraphs.

<pre>
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
</pre>

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.


Blockquotes can contain other Markdown formatted elements. Not all elements can be used — you’ll need to experiment to see which ones work.

<pre>
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.
</pre>

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.


## Lists
You can organize items into ordered and unordered lists.

To create an ordered list, add line items with numbers followed by periods. The numbers don’t have to be in numerical order, but the list should start with the number one.

<pre>
1. First item
2. Second item
3. Third item
4. Fourth item
    1. Indented item
    2. Indented item
</pre>

1. First item
2. Second item
3. Third item
4. Fourth item
    1. Indented item
    2. Indented item

To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items. Indent one or more items to create a nested list.
If you need to start an unordered list item with a number followed by a period, you can use a backslash (\) to escape the period.

<pre>
- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
- 1985\. A great year!
</pre>


- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
- 1985\. A great year!
s
## Horizontal Rules
To create a horizontal rule, use three or more asterisks (***), dashes (---), or underscores (___) on a line by themselves.

<pre>
---
</pre>

---


## Escaping Characters

To display a literal character that would otherwise be used to format text in a Markdown document, add a backslash (\) in front of the character.

<pre>
\* Without the backslash, this would be a bullet in an unordered list.
</pre>

\* Without the backslash, this would be a bullet in an unordered list.

# Code Blocks

To denote a word or phrase as code, enclose it in backticks (`).


<pre>
At the command prompt, type `nano`.
</pre>

At the command prompt, type `nano`.


Multiline Code Blocks

<pre>
```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
</pre>


```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

In this website I have used [Expressive code](https://expressive-code.com/key-features/syntax-highlighting/) for syntax highlighting which supports [most of the languages](https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-grammars/README.md). Below are some of the additional features of expressive code.

<pre>
```js Title="optional_title_example.js"
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
</pre>

```js Title="Optional title example.js"
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

Show line number

<pre>
```js showLineNumbers
// This code block will show line numbers
console.log('Greetings from line 2!')
console.log('I am on line 3')
```
</pre>

```js showLineNumbers
// This code block will show line numbers
console.log('Greetings from line 2!')
console.log('I am on line 3')
```


Marking full lines & line ranges

<pre>
```js {1, 4, 7-8}
// Line 1 - targeted by line number
// Line 2
// Line 3
// Line 4 - targeted by line number
// Line 5
// Line 6
// Line 7 - targeted by range "7-8"
// Line 8 - targeted by range "7-8"
```
</pre>

```js {1, 4, 7-8}
// Line 1 - targeted by line number
// Line 2
// Line 3
// Line 4 - targeted by line number
// Line 5
// Line 6
// Line 7 - targeted by range "7-8"
// Line 8 - targeted by range "7-8"
```

Selecting line marker types (mark, ins, del)

<pre>

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('this line is marked as deleted')
  // This line and the next one are marked as inserted
  console.log('this is the second inserted line')

  return 'this line uses the neutral default marker type'
}
```
</pre>

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('this line is marked as deleted')
  // This line and the next one are marked as inserted
  console.log('this is the second inserted line')

  return 'this line uses the neutral default marker type'
}
```


Marking individual text inside lines

<pre>
```js "given text"
function demo() {
  // Mark any given text inside lines
  return 'Multiple matches of the given text are supported';
}
```
</pre>

```js "given text"
function demo() {
  // Mark any given text inside lines
  return 'Multiple matches of the given text are supported';
}
```

# Tables
To add a table, use three or more hyphens (---) to create each column’s header, and use pipes (|) to separate each column. For compatibility, you should also add a pipe on either end of the row.

<pre>
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |
</pre>

| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |


You can align text in the columns to the left, right, or center by adding a colon (:) to the left, right, or on both side of the hyphens within the header row.

<pre>
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
</pre>

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

## Task Lists
Task lists (also referred to as checklists and todo lists) allow you to create a list of items with checkboxes.

```md
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```


- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media


## Emoji

You can simply copy an emoji from a source like [Emojipedia](https://emojipedia.org/) or [Gist Emoji List](https://gist.github.com/rxaviers/7360908) and paste it into your document.

🔥

😊

