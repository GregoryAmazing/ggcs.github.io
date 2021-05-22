#pragma once
#include "Game.h"
#include "GameObject.h"
#include <stdio.h>
#include <iostream>
#include <functional>


class Button : public GameObject {
public:
    Button(const char* texture, SDL_Renderer* rend, int blockX, int blockY, int buttonW, int buttonH, int texturePosX, int texturePosY, bool bannerButton);
    ~Button();

    void handle_event(SDL_Event* evt);
    void update();
    void render();

    bool bannerButton = false;

    std::function<void(SDL_Renderer*)> on_click_callback;

    void on_click(std::function<void(SDL_Renderer*)> _callback) {
        on_click_callback = _callback;
    }

private:
    bool pressedOnce = true;
    bool buttonPressed = false;

    int w = 0;
    int h = 0;

    bool mouseHovering();
};
