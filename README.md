docker build -t iat/app:$VERSION -f deploy/app/Dockerfile .
docker rm -f $(docker ps -q)
docker run -td --network dev-network --name mongo mongo:3.7
docker run -td --network dev-network -p 8888:80 --name app iat/app:0.1.2


export VERSION=<PUT VERSION HERE>
docker build -t iat/app:$VERSION -f deploy/app/Dockerfile .
docker tag  iat/app:$VERSION registry.calsaverini.com:5000/iat/app:$VERSION
docker push registry.calsaverini.com:5000/iat/app:$VERSION
