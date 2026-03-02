FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

USER root

RUN npm install -g @sap/cds-dk mbt

RUN curl -fsSL "https://packages.cloudfoundry.org/stable?release=linux64-binary&source=github" -o /tmp/cf-cli.tgz \
    && tar -xzf /tmp/cf-cli.tgz -C /usr/local/bin cf cf8 \
    && chmod +x /usr/local/bin/cf /usr/local/bin/cf8 \
    && rm -f /tmp/cf-cli.tgz

USER node

RUN cf add-plugin-repo CF-Community https://plugins.cloudfoundry.org \
    && cf install-plugin -r CF-Community multiapps -f