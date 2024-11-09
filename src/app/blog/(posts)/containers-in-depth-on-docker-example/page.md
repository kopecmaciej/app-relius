---
title: "Containers in depth on example of Docker"
updated: "2023-10-28"
readTime: "7 min read"
categories: ["Docker", "Containers", "Linux"]
---

# Containers in depth on example of Docker

![Docker containers](/images/blog/containers-in-depth-with-docker.webp)

Some time ago, I stumbled upon an article whose main statement was that
containers are not really a thing. It got me thinking, and I realized that I
know how to use Docker, but I don't fully understand how it works under the
hood. I decided to go deeper and find answers to questions like:

- What really is a container?
  - Linux's namespaces
  - How they are implemented in Docker?
- What is the minimal requirement for something to be called a container?

This is going to be detailed article, and it will go beyond the knowledge needed
to just use Docker or any other container runtime for that matter, as they all
(mostly) work in similar way.

## What is a container?

Let's start from very bottom. What is a container?

From
[Docker's website](https://docs.docker.com/get-started/what-is-a-container/) we
can read that container is isolated environment for running an application. It
has no knowledge of host operating system and it's files and processes. Useful
knowledge, but only for someone new to containers.

Luckily in the same website there is an overview section that gives us a bit
more information. There is a sentence that says:

> Docker uses a technology called `namespaces` to provide the isolated workspace
> called the container. When you run a container, Docker creates a set of
> namespaces for that container.

This information is more interesting, and it gives us a hint that namespaces
might be the key to understanding what containers are.

After going through various articles and documentation, I found Linux uses
namespaces to partition kernel resources like: process trees, network,
filesystem, etc. This is done to isolate processes from each other, so they
don't interfere with each other. This is exactly what we need for containers.

The best analogy to understand containers and namespaces is to think about
having a hotel. Each room in a hotel can be seen as a container, but the level
of isolation depends on the standard of the hotel. In a cheap hotel, each room
may not have its own bathroom, and you may have to share it with other rooms.
The same thing applies to namespaces; some containers share resources with other
containers, and some don't. The owner of the hotel can be seen as a host who has
access to all rooms and can do whatever he wants with them (as long as he
doesn't break the law).

In comparison to Virtual Machines, where each virtual machine has its own kernel
and its own operating system, we can think of them as a building where you buy a
flat for yourself. You can change whatever you want inside your flat (probably
to some extent, as you don't own the building). Each flat is isolated to the
point that even the owner of the building doesn't have access to it and pretty
much can't do anything with it (it's a simplification, but it's good enough for
this example). With Virtual Machines, it's the same thing; the host machine
doesn't know what's going on inside the virtual machine, and by design, it can't
interfere with it (there are some exceptions, but it's not the topic of this
article).

With this knowledge, let's take a look at how namespaces are implemented on
Linux.

### Linux namespaces

On Linux, we have two main concepts that are involved in isolation. The first
one is called `cgroups`. It's a mechanism that allows us to limit resources
available to processes. For example, we can limit the amount of CPU that a
process can use or the amount of memory available to it. The second one are the
previously mentioned namespaces.

The most important namespaces are:

- IPC namespace - isolates inter-process communication resources
- Mount namespace - isolates filesystem mount points
- Network namespace - isolates network interfaces
- PID namespace - isolates process IDs
- User namespace - isolates user and group IDs
- UTS namespace - isolates hostname and domain name

Each of them are responsible for isolating different resources. For example
network namespace is responsible for isolating network interfaces, so each
container can behave like it has it's own network card. Mount namespace is
responsible for isolating filesystems, so each container can have it's own root
filesystem.

I'm not going to go into details of each namespace, as it would take too much
time, and there are already great articles about it like this article from
RedHat: [Linux-namespaces](https://www.redhat.com/sysadmin/7-linux-namespaces)

### How they are implemented in Docker?

Now that we have some basic knowledge about namespaces, we can try to understand
how Docker is using them to isolate containers from host machine.

Let's start with an example. I will create a simple `rabbitmq` docker container:

```bash
docker run -d --rm --name rabbitmq rabbitmq:3-management
```

Now that container is running, let's verify that it is using namespaces. I will
check `PID` namespace to see how processes are isolated from host machine. Then
just to be sure I will check `Mount` namespace to see how filesystem are
isolated, as I'm curious how Docker is really using it.

For the PID it's quite simple, firstly I will install `pstree` command inside
container, as it's not installed by default, and it's quite useful for this
example:

```bash
docker exec rabbitmq bash -c "apt-get update && apt-get install -y psmisc"
```

Let's firstly use regular `ps` command to see what processes are running inside
container, I will use `head` to limit output to see only the main process:

```bash
docker exec rabbitmq ps aux | head -n 2

## Output
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
rabbitmq       1  0.0  0.0   2616  1600 ?        Ss   08:43   0:00 /bin/sh /opt/rabbitmq/sbin/rabbitmq-server
[...]
```

Now let's use `pstree` command to see how processes are organized inside
container:

```bash
docker exec rabbitmq pstree -p | head -n 1

## Output
rabbitmq-server(1)-+-beam.smp(21)-+-erl_child_setup(27)-+-inet_gethost(150)---inet_gethost(151)
```

So as we can see, the main process is `rabbitmq-server` with PID `1`, and it's a
parent process for `beam.smp` with PID `21`. This is of course not topic of this
article, but if we look at `/opt/rabbitmq/sbin/rabbitmq-server` file inside
container, we can see that `rabbitmq-server` is just a shell script that starts
`beam.smp` process, which is responsible for running `rabbitmq` server.

Now let's check what processes are running on host machine:

```bash
ps aux | grep -E 'rabbitmq|PID'

## Output
UID          PID    PPID  C STIME TTY          TIME CMD
999       195784  0.0  0.0   2616  1600 ?        Ss   10:43   0:00 /bin/sh /opt/rabbitmq/sbin/rabbitmq-server
```

We can see that there is a process with PID `195784` that is running the same
script as in container, but its PID is different. To prove that it's the same
process, let's check `pstree` command with PID `195784`:

```bash
pstree -p 195784 | head -n 1
## or without knowing the PID:
pstree -p $(docker inspect --format {{.State.Pid}} rabbitmq) | head -n 1

## Output
rabbitmq-server(195784)-+-beam.smp(195841)-+-erl_child_setup(195848)-+-inet_gethost(195980)---inet_gethost(195981)
```

If we compare those two outputs, we can see that they are the same, the only
difference are PIDs.

```bash
## Container
rabbitmq-server(1)-+-beam.smp(21)-+-erl_child_setup(27)-+-inet_gethost(150)---inet_gethost(151)

## Host
rabbitmq-server(195784)-+-beam.smp(195841)-+-erl_child_setup(195848)-+-inet_gethost(195980)---inet_gethost(195981)
```

This is where PID namespace comes into play. It isolated processes inside
container from host machine, so they 'think' that they are running on their own
machine, and they don't know about other processes running on host machine.

Now let's check how filesystem is isolated. I will start by checking what
filesystem docker is using:

```bash
docker info | grep 'Driver'

## Output
Storage Driver: overlay2
## this is the important part for us as it's the default driver more on

docker info | grep 'Backing Filesystem'
## Output
Backing Filesystem: btrfs
## some other drivers...
```

So, in my case Docker is using `overlay2` driver and because my host machine is
using `btrfs` filesystem, Docker is using it as well. It's recommended by Docker
to use `overlay2` driver, but more on that here
[docker-overlay](https://docs.docker.com/storage/storagedriver/overlayfs-driver/)

```bash
docker exec rabbitmq mount | grep overlay2

## Output
overlay on / type overlay (rw,relatime,lowerdir=/var/lib/docker/overlay2/l/3EKUHCMW5UXLQPALKJJ5AIYWQG:/var/lib/docker/overlay2/l/W5VT3X2HLUVKCF7RGXLURJWYEW:/v
ar/lib/docker/overlay2/l/SHX4SVKNE22MUS7PL2SECRMTBL:/var/lib/docker/overlay2/l/PWQB4IEPZ3XJC6GFV3RF42CJWP:/var/lib/docker/overlay2/l/ENGEUO4FWE5L3FFXOBNUDP6FL
U:/var/lib/docker/overlay2/l/S4ZIK2BSQ26FJHKKVF74TBXN6W:/var/lib/docker/overlay2/l/AWRJX2AYOLVRSO6ABM76HV34M4:/var/lib/docker/overlay2/l/R67AEVJUIQA2DWCP65KEP
BARWZ:/var/lib/docker/overlay2/l/ZQCXDO5UDP3X2TW5JLJ4WX55K3:/var/lib/docker/overlay2/l/JNJTUBF7LAX5AOUQNUHECZDSIS:/var/lib/docker/overlay2/l/WRKLCBFJL5VXONSWN
IJURLE5YW:/var/lib/docker/overlay2/l/IHBUIF5NL33D26VMMLEBDKPH7E,upperdir=/var/lib/docker/overlay2/bc623c3245d17cf80a525ca7beb4cb9c4a883122b3017a8005bf1da780d6
9f2c/diff,workdir=/var/lib/docker/overlay2/bc623c3245d17cf80a525ca7beb4cb9c4a883122b3017a8005bf1da780d69f2c/work,index=off)
```

After digging a little bit with those mount points, I found root filesystem for
my container, which was
`/var/lib/docker/overlay2/l/
IHBUIF5NL33D26VMMLEBDKPH7E/`

```bash
ls /var/lib/docker/overlay2/l/IHBUIF5NL33D26VMMLEBDKPH7E/

## Output
bin@  boot/  dev/  etc/  home/  lib@  lib32@  lib64@  libx32@  media/  mnt/  opt/  proc/  root/  run/  sbin@  srv/  sys/  tmp/  usr/  var/
```

To fasten things up, I will create in this root file in home directory test dir

```bash
mkdir /var/lib/docker/overlay2/l/IHBUIF5NL33D26VMMLEBDKPH7E/home/test
```

Now let's check if this file exists in container:

```bash
docker exec rabbitmq ls /home

## Output
total 0
drwxr-xr-x 1 root root 26 Aug 20 09:35 .
drwxr-xr-x 1 root root 26 Aug 20 08:43 ..
drwxr-xr-x 0 root root  0 Aug 20 09:17 test
```

Files inside container are isolated on container level, so they are not visible
by other containers, but they are visible by host machine as they are just
directories mounted from host machine.

## What is minimal requirement for something to be called a container?

With all that knowledge let's try to think what is minimal isolation that we
need to achieve in order to call it a container. From my point of view, it's at
least filesystem and PID isolation. I think that PID isolation here is more
important than filesystem isolation as we can achieve filesystem isolation by
using `chroot` command (change root).

Chroot is the command that allows to change root directory for a process as well
as its children. So, if we would use chroot, we would have filesystem isolation
(this is called `chroot jail`), but we would still have the same PID as on host
machine. So, if we would run `ps` command inside container, we would see all
processes running on host machine.

I would also add cgroups to this list. Container for me is a synonym of
isolation or boundaries, and without cgroups it can take all resources from host
machine, and it doesn't seem like isolation to me.

## Summary

It's time to sum up the knowledge that was presented in this article. Firstly, containers are really just processes running on host machine, but with
extra layer of isolation. This isolation is achieved by using namespaces and
cgroups. We have 6 main namespaces: PID, network, mount, IPC, UTS and user. Each
namespace is used to isolate different part of the system, so they would not
interfere with each other. Cgroups are used to limit resources that container
can use.

That's it for today, have a nice day!
