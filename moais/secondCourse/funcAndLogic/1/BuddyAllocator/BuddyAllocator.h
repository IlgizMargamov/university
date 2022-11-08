#include <cstdio>
#include <iostream>
#include "buffer_block.h"

template<typename T>
class buddy_allocator {
private:
    using value_type = T;
    using buffer_type = buffer_block<T>;

    typedef size_t size_type;
    typedef T* pointer;


    //buffer_type *first_buf_block = NULL;
    buffer_type* empty_pre_first_block = new buffer_type(0);
    pointer p = NULL;

    buffer_type* getFirstBufBlock()
    {
        return empty_pre_first_block->next;
    }

    int getBlockSize(int requestedSize) {
        int ans = 1;
        while (ans < requestedSize) { ans *= 2; }
        cout << "need " << ans << " bytes\n";
        return ans;
    }

    buffer_type* getMinGoodBlock(size_t requestedBlockSize) {
        cout << "looking for a chunk for " << requestedBlockSize << " bytes; ";
        buffer_type* current = getFirstBufBlock();
        buffer_type* ans = getFirstBufBlock();
        size_t minSize = SIZE_MAX;
        while (current != nullptr)
        {
            cout << "look at chunk of " << current->block_size << " size; ";
            //cout << (size_t)current->block_size << ">=" << (size_t)requestedChunk << "  " << ((size_t)current->block_size >= (size_t)requestedChunk);
            if ((size_t)current->block_size >= (size_t)requestedBlockSize && minSize > current->block_size)
            {
                cout << "it's good; ";
                minSize = current->block_size;
                ans = current;
            }
            current = current->next;
        }
        cout << "\n";
        while (ans->block_size > requestedBlockSize)
        {
            auto temp = ans->prev;
            ans->splitBlock();
            ans = temp->next;
        }
        cout << "min good chunk has " << ans->block_size << " size\n";
        return ans;
    }

public:

    //not_buddy_allocator operator=(const not_buddy_allocator &c) = delete;

    pointer insert(size_type n) {
        cout << "allocator allocates " << n << "\n";
        int block_size = getBlockSize(n);
        auto blockToAlloc = getMinGoodBlock(block_size);
        if (blockToAlloc->block_size == block_size)
        {
            return blockToAlloc->alloc(n);
        }
        else
        {
            throw std::bad_alloc();
        }

    }

    void remove(pointer p, size_type n) {
        cout << "allocator deallocates " << n << "\n";
        buffer_type* current = getFirstBufBlock();
        while (current != nullptr)
        {
            if (current->memory_ptr == p)
            {
                current->remove(p, n);
                current->mergeBlockIfNeeded();
                break;
            }
            current = current->next;
        }

    }

    buddy_allocator<T>(size_t maxBlockSize) {
        std::cout << "alloc constr\n";
        auto first_block = new buffer_type(maxBlockSize);
        first_block->startIdx = 0;
        empty_pre_first_block->connectTo(first_block);


    }

    buddy_allocator<T>() {
        buddy_allocator(1024 * 1024 * 1024);
    }

    ~buddy_allocator<T>() {
        std::cout << "alloc destr\n";
    }

};