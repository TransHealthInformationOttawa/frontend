# THIO Frontend

The front-end runs within an nginx docker container.

## To run

The command to run the front-end:

```
sudo docker build -t frontend .
sudo docker run -p 81:81 frontend
```
