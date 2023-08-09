# hackaton_2023
## Prérequis
- Docker
- Docker-compose
## Lancement du docker
Se mettre dans le même répertoire que le fichier "docker-compose.yml".
Lancer la commande suivante : 
docker-compose up

## Stoper le docker
docker-compose stop

## Lister les docker
docker ps

## Se connecter au docker
### Apache
docker exec -it hackaton_2023-apache-container-1 bash
### Debian
docker exec -it hackaton_2023-debian-container-1 bash

## Supprimer le docker et vider le cache
Se mettre dans le même répertoire que le fichier "docker-compose.yml".

Lancer les commandes suivante dans l'ordre:
docker-compose down

docker rmi --force httpd:2.4

docker rmi --force hackaton_2023-debian-container

docker volume prune

docker builder prune

# Models
## Télécharger les modèles de langages dans le répertoire 
IA_WebCreator\models
### Exemple
IA_WebCreator\models\llama-30b-instruct-2048

## Llama-2-70b-instruct-v2
https://huggingface.co/upstage/Llama-2-70b-instruct-v2

# Config wsl pour windows
Créer un fichier .wslconfig dans le répertoire %UserProfile%
## .wslconfig
[wsl2]

memory=16GB 

processors=8 
