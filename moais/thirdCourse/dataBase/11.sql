SELECT * FROM library.book
WHERE book.title LIKE 'Б%';
/
select title from library.book
where (book_year>1999) and (author like 'Г%') and (publisher like '%а')
order by (title) DESC;
/
select title from library.book
where (title like '%!_%' escape '!' and length(title)>1);
/
select distinct publisher from library.book
left join library.book_in_lib bil on book.book_id = bil.lib_book_id
where bil.status_id=6;
/
select distinct publisher from library.book
left join library.book_in_lib bil on book.book_id = bil.lib_book_id
where bil.status_id = 6 or bil.status_id !=4;
/
select b.publisher, b1.publisher from library.book as b, library.book as b1
where b.publisher<>b1.publisher;
/
