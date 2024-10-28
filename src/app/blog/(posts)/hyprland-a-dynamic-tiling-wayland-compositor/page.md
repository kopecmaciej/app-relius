---
title: "Hyprland - A dynamic tiling Wayland compositor"
updated: "2024-10-28"
readTime: "5 min read"
---

# Hyprland - A dynamic tiling Wayland compositor

In this article, I'll show how awesome Hyprland can be if properly configured.
We'll start with a fresh installation of Arch Linux and configure Hyprland from
scratch.

## Install Hyprland

Installation is straight forward, just follow the
[official installation guide](https://wiki.hyprland.org/Getting-Started/Installation/).

It's down to a single command:

```bash
sudo pacman -S hyprland
```

or if you want to install from source:

```bash
yay -S hyprland-git
```

Good idea will be to also install some terminal emulator, for Hyprland default
is `kitty`, `wezterm` is also a good idea, as it's very easy to configure.

```bash
sudo pacman -S kitty
```

This will help us to work within Hyprland without having to switch to another
TTY.

## The juice - Hyprland configuration

Hyprland can be configured in so many ways, that this section will be pretty
long, and I'll try to cover most of the important aspects.

### First encounter

First time you'll probably start Hyprland from shell, so you'll see something
like this:

![Hyprland first boot](/posts/hyprland-first-boot-wallpaper.png)

(This is the new Hyprland wallpapers, before that it was just a plain black
screen) To proceed we need to go to configuration file, which is located in
`~/.config/hypr/hyprland.conf`, if there is no such file, try
`echo $XDG_CONFIG_HOME/hypr/hyprland.conf`

To go to this file just use `$mainMod + Q` which will be in most cases Windows+Q
(no idea which keyboard will be on macOS), in my case is `SUPER`, so I will use
that reference, so `SUPER + Q`

Good thing is to look around there, check keybindings, maybe play around with
some values, I'm personally adding additional lines to `input` as its speed up
working with terminal/neovim

```vim
repeat_delay = 300
repeat_rate = 50
```

Ok, now it's time to install some additional packages, like status bar,
wallpaper manager or file manager.

### Status bar

#### Install waybar

To have all information at hand, we'll use `waybar` as status bar. To install it
just run:

```bash
sudo pacman -S waybar
```

### File manager

For file manager I'm using `dolphin` or `thunar`, go with the first one if you
do not have preferences, simply run

```bash
sudo pacman -S dolphin
```

Then we can access it using `SUPER + E`. That's it about file manager

### App manager (rofi)

### Fonts and icons

#### Configure Waybar

### Lock screen

### Wallpapers

### Left/right modules

### AI assistant
