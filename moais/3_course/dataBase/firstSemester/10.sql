INSERT INTO book (author, title, publisher, book_year)
values ('КаТ.С', 'Алгоритмы', 'Мск', 2021);
/
INSERT INTO book_status (status_name)
VALUES ('в библиотеке'),
       ('в учебном классе'),('выдана'), ('устарела');

Select * from book;

select * from book_status;
/
insert into book_in_lib (lib_book_id, status_id)
values (1,1), (2,3), (3,4);
/
CREATE Temp TABLE BookStatus1(
    StatusID int PRIMARY KEY,
    StatusName varchar(50) NOT NULL UNIQUE);

INSERT INTO BookStatus1 SELECT * FROM book_status;
/
/
create temp table book2(
    book_id   serial not null
          primary key,
    author    text,
    title     text   not null,
    publisher text,
    book_year integer
      constraint book_book_year_check
          check (book_year >2000)
);

insert into book2 SELECT * from library.book where (book_year>2000);
select * from book2
/
/
update book2 set book_year=book_year+2;
update BookStatus1 set StatusName ='обветшала' where StatusName = 'устарела';
/
select * from BookStatus1;
delete from BookStatus1 where StatusName='обветшала';
/

delete from library.book;

delete from book2;