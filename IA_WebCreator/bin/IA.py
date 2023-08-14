import os
import openai

# Lire la clé API depuis le fichier
with open("api_key.txt", "r") as file:
    api_key = file.read().strip()

openai.api_key = api_key

# Créer la conversation avec le modèle
chat_completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Bonjour, dit moi en anglais bonjour je suis chatgpt"}
    ]
)

# Afficher la réponse générée par le modèle
response = chat_completion.choices[0].message["content"]
print("Réponse :", response)
