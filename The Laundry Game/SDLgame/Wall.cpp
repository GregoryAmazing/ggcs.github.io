#pragma once
#include "Wall.h"

Wall::Wall(const char* texture, SDL_Renderer* rend, int blockX, int blockY, GameState* gameState) : Block(texture, rend, blockX, blockY) {
    x = blockX * 64;
    y = blockY * 64;

    srcRect.h = 16;
    srcRect.w = 16;
    srcRect.x = 16;
    srcRect.y = 0;

    this->gameState = gameState;

    GameObject::update();

    this->gameState->walls.push_back(&destRect);
}

Wall::~Wall()
{}

void Wall::handle_event(SDL_Event* evt)
{
}

void Wall::update()
{
}

void Wall::render()
{
    GameObject::render();
}