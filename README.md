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
### Angular
docker exec -it hackaton_2023-angular-1 bash

## Supprimer le docker et vider le cache
Se mettre dans le même répertoire que le fichier "docker-compose.yml".

Lancer les commandes suivante dans l'ordre:
docker-compose down 
docker rmi --force httpd:2.4 
docker rmi --force hackaton_2023-debian-container 
docker rmi --force hackaton_2023-angular
docker volume prune 
docker builder prune

## tester la connexion web
http://127.0.0.1:8081

# API ChatGPT
## Créer une API key
Personal -> View API keys -> Create new secret key
### Fichier clé
Inscrire la clé dans le fichier IA_WebCreator/bin/api_key.txt
## Sources
https://platform.openai.com/overview

# Angular
## Connexion à angular
http://127.0.0.1:4200

# SeverWeb python
## Lancer le serveur web python
python IA.py

## Exemple de requête
curl -X POST -H "Content-Type: application/json" -d '{"prompt": "say hello"}' http://debian-container:5000/generate-text
