create user lab13_user;

grant pg_read_all_data to lab13_user;

revoke pg_read_all_data from lab13_user;

create role lab13_roleUDI;

grant insert, update, delete on all tables in schema library to lab13_roleUDI;

grant lab13_roleUDI to lab13_user;

create or replace view new_books as select * from library.book where library.book.book_year > 2000 with check option;

grant insert, update, delete on public.new_books to lab13_roleUDI;