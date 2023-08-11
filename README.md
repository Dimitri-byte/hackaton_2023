# hackaton_2023

## Prérequis
- Installer Oracle Virtual Box : https://www.virtualbox.org/wiki/Downloads

- Installer Vagrant : https://www.vagrantup.com

### Installer les plugins suivant
Dans un terminal (même sous windows) lancer la commande suivante : 

vagrant plugin install vagrant-vbguest

vagrant plugin install vagrant-disksize

## Lancement du vagrant
Se mettre dans le même répertoire que le fichier "Vagrantfile".
Lancer la commande suivante : 

vagrant up

## Supprimer la vagrant
Fermer la VM sur Oracle Virtualbox

vagrant destroy

## Se connecter au Vagrant
vagrant ssh

# Models
## Télécharger les modèles de langages dans le répertoire 
IA_WebCreator\models
### Exemple
IA_WebCreator\models\llama-30b-instruct-2048

## Llama-2-70b-instruct-v2
https://huggingface.co/upstage/Llama-2-70b-instruct-v2

## pygmalion-6b  (petit modèle)

https://huggingface.co/PygmalionAI/pygmalion-6b

