#!/bin/bash

# Script de prueba para endpoints de workflows
# Uso: ./test-endpoints.sh [API_URL]

API_URL="${1:-http://localhost:3000}"
EMAIL="test@example.com"
PASSWORD="password123"

echo "🧪 Testing Workflows API Endpoints"
echo "=================================="
echo "API URL: $API_URL"
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para hacer requests
make_request() {
  local method=$1
  local endpoint=$2
  local data=$3
  local token=$4
  
  if [ -n "$token" ]; then
    if [ -n "$data" ]; then
      curl -s -X "$method" "$API_URL$endpoint" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $token" \
        -d "$data"
    else
      curl -s -X "$method" "$API_URL$endpoint" \
        -H "Authorization: Bearer $token"
    fi
  else
    curl -s -X "$method" "$API_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data"
  fi
}

# Test 1: Health check
echo "1️⃣  Testing health check..."
HEALTH=$(make_request "GET" "/health")
if echo "$HEALTH" | grep -q "ok"; then
  echo -e "${GREEN}✅ Health check passed${NC}"
  echo "$HEALTH" | jq '.' 2>/dev/null || echo "$HEALTH"
else
  echo -e "${RED}❌ Health check failed${NC}"
  echo "$HEALTH"
fi
echo ""

# Test 2: Register user
echo "2️⃣  Registering user..."
REGISTER_RESPONSE=$(make_request "POST" "/api/v1/auth/register" "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")
if echo "$REGISTER_RESPONSE" | grep -q "token\|id"; then
  echo -e "${GREEN}✅ User registered${NC}"
  TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.token // empty' 2>/dev/null)
else
  echo -e "${YELLOW}⚠️  User might already exist, trying login...${NC}"
  # Try login instead
  LOGIN_RESPONSE=$(make_request "POST" "/api/v1/auth/login" "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")
  TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token // empty' 2>/dev/null)
  if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    echo -e "${GREEN}✅ Login successful${NC}"
  else
    echo -e "${RED}❌ Login failed${NC}"
    echo "$LOGIN_RESPONSE"
    exit 1
  fi
fi
echo ""

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ] || [ "$TOKEN" = "" ]; then
  echo -e "${RED}❌ Could not obtain authentication token${NC}"
  exit 1
fi

echo "Token: ${TOKEN:0:30}..."
echo ""

# Test 3: Create workflow
echo "3️⃣  Creating workflow..."
WORKFLOW_DATA='{
  "name": "Test Workflow",
  "description": "Workflow creado por script de prueba",
  "entityType": "Lead",
  "triggerType": "created",
  "definition": {
    "nodes": [
      {
        "id": "trigger-1",
        "type": "trigger",
        "data": {
          "entityType": "Lead",
          "event": "created"
        },
        "position": { "x": 100, "y": 100 }
      },
      {
        "id": "action-1",
        "type": "action",
        "data": {
          "actionType": "updateField",
          "field": "status",
          "value": "qualified"
        },
        "position": { "x": 300, "y": 100 }
      }
    ],
    "edges": [
      {
        "id": "edge-1",
        "source": "trigger-1",
        "target": "action-1"
      }
    ]
  }
}'

CREATE_RESPONSE=$(make_request "POST" "/api/v1/workflows" "$WORKFLOW_DATA" "$TOKEN")
WORKFLOW_ID=$(echo "$CREATE_RESPONSE" | jq -r '.id // empty' 2>/dev/null)

if [ -n "$WORKFLOW_ID" ] && [ "$WORKFLOW_ID" != "null" ] && [ "$WORKFLOW_ID" != "" ]; then
  echo -e "${GREEN}✅ Workflow created${NC}"
  echo "$CREATE_RESPONSE" | jq '.' 2>/dev/null || echo "$CREATE_RESPONSE"
else
  echo -e "${RED}❌ Failed to create workflow${NC}"
  echo "$CREATE_RESPONSE" | jq '.' 2>/dev/null || echo "$CREATE_RESPONSE"
  echo ""
  echo -e "${YELLOW}💡 Tip: Verifica que tu usuario tenga rol 'editor' o 'admin'${NC}"
  exit 1
fi
echo ""

# Test 4: List workflows
echo "4️⃣  Listing all workflows..."
LIST_RESPONSE=$(make_request "GET" "/api/v1/workflows" "" "$TOKEN")
if echo "$LIST_RESPONSE" | grep -q "\["; then
  echo -e "${GREEN}✅ Workflows listed${NC}"
  echo "$LIST_RESPONSE" | jq 'length' 2>/dev/null || echo "Response received"
  echo "$LIST_RESPONSE" | jq '.[0] | {id, name, status}' 2>/dev/null || echo "$LIST_RESPONSE"
else
  echo -e "${RED}❌ Failed to list workflows${NC}"
  echo "$LIST_RESPONSE"
fi
echo ""

# Test 5: Get specific workflow
if [ -n "$WORKFLOW_ID" ] && [ "$WORKFLOW_ID" != "null" ]; then
  echo "5️⃣  Getting workflow by ID..."
  GET_RESPONSE=$(make_request "GET" "/api/v1/workflows/$WORKFLOW_ID" "" "$TOKEN")
  if echo "$GET_RESPONSE" | grep -q "$WORKFLOW_ID"; then
    echo -e "${GREEN}✅ Workflow retrieved${NC}"
    echo "$GET_RESPONSE" | jq '{id, name, status, entityType}' 2>/dev/null || echo "$GET_RESPONSE"
  else
    echo -e "${RED}❌ Failed to get workflow${NC}"
    echo "$GET_RESPONSE"
  fi
  echo ""
fi

# Test 6: Update workflow
if [ -n "$WORKFLOW_ID" ] && [ "$WORKFLOW_ID" != "null" ]; then
  echo "6️⃣  Updating workflow..."
  UPDATE_DATA='{
    "name": "Test Workflow Updated",
    "status": "active",
    "description": "Descripción actualizada"
  }'
  UPDATE_RESPONSE=$(make_request "PUT" "/api/v1/workflows/$WORKFLOW_ID" "$UPDATE_DATA" "$TOKEN")
  if echo "$UPDATE_RESPONSE" | grep -q "Updated\|active"; then
    echo -e "${GREEN}✅ Workflow updated${NC}"
    echo "$UPDATE_RESPONSE" | jq '{id, name, status}' 2>/dev/null || echo "$UPDATE_RESPONSE"
  else
    echo -e "${RED}❌ Failed to update workflow${NC}"
    echo "$UPDATE_RESPONSE"
  fi
  echo ""
fi

echo "=================================="
echo -e "${GREEN}✅ Tests completed!${NC}"
echo ""
echo "Workflow ID: $WORKFLOW_ID"
echo "To delete the workflow (requires admin role):"
echo "  curl -X DELETE $API_URL/api/v1/workflows/$WORKFLOW_ID \\"
echo "    -H 'Authorization: Bearer $TOKEN'"





