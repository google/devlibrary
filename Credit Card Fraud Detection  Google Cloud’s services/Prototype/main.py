from calendar import month
from unicodedata import category
from webbrowser import get
from flask import Flask, request, render_template, redirect, url_for
import joblib
import pandas as pd

model = joblib.load('model.pkl')
app = Flask(__name__)

def get_category(category):
    dict = {'category_food_dining':0.0, 'category_gas_transport':0.0, 'category_grocery_net':0.0, 
    'category_grocery_pos':0.0, 'category_health_fitness':0.0, 'category_home':0.0, 'category_kids_pets':0.0, 
    'category_misc_net':0.0, 'category_misc_pos':0.0, 'category_personal_care':0.0, 'category_shopping_net':0.0, 
    'category_shopping_pos':0.0, 'category_travel':0.0}

    if category == "food_dining":
        dict['category_food_dining'] = 1.0
    elif category == "gas_transport":
        dict['category_gas_transport'] = 1.0
    elif category == "grocery_net":
        dict['category_grocery_net'] = 1.0
    elif category == "grocery_pos":
        dict['category_grocery_pos'] = 1.0
    elif category == "health_fitness":
        dict['category_health_fitness'] = 1.0
    elif category == "home":
        dict['category_home'] = 1.0
    elif category == "kids_pets":
        dict['category_kids_pets'] = 1.0
    elif category == "misc_net'":
        dict['category_misc_net'] = 1.0
    elif category == "misc_pos":
        dict['category_misc_pos'] = 1.0
    elif category == "personal_care":
        dict['category_personal_care'] = 1.0
    elif category == "shopping_net":
        dict['category_shopping_net'] = 1.0
    elif category == "shopping_pos":
        dict['category_shopping_pos'] = 1.0
    elif category == "travel":
        dict['category_travel'] = 1.0
    return list(dict.values())

def input_data_preparation(initial, category):
    initial.extend(category)
    temp = []
    temp.append(initial)
    return temp



@app.route('/')
def main():
    return render_template("index.html")


@app.route('/sub', methods=["POST"])
def Result():
    category = request.form["category"]
    amt = float(request.form["amt"])
    zip = float(request.form["zip"])
    lat = 42.5545
    long = -90.3508
    city_pop = 1306.0
    merch_lat = 42.461127000000005
    merch_long = -91.147148
    age = 64.0
    hour = 22.0
    day = 6.0
    month = 6.0
    name = request.form["name"]
    # arb_fraud = [[780.52, 53803.0, 42.5545, -90.3508, 1306.0, 42.461127000000005, -91.147148, 64.0, 22.0, 6.0, 6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]]
    # arb_pre = model.predict(arb_fraud)
    # print(arb_pre)
    # amt = 780.52
    # zip = 53803
    # lat = 42.5545
    # long = -90.3508
    # city_pop = 1306.0
    # merch_lat = 42.461127000000005
    # merch_long = -91.147148
    # age = 64
    # hour = 22
    # day = 6
    # month = 6
    # category = "home"
    initial = [amt, zip, lat, long, city_pop, merch_lat, merch_long, age, hour, day, month]
    temp = get_category(category)
    arb_data = input_data_preparation(initial, temp)
    print(arb_data)
    arb_pred = model.predict(arb_data)
    if arb_pred == [1]:
        return render_template("chatbot.html")
    else:
        return render_template("successful.html", amt=amt, name=name)


if __name__ == '__main__':
    app.run(debug=True)