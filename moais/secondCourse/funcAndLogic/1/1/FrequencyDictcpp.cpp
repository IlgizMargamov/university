#include <fstream>
using namespace std;
//using namespace chrono;

class Buffer {
	public:
		int MaxSize = 1024;

};

int main1(){
	ifstream file("firsy.txt");
	for (char word; file.get(word);) {

	}
	return 0;
}