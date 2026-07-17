docker buildx create --name aura-builder --use
docker buildx inspect --bootstrap
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t aura-ecosystem:fadk-s4x \
  --build-arg VERSION=V.FADK \
  --push .

