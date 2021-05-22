#pragma once
#include "Block.h"

Block::Block(const char* texture, SDL_Renderer* rend, int blockX, int blockY, int texturePosX, int texturePosY) : GameObject(texture, rend, blockX, blockY) {
    x = blockX * 64;
    y = blockY * 64;

    srcRect.h = 16;
    srcRect.w = 16;
    srcRect.x = 16;
    srcRect.y = 0;

    if (texturePosX != 0) { srcRect.x = texturePosX; }
    if (texturePosY != 0) { srcRect.y = texturePosY; }
}

Block::~Block()
{}

void Block::handle_event(SDL_Event* evt)
{
}

void Block::update()
{
    GameObject::update();
}

void Block::render()
{
    GameObject::render();
}