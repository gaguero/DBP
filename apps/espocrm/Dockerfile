FROM php:8.2-apache

ENV APACHE_DOCUMENT_ROOT=/var/www/html \
    PHP_MEMORY_LIMIT=512M

WORKDIR /var/www/html

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        cron \
        g++ \
        git \
        libcurl4-openssl-dev \
        libfreetype6-dev \
        libicu-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libpq-dev \
        libxml2-dev \
        libzip-dev \
        unzip \
        rsync; \
    docker-php-ext-configure gd --with-freetype --with-jpeg; \
    docker-php-ext-install -j"$(nproc)" \
        bcmath \
        calendar \
        exif \
        gd \
        intl \
        mysqli \
        opcache \
        pdo_mysql \
        pdo_pgsql \
        soap \
        zip \
        pgsql; \
    pecl install redis; \
    docker-php-ext-enable redis; \
    a2enmod rewrite headers; \
    rm -rf /var/lib/apt/lists/*

COPY src/ /var/www/html/

RUN set -eux; \
    php bin/command extension/pack Workflows; \
    WORKFLOW_PKG=$(ls data/cache/application/extensions/Workflows*.zip | head -n 1); \
    php bin/command extension/install "$WORKFLOW_PKG" --force; \
    rm -f "$WORKFLOW_PKG"; \
    mkdir -p /persistent/data /persistent/custom; \
    if [ -z "$(ls -A /persistent/data)" ]; then cp -a data/. /persistent/data/; fi; \
    if [ -z "$(ls -A /persistent/custom)" ]; then cp -a custom/. /persistent/custom/; fi; \
    mkdir -p /tmp/workflows-module; \
    cp -a custom/Espo/Modules/Workflows /tmp/workflows-module/; \
    rm -rf data custom; \
    ln -s /persistent/data data; \
    ln -s /persistent/custom custom

RUN set -eux; \
    chown -R www-data:www-data /var/www/html /persistent; \
    find /var/www/html -type d -exec chmod 755 {} \;; \
    find /var/www/html -type f -exec chmod 644 {} \;; \
    chmod -R 775 /persistent/data /persistent/custom

COPY php.ini /usr/local/etc/php/conf.d/espocrm.ini

COPY docker-entrypoint.sh /usr/local/bin/espocrm-entrypoint.sh

RUN chmod +x /usr/local/bin/espocrm-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["espocrm-entrypoint.sh"]
CMD ["apache2-foreground"]
