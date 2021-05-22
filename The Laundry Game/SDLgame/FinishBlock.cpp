#pragma once
#include "FinishBlock.h"

FinishBlock::FinishBlock(const char* texture, SDL_Renderer* rend, int blockX, int blockY, GameState* gameState) : Block(texture, rend, blockX, blockY) {
    x = blockX * 64;
    y = blockY * 64;

    srcRect.h = 16;
    srcRect.w = 16;
    srcRect.x = 64;
    srcRect.y = 0;

    GameObject::update();

    this->gameState = gameState;

    this->gameState->finishBlock = &destRect;
}

FinishBlock::~FinishBlock()
{}

void FinishBlock::handle_event(SDL_Event* evt)
{
}

void FinishBlock::update()
{
}

void FinishBlock::render()
{
    GameObject::render();
}