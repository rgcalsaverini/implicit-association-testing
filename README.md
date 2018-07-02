```bash
docker build -t iat/app:alpha -f deploy/app/Dockerfile .

docker rm -f $(docker ps -qa)

docker run -td --network dev-network --name mongo mongo:3.7

docker run -td \
    --network dev-network  \
    -p 8888:80  \
    -v /home/rui/workspace/personal/iat/templates:/templates \
    -v /home/rui/workspace/personal/iat/dconfigs.json:/root/configs.json \
    -v /home/rui/workspace/personal/iat/disclaimer.md:/root/disclaimer.md \
    --name app  \
    iat/app:alpha
```


export VERSION=<PUT VERSION HERE>
docker build -t iat/app:$VERSION -f deploy/app/Dockerfile .
docker tag  iat/app:$VERSION iat/app:latest
docker tag  iat/app:$VERSION registry.calsaverini.com:5000/iat/app:$VERSION
docker tag  iat/app:$VERSION registry.calsaverini.com:5000/iat/app:latest
docker push registry.calsaverini.com:5000/iat/app:$VERSION
docker push registry.calsaverini.com:5000/iat/app:latest


### Todo:

- Process result and feedback
- questionnaire
- header, logo etc

---------------------------------------

- Cleanup template code
- Improve and separate results code

---------------------------------------

- Move more state logic to the 'logic' file
- Separate reducers
- Clean up connections
- Correct prop types


nosetests --with-coverage -v --cover-erase --cover-package=backend --cover-html --cover-branches --cover-html-dir=/tmp 

nosetests -v --with-coverage --cover-erase --cover-package=backend