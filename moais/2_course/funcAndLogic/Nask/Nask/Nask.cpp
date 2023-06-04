#include <iostream>
#include <mutex>
using namespace std;


template<class T> class Pointer {

	T* t;
	size_t* count;

public:
	explicit Pointer(T* p)
	{
		t = p;
		count = new size_t;
		*count = 1;
		if ((char*)t + sizeof(T) == (char*)count) {
			size_t* count2 = new size_t;
			*count2 = 1;
			delete count;
			count = count2;
		}
	}

	Pointer(const Pointer& other)
	{
		t = other.t;
		count = other.count;

		if (count) {
			(*count)++;
		}
	}

	Pointer() {
		t = 0;
		count = 0;

	}

	Pointer& operator=(const Pointer& other)
	{
		Delete();
		t = other.t;
		count = other.count;

		if (count) {
			(*count)++;
		}
		return *this;
	}

	class Temp {
	public:
		
		T* t;
		T* operator -> () const
		{
			return t;
		};

		Temp(T* t1) {

			t = t1;
			if (t) {
				t->m.lock();
			}
			cout << "Temp object is created"<< endl;
		};

		~Temp() {

			if (t) t->m.unlock();
			cout << "Temp object is delete"<< endl;
		};

	};

	Temp operator -> () const
	{
		return Temp(t);
	}

	T operator *() const
	{
		return *t;
	}


	template <class... A>
	static Pointer New(A... args) {
		Pointer p;
		void* buffer = malloc(sizeof(T) + sizeof(count));
		void* buffer1 = (char*)buffer + sizeof(T);
		p.t = new(buffer) T(args...);
		p.count = (size_t*)buffer1;
		return p;
	


	}

	void Delete()
	{
		if (count)
		{
			(*count)--;
			if ((*count) == 0)
			{
				if ((char*)t + sizeof(T) == (char*)count)
				{
					delete t;
				}
				else 
				{
					delete count;
					delete t;
				}
			}
		}
	}

	~Pointer()
	{
		Delete();
	}
};


class Test
{
	int id_;

public:
	mutex m;
	int test1 = 0;
	void ChangeId(int newid)
	{
		cout << "Change id" << id_ << " to new id" << newid << endl;
		id_ = newid;
		
	}
	Test(int id)
	{
		id_ = id;
		cout << "Test number " << id << " has been created" << endl;

	}
	~Test()
	{

		cout << "Test number " << id_ << " has been destroyed" << endl;
	}


};


void f(Pointer<Test> t)
{

}

int main()
{
	Pointer<Test> a(new Test(1));
	Pointer<Test> b(new Test(2));
	Pointer<Test> x = Pointer<Test>::New(3);
	a = b;
	a->ChangeId(3);
	a->test1 = 2;
	//Test c = *a;
	//f(&c);
};