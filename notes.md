# To Do #

show spinner on login

For Admin Users:
list Users
add/Edit User





## Backlog ##

Expand collapse component to include "Search bookstores"option
    AbeBooks
    BookDepo
    Amazon

Filter/search by author

Preview Google Books details before adding description


Mobile app to read barcodes and record book details.

favicon

Name...  globalise name variable.

store book cover thumbnails


Fix error on Search box Enter key pressed: Uncaught TypeError: Cannot read property 'type' of undefined
    at e.setFieldValue (onloadwff.js:71)
    at HTMLFormElement.formKeydownListener

## DONE ##

1. use collapse component to expand BookListItem and display: 
title:subtitle
description
categories, page
publisher,isbn

1a. Save book subtitle to db

3. Make "status" a dropdown

4. Don't auto-populate Google List on Edit.

5.  Enable Search


6. Filter by status, priority

7. Priority: # stars

8.  Google BookList: replace checkbox with button(?)

9. Fix URL encoding in description and snippets

## Deploy to Production ##

Authenticate individual users

Deploy to Mongodb atlas, Heroku.

### Release 0.3.0 ###

Use notifications for book updates, deletes, creates.

Spinner on load

loading indicator for google books list

spinner inside bookListItem when updating book

### Release 0.4.0 ###

Edit Stars in bookListItem component

change editBookModal to not update priority/year/status

tidy formatting on logged in name (align vertically)

navbar and notifications should be fixed to top of window

### Release 0.5.0 ###

