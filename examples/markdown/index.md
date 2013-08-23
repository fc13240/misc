[普通markdown语法](http://daringfireball.net/projects/markdown/syntax)

[php Markdown Extra](http://michelf.ca/projects/php-markdown/extra/)
<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>
http://images.google.com/images?num=30&amp;q=larry+bird

This is an H1
=============

This is an H2
-------------

# This is an H1

## This is an H2

###### This is an H6

# This is an H1 #

## This is an H2 ##

### This is an H3 ######


> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.


> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.


> ## This is a header.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
>     return shell_exec("echo $input | $markdown_script");
>```
var test = 1;
>```

*   Red
*   Green
*   Blue

---

+   Red
+   Green
+   Blue

---

-   Red
-   Green
-   Blue

---

1.  Bird
2.  McHale
3.  Parish

---

1.  Bird
1.  McHale
1.  Parish

---

3. Bird
1. McHale
8. Parish

---

*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.

---

*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.

---


*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.
*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.

---

1986. What a great season.

1986\. What a great season.

This is a normal paragraph:

    This is a code block.

Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell

---

    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>

HORIZONTAL RULES

* * *

***

*****

- - -

---------------------------------------

LINKS
This is [an example](http://example.com/ "Title") target link.

[This link](http://example.net/) has no title attribute.

This is [an example][id] reference-style link.
[id]: http://example.com/  "Optional Title Here"

[Google][]
[Google]: http://google.com/


Visit [Daring Fireball][] for more information.

[Daring Fireball]: http://daringfireball.net/

I get 10 times more traffic from [Google] [1] than from
[Yahoo] [2] or [MSN] [3].

  [1]: http://google.com/        "Google"
  [2]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"


  I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

  [google]: http://google.com/        "Google"
  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
  [msn]:    http://search.msn.com/    "MSN Search"

---

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

un*frigging*believable

\*this text is surrounded by literal asterisks\*

Use the `printf()` function.

``There is a literal backtick (`) here.``

A single backtick in a code span: `` ` ``

A backtick-delimited string in a code span: `` `foo` ``

Please don't use any `<blink>` tags.

`&#8212;` is the decimal-encoded equivalent of `&mdash;`.

<http://example.com/>

<address@example.com>

"address@example.com".

\*literal asterisks\*

\   backslash
`   backtick
*   asterisk
_   underscore
{}  curly braces
[]  square brackets
()  parentheses
#   hash mark
+   plus sign
-   minus sign (hyphen)
.   dot
!   exclamation mark