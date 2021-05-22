#pragma once
#include "Puddle.h"

Puddle::Puddle(const char* texture, SDL_Renderer* rend, int blockX, int blockY, GameState* gameState) : Block(texture, rend, blockX, blockY) {
    x = blockX * 64;
    y = blockY * 64;

    srcRect.h = 16;
    srcRect.w = 16;
    srcRect.x = 112;
    srcRect.y = 0;

    this->gameState = gameState;

    GameObject::update();

    this->gameState->puddles.push_back(&destRect);
}

Puddle::~Puddle()
{}

void Puddle::handle_event(SDL_Event* evt)
{
}

void Puddle::update()
{
}

void Puddle::render()
{
    GameObject::render();
}