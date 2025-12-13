#!/bin/sh
set -e

#CERT_DIR="/etc/ssl"
#CERT_KEY="$CERT_DIR/selfsigned.key"
#CERT_CRT="$CERT_DIR/selfsigned.crt"

# Create directory if not exists
#mkdir -p "$CERT_DIR"

# Generate self-signed certificate if missing
#if [ ! -f "$CERT_KEY" ] || [ ! -f "$CERT_CRT" ]; then
#  echo "Generating self-signed SSL certificate..."
#  openssl req -x509 -nodes -days 365 \
#    -subj "/CN=${APP_HOSTNAME}" \
#    -newkey rsa:2048 \
#    -keyout "$CERT_KEY" \
#    -out "$CERT_CRT"
#fi

sed -i "s|KEYCLOAK_URL|${KEYCLOAK_URL}|g" /usr/share/nginx/html/main*.js
sed -i "s|BACKEND_URL|${BACKEND_URL}|g" /usr/share/nginx/html/main*.js

# Start nginx in foreground
exec nginx -g "daemon off;"