#pragma once
#include <iostream>

using namespace std;

struct Arrow {
public:
	SDL_Rect* rect;
	int direction = 0;
};