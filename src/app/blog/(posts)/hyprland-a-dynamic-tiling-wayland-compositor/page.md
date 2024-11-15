---
title: "Hyprland - A dynamic tiling Wayland compositor"
updated: "2024-10-28"
readTime: "5 min read"
categories: ["Linux", "Window Manager"]
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
is `kitty`, if you want any other just remember to change `$terminal` in config
file `~/.config/hypr/hyprland.conf`

```bash
sudo pacman -S kitty
```

This will help us to work within Hyprland without having to turn it off to do
some tasks.

## The juice - Hyprland configuration

Hyprland can be configured in so many ways, that I will definitely not cover
even half of its features, but I will try to get into the most important ones.

### First encounter

First time you'll probably start Hyprland from shell, so you'll see something
like this:

![Hyprland first boot](/posts/hyprland-first-boot-wallpaper.png) (This is the
new Hyprland wallpapers, before that it was just a plain black screen)

To proceed we need to go to configuration file, which is located in
`~/.config/hypr/hyprland.conf`, if there is no such file, try
`echo $XDG_CONFIG_HOME/hypr/hyprland.conf`

To go to this file just use `SUPER + Q` which will be in most cases Windows+Q
(no idea which keyboard will be on macOS), in configuration file, default is
`SUPER`, so I will use that reference.

Good thing is to look around there, check keybindings, maybe play around with
some values, personally first thing I'm, adding are additional lines to `input`
as its speed up working with terminal/Neovim, just search for input and then add
to the end:

```vim
repeat_delay = 300
repeat_rate = 50
```

Great, now it's time to install some additional packages, like status bar,
wallpaper manager or file manager.

## Basic packages - quick overview

Before we move to more interesting things, installing some core packages will
make out life in Hyprland much easier.

### Audio

In order to have audio working, we need to install a couple of packages, I'm
going with `pipewire` as it's suggested in Hyprland wiki, and I have pretty good
experience with it. This is what we need to install:

```bash
sudo pacman -S --needed \
    pipewire \  ## video/audio server
    pipewire-pulse \ ## for pavucontrol compatibility
    pipewire-audio \ ## audio support
    wireplumber \ ## configuration backend
    pavucontrol \ ## gui mixer for pulseaudio
```

### Utility packages

```bash
sudo pacman -S --needed \
    ## hyprland integration
    xdg-desktop-portal-hyprland \ ## hyprland integration with xdg-desktop-portal
    sddm \ ## desktop environment manager
    swaync \ ## notification daemon
    ## fonts
    ttf-jetbrains-mono-nerd \ ## monospace font with nerd icons
    noto-fonts \ ## default font family
    noto-fonts-emoji \ ## emoji font
    ## utils
    wl-clipboard \ ## clipboard manager
```

### App manager (Rofi)

To quickly run apps I'm choosing `rofi`, although there are many other projects
that can do the same, as `wofi` (although it's not maintained currently),
`Fuzzel` and many more. Package to install is called `rofi-wayland`, just a
Wayland fork of it, as Rofi is written for Xorg.

```bash
sudo pacman -S rofi-wayland
```

Now we can change in config file `$menu` to:

```vim
$menu = rofi -show drun
```

and in the key section we can see that using `SUPER + R` we can run $menu

```vim
bind = $mainMod, R, exec, $menu
```

### Status bar

#### Install Waybar

To have all information at hand, we'll use very customizable `Waybar` as status
bar. To install it just run:

```bash
sudo pacman -S waybar
```

#### Configure Waybar

### File manager

For file manager I'm using `dolphin` or `thunar`, go with the first one if you
do not have preferences, simply run

```bash
sudo pacman -S dolphin
```

Then we can access it using `SUPER + E`. That's it about file manager

### Lock screen

### Wallpapers

### Left/right modules

### AI assistant
