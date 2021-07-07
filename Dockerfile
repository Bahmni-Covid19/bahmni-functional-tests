FROM gocd/gocd-agent-ubuntu-18.04:v21.2.0

LABEL MAINTAINER="getgauge" \
 VERSION="0.3" \
 DESCRIPTION="ubuntu gocd agent with nodejs, git, xvfb" \
 REPOSITORY="getgauge/gocd-node-xvfb"

USER root

ENV container docker

RUN apt-get update &&\
    apt-get install -y libgbm-dev

RUN apt-get update &&\
    apt-get install -yq \
        gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
        libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
        libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
        libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
        fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

RUN apt-get install -y xvfb &&\
        apt-get -y install dbus-x11 xfonts-base xfonts-100dpi xfonts-75dpi xfonts-cyrillic xfonts-scalable &&\
        apt-get -y install imagemagick x11-apps &&\
        apt-get install -y dialog apt-utils &&\
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections && \
    echo keyboard-configuration keyboard-configuration/layout select 'English (US)' | debconf-set-selections && \
    echo keyboard-configuration keyboard-configuration/layoutcode select 'us' | debconf-set-selections && \
    echo "resolvconf resolvconf/linkify-resolvconf boolean false" | debconf-set-selections && \
    apt-get -y install xorg gtk2-engines-pixbuf

RUN curl -SsL https://downloads.gauge.org/stable | sh

RUN apt-get update && apt-get install -y gnupg &&\
    curl -sL https://deb.nodesource.com/setup_16.x | bash - &&\
    apt-get update &&\ 
    apt-get install -y nodejs make g++ &&\
    apt autoremove -y &&\
    rm -rf /var/lib/apt/lists/*

RUN apt-get -y install npm
