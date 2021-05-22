#pragma once
#include <iostream>
#include <vector>
#include "Arrow.h"

using namespace std;

struct GameState {
public:
	int maxArrowAmount = 5; 
	int currArrowAmount = 0;

	vector<Arrow*> arrows;
	vector<SDL_Rect*> walls;
	vector<SDL_Rect*> puddles;

	SDL_Rect* finishBlock;

	int spawnX, spawnY = 0;
	int finishX, finishY = 0;

	bool gameOver = false;
	bool finishReached = false;
	bool blockGameInteraction = false;

	void clear() {
		currArrowAmount = 0;

		arrows.clear();
		walls.clear();
		puddles.clear();

		finishBlock = NULL;

		spawnX, spawnY = 0;
		finishX, finishY = 0;

		gameOver = false;
		finishReached = false;
	}
};