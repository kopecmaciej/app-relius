---
title: "Fast way to manually install Arch Linux"
updated: "2024-10-27"
readTime: "8 min read"
categories: ["Linux", "Arch"]
thumbnail: "/images/blog/arch-linux-grub.webp"
---

# Fast way to manually install Arch Linux

Firstly, I want to say that this is more of a documentation for myself, not a
full guide. I'm writing this because I want to have a reference for myself and I
want to share it with you. I'm not going to explain every single command here,
but I'll try to explain the most important ones. I hope you'll find it useful.

Ok, so let's dive in.

There are 3 common ways to install Arch Linux:

1. [Manual Installation](#manual-installation)
2. [Archinstall](https://wiki.archlinux.org/title/Archinstall)
3. [Arch Linux GUI (not-recommended)](https://archlinuxgui.in/)

In this post, I'll show only how to install Arch Linux manually. From my
experience, this is the best way to install this distribution. You'll have much
more control over the installation process, and you'll learn a lot about Linux
itself. You'll get to know how to partition the disk, install the bootloader,
install the packages, configure the network, etc.

I found this knowledge very useful in my work as a software engineer. For
example, when I was using Docker, I had to know how to configure the network, or
when I spun up my own Proxmox server with a Kubernetes cluster. Using the
Archinstall script gave me a lot of trouble with the Btrfs file system, and
eventually, I installed Arch Linux manually.

Ok, so let's get started.

## Manual Installation

### Step 1 - Create Arch Linux USB Drive

First, let's create a bootable Arch Linux USB drive. You can download the ISO
file from here: [Download Arch Linux](https://archlinux.org/download/). Insert
your USB drive and run the following command to find the device name:

```bash
lsblk
```

Let's say that the device name is `/dev/sdb`.

To create the bootable USB drive, you can use the `dd` command:

```bash
dd bs=4M if={arch-linux.iso} of=/dev/sdb conv=fsync oflag=direct status=progress
```

Alternatively, you can use the `cat` command:

```bash
cat arch-linux.iso > /dev/sdb
```

Make sure to replace arch-linux.iso with the actual name of the ISO file.

If you're changing or installing many OSes, you can use Ventoy. You can download
it from here:
[Get started with Ventoy](https://www.ventoy.net/en/doc_start.html). It's a nice
tool that allows you to just copy-paste the ISO file and have as many OSes as
you want on a single stick.

For Windows users, you can use Rufus to create the bootable USB drive. You can
download it from here: [Rufus](https://rufus.ie/).

To boot from the USB drive, you may need to use a specific key depending on the
manufacturer. Common keys include ESC or F8. Refer to your manufacturer's
documentation or website for the exact key.

- Manual installation
- python script
  [archinstall](https://python-archinstall.readthedocs.io/en/latest/index.html)
- Arch Linux Gui [Arch-Linux-Gui](https://archlinuxgui.in/) (honestly I don't
  recommend it because it's not official, and I had some problems with it)

### Step 2 - Boot and connect to the internet

If you already have an internet connection, you can skip this step as it will
work automatically. However, if you have a Wi-Fi connection, follow these
commands to connect to the internet:

1. Open a terminal and run the following command:

```bash
iwctl
```

2. Inside the `iwctl` prompt, run the following commands to list the available
   devices and connect to your Wi-Fi network:

```bash
device list
```

```bash
station {device_name} connect {wifi_name}
```

3. Replace `{device_name}` with the appropriate device name and `{wifi_name}`
   with the name of your Wi-Fi network.

Next, ensure that your system clock is synchronized:

```bash
timedatectl set-ntp true
```

### Step 3 - Partition the disk

In this section, we'll create partitions for the Arch Linux installation. When
creating partitions, here are my recommendations:

- EFI System Partition (ESP): 512MB (can be smaller, but resizing it later can
  be a pain)
- Root partition (/): >30GB
- Swap: 8GB or 16GB should be fine, but tbh I'm not using swap nowadays and I've
  never run into issues because of that (on my personal CPU, on my server I
  have swap as the memory usage can be much higher). Read more about
  [Swap](https://wiki.archlinux.org/title/Swap)
- Home (/home): Remaining space, or whatever you want

First, let's identify the drive where you want to install Arch Linux:

```bash
lsblk

## Output
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    1  14.9G  0 disk
├─sda1        8:1    1  14.9G  0 part
│ └─ventoy  254:0    0 932.3M  1 dm
└─sda2        8:2    1    32M  0 part
nvme1n1     259:0    0 931.5G  0 disk
├─nvme1n1p1 259:1    0   100M  0 part
├─nvme1n1p2 259:2    0    16M  0 part
├─nvme1n1p3 259:3    0 930.6G  0 part
└─nvme1n1p4 259:4    0   778M  0 part
nvme0n1     259:5    0   1.9T  0 disk
├─nvme0n1p1 259:6    0   500M  0 part
└─nvme0n1p2 259:7    0   1.9T  0 part
```

In my example, the drive I want to install Arch Linux on is `/dev/nvme0n1`,
where I have some OSes installed, so I'll wipe it and create new partitions on
it.

To use `cfdisk` to wipe out /dev/nvme0n1 and create partitions for /root,
/home, and /boot, follow these steps:

1. Open `cfdisk`: Start by opening `cfdisk` with the device you want to
partition.

```bash
sudo cfdisk /dev/nvme0n1
```

2. Delete Existing Partitions: If your disk already has partitions, you will see
them listed in the cfdisk interface. Use the arrow keys to navigate to each
partition and press `[DELETE]` to delete it.

3. Create New Partitions: Use the arrow keys to navigate to the free space and
press `[NEW]`. Enter the size of the partition (eg: 512 MiB) and press `[OK]`. Repeat this
process for each partition you want to create. Remember about types:

- `/boot/efi` partition should be of type `EFI System`
- `/` partition should be of type `Linux filesystem`
- `/home` partition should be of type `Linux filesystem`
- `/swap` partition should be of type `Linux swap`

4. Format the Partitions: After creating the partitions, you need to format them
with the appropriate file system. For example:

```bash
mkfs.fat -F32 /dev/nvme0n1p1
mkfs.ext4 /dev/nvme0n1p2
# Format the home partition
mkfs.ext4 /dev/nvme0n1p3  # Assuming /dev/nvme0n1p3 is the home partition
# Format the swap partition if created
mkswap /dev/nvme0n1p4     # Assuming /dev/nvme0n1p4 is the swap partition
```

We're formatting the `/dev/nvme0n1p2` partition with `ext4` file system and the
`/dev/nvme0n1p1` partition with `fat32` file system.

Now mount the partitions:

```bash
mount /dev/nvme0n1p2 /mnt

# Create and mount home directory
mkdir -p /mnt/home
mount /dev/nvme0n1p3 /mnt/home

# Enable swap if created
swapon /dev/nvme0n1p4
```

### Step 4 - Install necessary packages and configure the system

Install base packages with additional essential tools:
(Not all of them are needed, but it's good to have them)

- `base` and `base-devel` - the base packages for Arch Linux.
- `linux` and `linux-firmware` - the Linux kernel and its firmware.
- `intel-ucode` or `amd-ucode` - the microcode for Intel or AMD processors.
- `efibootmgr`, `grub`, `os-prober`
  - `efibootmgr` - a tool for managing UEFI boot entries.
  - `dosfstools` - a tool for manipulating FAT file systems (needed for dual
    boot)
  - `os-prober` - to detect other operating systems (like Windows)
- `networkmanager` - for network management.
- `git`, `neovim`, `fish` - development tools.

Required packages:

```bash
pacstrap /mnt \
    base base-devel linux linux-firmware intel-ucode grub networkmanager
```

Ensure your system is booted in UEFI mode by checking for the existence of the
`/sys/firmware/efi` directory:

```bash
ls /sys/firmware/efi/efivars
```
If the directory doesn't exist, don't install `efibootmgr`, `os-prober`, and
`dosfstools`.

Additional packages (for dual boot, and my personal preferences):
```bash
pacstrap /mnt \
   efibootmgr os-prober dosfstools git neovim fish
```

(if you will have keyrings errors, run `pacman -S archlinux-keyring` and try again)

Generate a `fstab` file to configure the mounting of partitions at boot:

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

This command is used to generate a file system table (fstab). We're appending it
to the `/mnt/etc/fstab` file. The -U option is used to generate UUIDs instead of
device names. This is useful because device names can change, and UUIDs are more
reliable.

```bash
arch-chroot /mnt /bin/fish
```

This command changes the root directory to /mnt. I'm using the fish shell here
because of auto-completion and syntax highlighting out of the box, but you can
use bash or zsh.

Let's not forget to mount the boot partition:

- with efi:

```bash
mkdir /boot/efi
mount /dev/nvme0n1p1 /boot/efi
```

- without efi:

```bash
mkdir /boot
mount /dev/nvme0n1p1 /boot
```

Next step is to configure grub. First we need to install the grub on the disk:

- with efi:

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
```

- without efi:

```bash
grub-install --target=i386-pc /dev/nvme0n1
```

Grub will be installed on the disk, not on the partition. This is because the
bootloader needs to be loaded before the partitions are mounted.

Before generating the grub configuration file, note that if you have multiple
systems installed on your computer, you have to edit the `/etc/default/grub`
file and uncomment the following line:

```bash
GRUB_DISABLE_OS_PROBER=false
```

Now let's generate the grub configuration file:

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

Important thing to note here is that the output of this command should include
lines with `Found linux image` and `Found initrd image`. If you don't see these
lines, then you need to check your grub configuration, also if the `os-prober`
is installed, and other OS's are present, they should be detected and added to
the GRUB menu automatically.

Now we're enabling the network manager service, to be available on boot.

```bash
systemctl enable NetworkManager.service
```

Now we need to set the root password:

```bash
passwd
```

At this point, we can exit the chroot environment and reboot the system, but I
like to do some extra configuration before that.

First, let's configure language and keyboard layout:

```bash
nvim /etc/locale.gen
```

Uncomment the line with the language of your choice. For example, if you want to
use English, uncomment the line with `en_GB.UTF-8 UTF-8`. Now generate the
locale:

```bash
locale-gen
```

Now let's set the language:

```bash
echo LANG=en_GB.UTF-8 > /etc/locale.conf
```

To set the keyboard layout, we need to create a file:

```bash
echo KEYMAP=gb > /etc/vconsole.conf
```

Don't forget to set the hostname:

```bash
echo {hostname} > /etc/hostname
```

After setting the timezone, configure the system clock:

```bash
ln -sf /usr/share/zoneinfo/{Region}/{City} /etc/localtime
hwclock --systohc
```

Configure the hosts file:

```bash
echo "127.0.0.1 localhost" >> /etc/hosts
echo "::1       localhost" >> /etc/hosts
```

And the last step is to create a user:

```bash
useradd -m -G wheel -s /bin/fish {username}
```

Let's set the password for the user:

```bash
passwd {username}
```

Now we need to edit the sudoers file:

```bash
EDITOR=nvim visudo
```

Uncomment the line with `%wheel ALL=(ALL:ALL) ALL` to allow members of the wheel
group to execute any command (it can be considered a security risk, but if it's
on a personal computer, it's not a big deal).

If you want to be able to ssh into the system, you need to install `openssh`
package:

```bash
pacman -S openssh
```

Now we can enable the ssh service:

```bash
systemctl enable sshd.service
```

Now we can exit the chroot environment:

```bash
exit
```

Unmount the partitions:

```bash
umount -R /mnt
```

And reboot the system:

```bash
reboot
```

And that's it. You should now have a working Arch Linux installation.
