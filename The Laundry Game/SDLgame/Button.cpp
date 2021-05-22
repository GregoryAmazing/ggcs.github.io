#pragma once
#include "Button.h"

Button::Button(const char* texture, SDL_Renderer* rend, int buttonX, int buttonY, int buttonW, int buttonH, int texturePosX, int texturePosY, bool bannerButton = false) : GameObject(texture, rend, buttonX, buttonY) {
    x = buttonX;
    y = buttonY;
    this->bannerButton = bannerButton;

    srcRect.h = buttonH;
    srcRect.w = buttonW;
    srcRect.x = texturePosX;
    srcRect.y = texturePosY;
}

Button::~Button()
{}

bool Button::mouseHovering()
{
    int mouseX, mouseY = 0;
    SDL_GetMouseState(&mouseX, &mouseY);
    if ((mouseX > x) && (mouseX < x + srcRect.w) &&
        (mouseY > y) && (mouseY < y + srcRect.h))
    {
        return true;
    }
    else
    {
        return false;
    }
}



void Button::handle_event(SDL_Event* evt)
{
    switch (evt->type) {
        // Look for a keypress
    case SDL_MOUSEBUTTONDOWN:
        switch (evt->button.clicks) {
        case SDL_BUTTON_LEFT:
            if (mouseHovering())
            {
                buttonPressed = true;
                on_click_callback(renderer);
            }

        default:
            break;
        }

        break;
    case SDL_MOUSEBUTTONUP:
        switch (evt->button.clicks) {
        case SDL_BUTTON_LEFT:
            buttonPressed = false;
            break;

        default:
            break;
        }

        break;
    default:
        break;
    }
}

void Button::update()
{

    destRect.x = x;
    destRect.y = y;
    destRect.w = srcRect.w;
    destRect.h = srcRect.h;
}

void Button::render()
{
    GameObject::render();
}