update library.book_in_lib set lib_id = 10 where lib_id in (2,3);

update library.book_in_lib set lib_id = 10 where lib_id = 2;
update library.book_in_lib set lib_id = 10 where lib_id = 3;

update library.book_in_lib set lib_id = 2 where lib_id = 10;

begin transaction isolation level repeatable read ;
update library.book_in_lib set lib_id = 10 where lib_id = 2;
select * from library.book_in_lib;
savepoint check1;
insert into library.book_in_lib (lib_book_id, status_id) values (6,1);
select * from library.book_in_lib;
rollback to check1;

end transaction ;

select * from library.book_in_lib

select txid_current();

select * from library.book_in_lib;

select * from pg_locks;