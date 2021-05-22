#ifndef Game_hpp
#define Game_hpp
#include "SDL.h"
#include "SDL_image.h"
#include <stdio.h>
#include <stdlib.h>  
#include <iostream>

class Game {
public:
	Game();
	~Game();

	void init(const char* title, int xpos, int ypos, int width, int height, bool fullscreen);

	void handle_event(SDL_Event* evt);
	void update();
	void render();
	void clean();
	SDL_Renderer* getRend() { return renderer; };

	bool running() { return isRunning; }

private:
	int count = 0;
	bool isRunning;

	SDL_Window* window;
	SDL_Renderer* renderer;
};

#endif