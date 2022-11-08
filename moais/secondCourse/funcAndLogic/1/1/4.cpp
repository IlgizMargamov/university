#include <iostream>
#include <Windows.h>
#include <map>
#include <vector>
#include <algorithm>
#include <chrono>
#include <list>


using namespace std;
using namespace chrono;

template<class T>
class CList
{
	T* first = 0;
public:
	void Add(T* item)
	{
		if (!first)
		{
			item->prev = item;
			item->next = item;
			first = item;
		}
		else if (item < first)
		{
			T* prev = first->prev;
			prev->next = item;
			first->prev = item;
			item->prev = prev;
			item->next = first;
			first = item;
		}
		else
		{
			T* current = first;

			while (1)
			{
				if (item < current->next)
				{
					T* next = current->next;
					current->next = item;
					next->prev = item;
					item->next = next;
					item->prev = current;
					break;
				}
				if (current->next == first)
				{
					current->next = item;
					first->prev = item;
					item->prev = current;
					item->next = first;
					break;
				}
				current = current->next;
			}
		}
	};
	void Remove(T* item)
	{
		if (first == first->next)
		{
			first = 0;
		}
		else
		{
			T* itemNext = item->next;
			T* itemPrev = item->prev;
			itemNext->prev = itemPrev;
			itemPrev->next = itemNext;
			if (first == item)
			{
				first = itemNext;
			}
		}
	};
	void SetSizeFirst(size_t size)
	{
		first->size = size;
	}
	T* GetFirst()
	{
		return first;
	}
};

class CAllocator
{
#pragma pack(push,1)
	struct CItem
	{
		int level;
		bool free;
		union
		{
			struct
			{
				CItem* next;
				CItem* prev;
			};
			char data[1];
		};
	};
#pragma pack(pop)
	enum {
		FreeBlocksCount = sizeof(size_t) * 8
	};
	CList<CItem> free[FreeBlocksCount];
	size_t BS = 10 * 1024 * 1024;
 	int initialLevel = 20;
	char* startByte;
	char* endByte;
public:
	CAllocator()
	{
		NewBuffer();
	}

	~CAllocator()
	{

	}

	void NewBuffer()
	{
		size_t size = 1 << initialLevel; // 2^k
		void* buffer = malloc(size);

		startByte = (char*)buffer;
		endByte = (char*)buffer + size;

		CItem* item = (CItem*)buffer;
		item->level = initialLevel;
		item->free = true;
		free[initialLevel].Add(item);
	}

	void* Allocator(size_t size)
	{
		size_t fullSize = size + sizeof(CItem::level) + sizeof(CItem::free);
		CItem* freeBlock = 0;

		for (size_t i = 0; i < FreeBlocksCount; i++)
		{
			size_t currentSize = 1 << i;
			if (fullSize <= currentSize) {
				if (free[i].GetFirst()) {
					freeBlock = free[i].GetFirst();
					free[i].Remove(freeBlock);
					break;
				}
			}
		}
		if (freeBlock == 0) {
			throw bad_alloc();
		}

		while (true) {
			size_t freeBlockSize = ((1 << freeBlock->level));
			if (freeBlockSize / 2 >= fullSize) {
				CItem* N = (CItem*)((char*)freeBlock + freeBlockSize / 2);
				freeBlock->level--;
				N->level = freeBlock->level;
				N->free = true;
				free[N->level].Add(N);
			}
			else break;
		}

		freeBlock->free = false;

		return &freeBlock->data;
	}

	void Free(void* ptr)
	{
		CItem* freeBlock = (CItem*)((char*)ptr - sizeof(CItem::level) - sizeof(CItem::free));
		free[freeBlock->level].Add(freeBlock);
		freeBlock->free = true;

		while (true) {
			size_t freeBlockSize = ((1 << freeBlock->level));
			size_t distanceFromStart = (char*)freeBlock - startByte;
			size_t blockNumber = distanceFromStart / freeBlockSize;
			CItem* buddy;
			if (blockNumber % 2 == 0) {
				buddy = (CItem*)((char*)freeBlock + freeBlockSize);
				if ((char*)buddy < endByte) { // in bounds
					if (buddy->free && buddy->level == freeBlock->level) {
						free[freeBlock->level].Remove(freeBlock);
						free[freeBlock->level].Remove(buddy);
						freeBlock->level++;
						free[freeBlock->level].Add(freeBlock);
						continue;
					}
				}
			}
			else {
				buddy = (CItem*)((char*)freeBlock - freeBlockSize);
				if ((char*)buddy >= startByte) { // in bounds
					if (buddy->free && buddy->level == freeBlock->level) {
						free[freeBlock->level].Remove(freeBlock);
						free[freeBlock->level].Remove(buddy);
						freeBlock = buddy; // for cycle to work properly (not null)
						buddy->level++;
						free[freeBlock->level].Add(buddy);
						continue;
					}
				}
			}
			break;
		}
	}

