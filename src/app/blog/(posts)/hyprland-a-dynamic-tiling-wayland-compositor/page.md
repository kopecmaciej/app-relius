---
title: "Hyprland - A dynamic tiling Wayland compositor"
updated: "2024-10-28"
readTime: "5 min read"
---

# Hyprland - A dynamic tiling Wayland compositor

In this article, I'll show how awsome Hyprland can be if properly configured.
We'll start with a fresh install of Arch Linux and configure Hyprland from scratch.

## Install Hyprland

Installation is straight forward, just follow the [official installation guide](https://wiki.hyprland.org/Getting-Started/Installation/).

It's down to a single command:

```bash
sudo pacman -S hyprland
```

or if you want install from source:

```bash
yay -S hyprland-git
```

Good idea will be to also install some terminal emulator, for Hyprland default is `kitty` 

```bash
sudo pacman -S kitty
```
This will help us to work within Hyprland without having to switch to another tty.

## The juice - Hyprland configuration

Hyprland can be configured in so many ways, that this seciont will be pretty long, and I'll try to cover most of the important aspects.

### First encounter

First time you'll probably start Hyprland from shell, so you'll see something like this:

![Hyprland first boot](/posts/hyprland-first-boot-wallpaper.png)

(This is the new Hyprland wallpapers, before that it was just a plain black screen)

### Status bar

To have all information at hand, we'll use `waybar` as status bar. To install it just run:

```bash
sudo pacman -S waybar
```


