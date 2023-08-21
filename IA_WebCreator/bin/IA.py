import os
import openai
import requests

# # Lire la clé API depuis le fichier
# with open("api_key.txt", "r") as file:
#     api_key = file.read().strip()

# openai.api_key = api_key

# # Option 1 : Using OpenAI library
# messages=[
#         {"role": "system", "content": "You are a helpful assistant."},
#         {"role": "user", "content": "Bonjour, dit moi en anglais bonjour je suis chatgpt"}
#     ]

# p = int(input('Enter a number: '))
# while p != 0:
#     message = input("User: ")
#     if message:
#         messages.append(
#             {"role": "user", "content": message},
#         )
#     # Créer la conversation avec le modèle
#     chat_completion = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=messages
#     )

#     # Afficher la réponse générée par le modèle
#     response = chat_completion.choices[0].message["content"]
#     print("Réponse :", response)



# URL = "https://api.openai.com/v1/chat/completions"

# payload = {
#    "model": "gpt-3.5-turbo";
#    "messages":"What is the first compter in the world?",
#    "temperature" 1.0,
#    "n": 1,
#    "stream": False,
#    "presence_penalty":0,
#    "frequency_penalty":0,
# }

# headers = {
#     "Content-Type": "application/json",
#     "Authorization": f"Bearer {openai.api_key}"
# }

# response = requests.post(URL, headers=headers, json=payload, stream=False)
# openai.api_key = api_key

# Option 2 : Using the OpenAI's API
# Lire la clé API depuis le fichier
with open("api_key.txt", "r") as file:
    open_api_key = file.read().strip()

def generate_text(prompt):
    api_key = open_api_key
    model = "gpt-3.5-turbo"
    endpoint = f"https://api.openai.com/v1/engines/{model}/jobs"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    data = {
        "prompt": prompt,
        "max_tokens": 100,
        "n": 1,
        "stop": None,
        "temperature": 0.5,
    }
    response = requests.post(endpoint, headers=headers, json=data)
    if response.status_code == 200:
        response_json = response.json()
        return response_json['choices'][0]['text']
    else:
        print(response)
        return None

generated_text = generate_text("Hello, how are you?")
print(generated_text)