	void Check()
	{
		for (size_t i = 0; i < initialLevel; i++)
		{
			if (free[i].GetFirst()!=0)
			{
				cout << "Error on block: " << i << "\n";
			}
		}
		if (free[initialLevel].GetFirst() != 0) {
			cout << "OK" << "\n";
		}
	}
};



CAllocator Allocator;

template <class T>
class CMyAllocator
{
public:
	typedef typename T value_type;

	CMyAllocator()
	{

	}

	template <class U>
	CMyAllocator(const CMyAllocator<U>& V)
	{

	}

	T* allocate(size_t Count)
	{
		//printf("Allocate %d\n", (int)(Count * sizeof(T)));

		return (T*)Allocator.Allocator(sizeof(T) * Count);
	}

	void deallocate(T* V, size_t Count)
	{
		//printf("Free %d\n", (int)(Count * sizeof(T)));

		Allocator.Free(V);
	}
};


int main1()
{
	HANDLE file;
	file = CreateFile(L"C:\\Users\\Gizon\\Desktop\\Study\\moais\\secondCourse\\funcAndLogic\\1\\text.txt",
		GENERIC_READ,
		FILE_SHARE_READ,
		NULL,
		OPEN_EXISTING,
		FILE_ATTRIBUTE_NORMAL,
		NULL);

	if (file == INVALID_HANDLE_VALUE)
	{
		cout << "File didn't opened";
		return 1;
	}

	LARGE_INTEGER fileSize;
	if (!GetFileSizeEx(file, &fileSize))
	{
		cout << "Didn't get file size";
		return 2;
	}
	cout << "File size: " << fileSize.QuadPart << '\n';

	char* buffer = new char[fileSize.QuadPart + 1];
	DWORD readBytes;
	if (!ReadFile(file, buffer, fileSize.QuadPart, &readBytes, NULL))
	{
		cout << "File didn't read";
		return 3;
	}
	if (readBytes != fileSize.QuadPart)
	{
		cout << "Number of read bytes doesn't equal to file size";
		return 4;
	}
	cout << "File is read" << '\n';


	cout << "Enter a number, how many most occurring words do you want to get?" << '\n';
	int numOutputWords;
	cin >> numOutputWords;


	milliseconds startTime = duration_cast<milliseconds>(
		system_clock::now().time_since_epoch()
		);

	struct cmpByStringLength {
		bool operator()(const char* a, const char* b) const {
			return strcmp(a, b) < 0;
		}
	};

	buffer[fileSize.QuadPart] = '\0';
	char* start = buffer;
	map<char*, size_t, cmpByStringLength, CMyAllocator<char*>> words;
	for (int i = 0; i < fileSize.QuadPart; ++i)
	{
		if (!((buffer[i] >= 48 && buffer[i] <= 57) ||
			(buffer[i] >= 65 && buffer[i] <= 90) ||
			(buffer[i] >= 97 && buffer[i] <= 122) ||
			(buffer[i] == 39)))
		{
			buffer[i] = '\0';
			if (start[0] != '\0')
			{
				start[0] = tolower(start[0]);
				words[start]++;
			}
			start = &buffer[i + 1];
		}
	}

	vector<pair<char*, size_t>> vect;
	for (pair<char*, size_t> item : words)
	{
		vect.push_back(item);
	}

	std::sort(vect.begin(), vect.end(), [](pair<char*, size_t> a, pair<char*, size_t> b) {
		return a.second > b.second;
		});

	milliseconds endTime = duration_cast<milliseconds>(
		system_clock::now().time_since_epoch()
		);
	milliseconds timeWork = endTime - startTime;

	int i = 0;
	for (pair<char*, size_t> item : vect)
	{
		if (++i > numOutputWords) break;
		cout << item.first << " : " << item.second << '\n';
	}

	cout << "milliseconds since epoch: " << timeWork.count() << '\n';
}

int main()
{
	main1();
	Allocator.Check();

}