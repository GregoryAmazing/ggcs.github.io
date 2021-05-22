#include "GameObject.h"
#include "TextureManager.h"

GameObject::GameObject(const char* texture, SDL_Renderer* rend, int initX, int initY)
{
	renderer = rend;
	objTexture = TextureManager::LoadTexture(texture, rend);

	x = initX;
	y = initY;
}

void GameObject::offset(int offsetX = 0, int offsetY = 0)
{
	x += offsetX;
	y += offsetY;
}


GameObject::~GameObject()
{}

void GameObject::update()
{
	destRect.x = x;
	destRect.y = y;
	destRect.w = srcRect.w * 4;
	destRect.h = srcRect.h * 4;
}

void GameObject::handle_event(SDL_Event* evt)
{
	// handle events
};

void GameObject::render()
{
	SDL_RenderCopyEx(renderer, objTexture, &srcRect, &destRect, 0, NULL, SDL_FLIP_NONE);
}