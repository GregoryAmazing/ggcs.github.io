#pragma once
#include "Game.h"

class GameObject {

public:
	GameObject(const char* texture, SDL_Renderer* rend, int initX, int initY);
	~GameObject();

	virtual void handle_event(SDL_Event* evt);
	virtual void update();
	virtual void render();
	void offset(int offsetX, int offsetY);
	SDL_Event event;

protected:
	int x;
	int y;

	SDL_Texture* objTexture;
	SDL_Rect srcRect, destRect;
	SDL_Renderer* renderer;
};