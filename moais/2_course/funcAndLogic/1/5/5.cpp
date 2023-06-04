#include <iostream>
#include <memory>
#include <functional>

using namespace std;

// 5 task
template <class T>
class List { // stack
    struct Element {
    public:
        T value;
        shared_ptr<Element> tail;
        Element(){

        }
        Element(T _value, shared_ptr<Element> _tail){
            value = _value;
            tail = _tail;
        }
    };

    shared_ptr<Element> head;

public:
    List(){
    }
    List(std::initializer_list<T> list) {
        for (auto p=rbegin(list); p!=rend(list); p++)
        {
            T val = *p;
            head = make_shared<Element>(val, head);
        } // reverse order
        //for (auto p=list.begin(); p!=list.end(); p++)
        //{
        //    T val = *p;
        //    //std::cout << val << " is added";
        //    head = make_shared<Element>(val, head);
        //} reverse order
    }

    bool IsEmpty() const {
        if (!head) return true;
        return false;
    }

    List Push(T t) const {
        List result;
        result.head = make_shared<Element>(t, head);
        return result;
    }
    List Pop() const {
        List result;
        result.head = head->tail;
        return result;
    }
    T Top() const {
        return head->value;
    }

    template <class F>
    void Foreach(F f) const { // old style
        shared_ptr<Element> current = head;
        while (current) {
            f(current->value);
            current = current->tail;
        }
    }
    
    void Foreach1(function<void (T)> f) const { // better
        shared_ptr<Element> current = head;
        while (current) {
            f(current->value);
            current = current->tail;
        }
    }

    List Map(function<T (T)> f) {
        if (!head) return *this;
        List list= Pop().Map(f);
        list = list.Push(f(head->value));
        return list;
        //List result;
        //shared_ptr<Element> current = head;
        //while (current) {
        //    result.Push(f(current->value));
        //    current = current->tail;
        //}
        //return result;
    }
    
    List Filter(function<bool(T) > func) const {
        if (!head) return *this;
        List result= Pop().Filter(func);
        if (func(head->value)) result= result.Push(head->value);
        return result;
    }

    template <class U>
    U FoldR(function<U(T, U)> func, U x) const {
        if (!head) return x;
        U result = Pop().FoldR(func, x);
        result = func(head->value, result);
        return result;
    }
    
    template <class U>
    U FoldL(function<U(T, U)> func, U x) const {
        if (!head) return x;
        U result = Pop().FoldL(func, func(head->value,x));
        return result;
    }
};

void F1(int val) { std::cout << val << "\n"; }

// 6 task
template <class T>
class BinomialTree { // balanced tree
    struct Node {
        T value;
        List<shared_ptr<Node>> children;
        int rank;
    };
    List<shared_ptr<Node>> nodes;

    static shared_ptr<Node> Link(shared_ptr<Node> first, shared_ptr<Node> second) {
        shared_ptr<Node> linked = make_shared<Node>();
        if (first->value < second->value) {
            linked->value = first->value;
            linked->rank = first->rank + 1;
            linked->children = first->children.Push(second);
        }
        else {
            linked->value = second->value;
            linked->rank = second->rank + 1;
            linked->children = second->children.Push(first);
        }

        return linked;
    }

    static shared_ptr<Node> CopyWithIncreasedRank() {

    }

    static List<shared_ptr<Node>> Insert(List<shared_ptr<Node>> list, shared_ptr<Node> element) {
        if (list.IsEmpty()) {
            return list.Push(element);
        }
        
        shared_ptr<Node> first = list.Top();
        if (first->rank == element->rank)
        {
            shared_ptr<Node> linked = Link(first, element);
            return Insert(list.Pop(), linked);
        }
        else
        {
            return list.Push(element);
        }
    }
public:
    T Min() {
        List<shared_ptr<Node>> copy=nodes;

        T min=copy.Top()->value;
        while (!copy.IsEmpty()) {
            T current = copy.Top()->value;
            if (current < min) {
                min = current;
            }
            copy = copy.Pop();
        }

        return min;
    }

    BinomialTree Push(T value) {
        shared_ptr<Node> result=make_shared<Node>();
        result->value = value;
        result->rank = 0;
        BinomialTree bt;
        bt.nodes= Insert(nodes, result);
        return bt;
    }
    BinomialTree Pop() {
        return nodes.Pop();
    }
};

int main()
{
    BinomialTree<int> bt;
    bt = bt.Push(1);
    bt = bt.Push(2);
    bt = bt.Push(5);
    int a=bt.Min();
    std::cout << a;
    /*BinomialTree<int> bt1= bt.Push(1);
    BinomialTree<int> bt2= bt1.Push(4);
    BinomialTree<int> bt3= bt2.Push(5);
    *///List<int> l4 = { 1,2,3,4 };
    //l4.Foreach([/*local var for func*/](int i) {std::cout << i << "\n";});
    //l4.Foreach1([/*local var for func*/](int i) {std::cout << i << "\n";});

    //List<int> l;
    //List<int> l1= l.Push(1);
    //List<int> l2 = l1.Pop();
    //int c = l1.Top();
    //std::cout << "Hello World!\n";
    //std::cout << c;

    //struct F {
    //    void operator ()(int value) { std::cout << value << "\n"; }
    //};
    //l4.Foreach1(F());
    //l4.Foreach1(F1);
    //l4.Map([](int i) {return i * 2;}).Foreach1([/*local var for func*/](int i) {std::cout << i << "\n";});
    //l4.Filter([](int i) {return i%2 !=0;}).Foreach1([/*local var for func*/](int i) {std::cout << i << "\n";});
    //std::cout << l4.FoldR<int>([](int a, int b) {return a+b;}, 5) << "\n";
    //std::cout << l4.FoldL<int>([](int a, int b) {return a+b;}, 5) << "\n";
    //List<int> l5;
    //l4.FoldL<List<int>>([](int a, List<int> b) {return b.Push(a);}, l5).Foreach1(F());
    //l4.FoldR<List<int>>([](int a, List<int> b) {return b.Push(a);}, l5).Foreach1(F());

}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

