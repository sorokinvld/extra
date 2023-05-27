import requests
from pymongo.mongo_client import MongoClient
from flask import Flask, request


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
    sentiment = query({
        "inputs": preprocessed_comment,
    })
    # Create a new dictionary with the processed data
    processed_review = {
        'hotelid':  hotelid,
        'userid': userid,
        'review': preprocessed_comment,
        'rating': rate,
        'sentiment': sentiment,
    }
    preprocessed_reviews.append(processed_review)


user_profiles = {}

for review in preprocessed_reviews:
    user_id = review['userid']

    # Check if user profile exists, create one if not
    if user_id not in user_profiles:
        user_profiles[user_id] = {
            'hotels': [],
            'reviews': [],
            'ratings': [],
            'sentiments': []
        }

    # Add review details to user profile
    user_profiles[user_id]['hotels'].append(review['hotelid'])
    user_profiles[user_id]['reviews'].append(review['review'])
    user_profiles[user_id]['ratings'].append(review['rating'])
    user_profiles[user_id]['sentiments'].append(review['sentiment'])


app = Flask(__name__)


@app.route('/')
def greetings():
    return 'Welcome, have a nice stay c: !'


@app.route('/api/recommendation')
def recommendation():
    id = request.args["id"]
    # Do the recommendation algorithm using the id
    return 'Recommended hotels'


if __name__ == '__main__':
    app.run()
