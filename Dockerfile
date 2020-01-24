FROM node:13.7.0-stretch-slim

COPY package.json /usr/src/
WORKDIR /usr/src
RUN adduser --disabled-password --gecos "" user && \
  chown -R user:user . && \
  apt-get -qy update && \
  apt-get -qy install git libgl1 libxi6 # 🙄

COPY ssh_known_hosts /etc/ssh/ssh_known_hosts

USER user
RUN npm install && \
  git config --global user.email "circle@5pi.de" && \
  git config --global user.name "Johannes 'fish' Ziemke"

COPY --chown=user . /usr/src

RUN npm run lint && npm run build
