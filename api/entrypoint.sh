#!/bin/sh
set -e

CERT_FILE="/etc/ssl/selfsigned.crt"
KEYSTORE_FILE="/opt/java/openjdk/lib/security/cacerts"
ALIAS="nginx-selfsigned"
PASSWORD="changeit"

# Wait until certificate exists (in case Nginx generates it on startup)
echo "⏳ Waiting for certificate $CERT_FILE ..."
while [ ! -f "$CERT_FILE" ]; do
  sleep 1
done
echo "✅ Certificate found."

# Check if alias already exists in truststore
if keytool -list -keystore "$KEYSTORE_FILE" -storepass "$PASSWORD" -alias "$ALIAS" >/dev/null 2>&1; then
  echo "🔁 Certificate alias '$ALIAS' already exists in truststore — skipping import."
else
  echo "🔐 Importing certificate into Java truststore..."
  keytool -importcert -noprompt -trustcacerts \
    -alias "$ALIAS" \
    -file "$CERT_FILE" \
    -keystore "$KEYSTORE_FILE" \
    -storepass "$PASSWORD"
  echo "✅ Certificate imported successfully."
fi

# Start the Spring Boot app
echo "🚀 Starting Spring Boot application..."
exec java -jar /app/app.jar
