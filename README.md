# hackaton_2023

## Prérequis
- Installer Oracle Virtual Box : https://www.virtualbox.org/wiki/Downloads

- Installer Vagrant : https://www.vagrantup.com

### Installer les plugins suivant
Dans un terminal (même sous windows) lancer les commandes suivante : 

vagrant plugin install vagrant-vbguest

vagrant plugin install vagrant-disksize

## Lancement du vagrant
Se mettre dans le même répertoire que le fichier "Vagrantfile".
Lancer la commande suivante : 

vagrant up

## Supprimer la vagrant
Fermer la VM sur Oracle Virtualbox

vagrant destroy

## tester la connexion web
http://127.0.0.1:8081

## Se connecter au Vagrant
vagrant ssh

# API ChatGPT
## Créer une API key
Personal -> View API keys -> Create new secret key
### Fichier clé
Inscrire la clé dans le fichier IA_WebCreator/bin/api_key.txt
## Sources
https://platform.openai.com/overview


