## how it works

These are the steps the algorithm follows:

- We have a list of hotel ratings and reviews given by different users.
- We want to recommend hotels to a specific user based on their ratings and reviews.
- First, we organize this data into a table called a DataFrame. Each row in the table represents a user's rating and review for a hotel.
- We assign a sentiment value (positive is 1 or negative is -1) to each review to understand if the user liked or disliked the hotel.
- We remove any duplicate entries to make sure we have unique ratings and reviews for each user-hotel combination.
- Next, we create a user-item matrix. This matrix represents users as rows and hotels as columns, with the ratings and sentiments as values.
- Now, we calculate the similarity between the target user and other users using a method called cosine similarity. It helps us measure how similar the users are based on their ratings and sentiment values.
- We find the index of the target user in the DataFrame.
- We sort the similarity scores of the target user with other users and get the indices of the most similar users.
- From these similar users, we select the top ones.
- We then look at the hotels these top similar users rated highly and recommend those hotels to the target user.
- Finally, we select the top 3 recommended hotels based on their average ratings.
- We convert the recommended hotels into a list format that can be easily sent in JSON format as a response.

In summary, the code takes user ratings, reviews, and sentiment values into account, calculates similarity with other users, and recommends the top 3 hotels that similar users have rated highly.

"Imagine you and your friends have been to different hotels and you all gave ratings to those hotels. Now, I want to recommend some hotels to you based on the ratings of your friends who have similar tastes to yours.
First, we take all the ratings and put them in a table. Each row represents a person, and each column represents a hotel. In this table, we calculate how similar each person is to each other person. We compare how similar their ratings are across different hotels.
Next, we find your row in the table based on your ID. If we can't find your ID, it means you haven't rated any hotels, so we won't be able to recommend anything to you.
Once we find your row, we look at how similar you are to other people. We sort all the other rows based on how similar they are to you, with the most similar people at the top.
Then, we look at the top similar people (let's say the top 5). We see which hotels they liked the most and we calculate the average rating for each hotel based on those top 5 people.
Finally, we select the top 3 hotels with the highest average ratings from the top similar people. These are the hotels we recommend to you.
We convert the recommended hotels into a list and give it to you, so you can see the names of the hotels and their average ratings.
So, in summary, we take ratings from you and your friends, find people who have similar tastes to yours, see which hotels they liked the most, and then recommend those top hotels to you."
