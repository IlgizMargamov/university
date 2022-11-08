#include <cstring>
#include <iostream>
# include "BuddyAllocator.h"


int main(int argc, char* argv[]) {
    auto buf = new buddy_allocator<char>(32);
    char* s = buf->insert(12);
    memcpy(s, "aloha\n", 6);
    buf->remove(s, 6);
    s = buf->insert(25);
    buf->remove(s, 30);
    s = buf->insert(54);
    cout << s;
    buf->remove(s, 6);
    cout << s;
    return 0;
}