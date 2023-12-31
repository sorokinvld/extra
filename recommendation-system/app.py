import json
from bson import ObjectId
from flask_cors import CORS
import requests
from pymongo.mongo_client import MongoClient
from flask import Flask, request
import bson.json_util as json_util
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity


# Sentiment function API
API_URL = "https://api-inference.huggingface.co/models/atowey01/hostel-reviews-sentiment-model"
headers = {"Authorization": f"Bearer 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"}


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


# Connect to MongoDB
uri = "mongodb+srv://pfeprojects2023:12345azerty@cluster0.9fnocaw.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
db = client['db']
reviewcollection = db['reviewsHotel']
ratingcollection = db['ratingHotel']
hotelscollection = db['hotels']
# Retrieve user reviews
user_reviews = reviewcollection.find()
# Preprocessing and feature extraction
preprocessed_reviews = []

for review in user_reviews:
    # Clean and preprocess review comment
    # Example: lowercasing and removing punctuation
    preprocessed_comment = review['comment'].lower()
    preprocessed_comment = ''.join(
        c for c in preprocessed_comment if c.isalnum() or c.isspace())
    # Extract other relevant information
    hotelid = review["item_id"]
    userid = review["user_id"]
    for rating in ratingcollection.find({"item_id": hotelid, "user_id": userid}):
        rate = rating["rating"]
    # Implement sentiment analysis function
    sentimentQuery = query({
        "inputs": preprocessed_comment,
    })
    sentiment = sentimentQuery[0][0].get("label")
    sentiment_value = 0
    if (sentiment == "POSITIVE"):
        sentiment_value = 1
    else:
        sentiment_value = -1
    # Create a new dictionary with the processed data
    processed_review = {
        'userid': userid,
        'hotelid':  hotelid,
        'rating': rate,
        'sentiment': sentiment_value,
    }
    preprocessed_reviews.append(processed_review)


def recommend_hotels(user_id):

    # Convert data to a DataFrame
    df = pd.DataFrame(preprocessed_reviews)
    # Remove duplicate entries
    df = df.drop_duplicates(subset=['hotelid', 'userid'])
    # Pivot the data to create a user-item matrix
    user_item_matrix = df.pivot(
        index='userid', columns='hotelid', values=['rating', 'sentiment']).fillna(0)
    # Calculate the cosine similarity between users
    user_similarity = cosine_similarity(user_item_matrix)
    # Convert user_id to ObjectId
    target_user_id = ObjectId(user_id)
    if target_user_id not in df['userid'].values:
        return []  # User not found
    # Get the index of the target user
    target_user_index = df[df['userid'] == target_user_id].index[0]
    # Get the similarity scores of the target user compared to other users
    target_user_similarity_scores = user_similarity[target_user_index]
    # Sort the similarity scores and get the indices of the most similar users
    similar_user_indices = target_user_similarity_scores.argsort()[::-1]
    # Get the top 3 similar users
    top_similar_users = similar_user_indices[1:6]
    # Get the hotels that the top similar users have rated highly
    recommended_hotels = user_item_matrix.iloc[top_similar_users].mean(
    ).sort_values(ascending=False)
    # Select top 3 recommended hotels
    recommended_hotels = recommended_hotels[:3]
    # Convert the Pandas Series to a list
    recommended_hotels_list = recommended_hotels.reset_index().values.tolist()

    return recommended_hotels_list


app = Flask(__name__)
CORS(app)


@app.route('/')
def greetings():
    return 'Welcome, have a nice stay c: !'


@app.route('/api/recommendation')
def recommendation():
    id = request.args["id"]
    hotels = []
    # Do the recommendation algorithm using the id
    recommended_hotels = recommend_hotels(id)
    print(recommended_hotels)
    for recommendation in recommended_hotels:
        for hotel in hotelscollection.find({"_id": recommendation[1]}):
            hotels.append(hotel)
    return json.loads(json_util.dumps(hotels))


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000")
