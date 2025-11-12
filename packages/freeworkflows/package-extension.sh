#!/bin/bash
# Bash script to package FreeWorkflows extension
# Usage: ./package-extension.sh

set -e

EXTENSION_NAME="FreeWorkflows"
VERSION="1.0.0"
PACKAGE_NAME="${EXTENSION_NAME}-${VERSION}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="${SCRIPT_DIR}"
BUILD_DIR="${SCRIPT_DIR}/../build"
ZIP_FILE="${BUILD_DIR}/${PACKAGE_NAME}.zip"

echo "Packaging FreeWorkflows extension..."

# Create build directory
rm -rf "${BUILD_DIR}"
mkdir -p "${BUILD_DIR}"

# Create temporary package directory
TEMP_PACKAGE_DIR="${BUILD_DIR}/${PACKAGE_NAME}"
mkdir -p "${TEMP_PACKAGE_DIR}"

# Copy manifest.json
cp "${SOURCE_DIR}/manifest.json" "${TEMP_PACKAGE_DIR}/"

# Copy scripts directory
cp -r "${SOURCE_DIR}/scripts" "${TEMP_PACKAGE_DIR}/"

# Copy files directory
cp -r "${SOURCE_DIR}/files" "${TEMP_PACKAGE_DIR}/"

# Copy documentation files (optional, but recommended)
cp "${SOURCE_DIR}/README.md" "${TEMP_PACKAGE_DIR}/" 2>/dev/null || true
cp "${SOURCE_DIR}/CHANGELOG.md" "${TEMP_PACKAGE_DIR}/" 2>/dev/null || true
cp "${SOURCE_DIR}/QA_CHECKLIST.md" "${TEMP_PACKAGE_DIR}/" 2>/dev/null || true

echo "Creating ZIP archive..."

# Create ZIP file
cd "${BUILD_DIR}"
zip -r "${PACKAGE_NAME}.zip" "${PACKAGE_NAME}" -q

# Clean up temporary directory
rm -rf "${TEMP_PACKAGE_DIR}"

echo "Extension packaged successfully!"
echo "Package location: ${ZIP_FILE}"
echo ""
echo "Next steps:"
echo "1. Test the extension in a development EspoCRM instance"
echo "2. Upload to EspoCRM via Administration > Extensions > Upload Extension"
echo "3. Or install via CLI: php bin/command extension/install ${ZIP_FILE} --force"

