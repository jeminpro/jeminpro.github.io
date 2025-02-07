---
title: Markdown quick guide
description: Breif description here
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

```md
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6
```

<section class="output">

# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

</section>

## Paragraphs
To create paragraphs, use a blank line to separate one or more lines of text.

```md
I really like using Markdown.

I think I'll use it to format all of my documents from now on.
```

<section class="output">

I really like using Markdown.

I think I'll use it to format all of my documents from now on.

</section>

## Line Breaks

To create a line break or new line, end a line with `two or more spaces`, and then type return.
Or use  `<br>` to be explicit

```md
This is the first line.  
And this is the second line.<br>Explicit third line
```
<section class="output">

This is the first line.  
And this is the second line.<br>Explicit third line

</section>

##  Bold, Italics, and Strikethrough
You can add emphasis by making text bold (**) or italic (*) or strikethrough (~~).

```md
**Bold Text**  
*Italic Text*  
~~Strikethrough~~
```

<section class="output">

**Bold Text**  
*Italic Text*  
~~Strikethrough~~

</section>

## Links
To create a link, enclose the link text in brackets (e.g., [Duck Duck Go]) and then follow it immediately with the URL in parentheses (e.g., (https://duckduckgo.com)).

```md
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
```

<section class="output">

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

</section>

You can optionally add a title for a link. This will appear as a tooltip when the user hovers over the link. To add a title, enclose it in quotation marks after the URL.

```md
My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").
```

<section class="output">

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

</section>

To quickly turn a URL or email address into a link, enclose it in angle brackets.

```md
<https://www.markdownguide.org>
<fake@example.com>
```

<section class="output">

<https://www.markdownguide.org>
<fake@example.com>

</section>


## Images
To add an image, add an exclamation mark (!), followed by alt text in brackets, and the path or URL to the image asset in parentheses. You can optionally add a title in quotation marks after the path or URL.

```md
![Flying over a mountain!](https://images.unsplash.com/photo-1736967439874-d0c856eacda1 "Optional title")
```

![Flying over a mountain!](https://images.unsplash.com/photo-1736967439874-d0c856eacda1 "Optional title")


To add a link to an image, enclose the Markdown for the image in brackets, and then add the link in parentheses.

```md
[![Mountains](https://images.unsplash.com/photo-1736195197369-cb7c27899172 "Staffal, Aosta Valley, Italy")](https://unsplash.com/photos/a-snow-covered-mountain-with-a-sky-background-N3MU65BEOY0)
```

[![Mountains](https://images.unsplash.com/photo-1736195197369-cb7c27899172 "Staffal, Aosta Valley, Italy")](https://unsplash.com/photos/a-snow-covered-mountain-with-a-sky-background-N3MU65BEOY0)



## Blockquotes

To create a blockquote, add a > in front of a paragraph.

```md
> This is a blockquote.
```

> This is a blockquote.

Blockquotes can contain multiple paragraphs. Add a > on the blank lines between the paragraphs.

```md
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.


Blockquotes can contain other Markdown formatted elements. Not all elements can be used — you’ll need to experiment to see which ones work.

```md
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.
```

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.


## Lists
You can organize items into ordered and unordered lists.

To create an ordered list, add line items with numbers followed by periods. The numbers don’t have to be in numerical order, but the list should start with the number one.

```md
1. First item
2. Second item
3. Third item
4. Fourth item
    1. Indented item
    2. Indented item
```


<section class="output">

1. First item
2. Second item
3. Third item
4. Fourth item
    1. Indented item
    2. Indented item

</section>

To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items. Indent one or more items to create a nested list.
If you need to start an unordered list item with a number followed by a period, you can use a backslash (\) to escape the period.

```md
- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
- 1985\. A great year!
```


<section class="output">

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
- 1985\. A great year!

</section>

## Horizontal Rules
To create a horizontal rule, use three or more asterisks (***), dashes (---), or underscores (___) on a line by themselves.

```md
---
```

---


## Escaping Characters

To display a literal character that would otherwise be used to format text in a Markdown document, add a backslash (\) in front of the character.

```md
\* Without the backslash, this would be a bullet in an unordered list.
```

<section class="output">

\* Without the backslash, this would be a bullet in an unordered list.

</section>

# Code Blocks

To denote a word or phrase as code, enclose it in backticks (`).


```md
At the command prompt, type `nano`.
```

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

# Tables
To add a table, use three or more hyphens (---) to create each column’s header, and use pipes (|) to separate each column. For compatibility, you should also add a pipe on either end of the row.

| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |


You can align text in the columns to the left, right, or center by adding a colon (:) to the left, right, or on both side of the hyphens within the header row.

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

In most cases, you can simply copy an emoji from a source like [Emojipedia](https://emojipedia.org/) or [Gist Emoji List](https://gist.github.com/rxaviers/7360908) and paste it into your document.

🔥
😊
