from flask import Flask, jsonify
import g4f

app = Flask(__name__)



print(g4f.Provider.Ails.params) # supported args



# # streamed completion
# response = g4f.ChatCompletion.create(model='gpt-3.5-turbo',provider=g4f.Provider.GetGpt, messages=[
#                                      {"role": "user", "content": "write a code to swap two numbers"}], stream=True)
def chatCompletion(query):
    return g4f.ChatCompletion.create(model='gpt-3.5-turbo',provider=g4f.Provider.GetGpt, messages=[
                                     {"role": "user", "content": query}], stream=False)

def chatCompletionStream(query):
    response = g4f.ChatCompletion.create(model='gpt-3.5-turbo',provider=g4f.Provider.GetGpt, messages=[
                                     {"role": "user", "content": query}], stream=True)
    for message in response:
       return message



@app.route("/api/chat/<query>")
def artist(query):
    return  jsonify(chatCompletion(query))