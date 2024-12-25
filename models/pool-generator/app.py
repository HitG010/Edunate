import spacy
from nltk.sentiment import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

reviews = [
    "The library is outdated, and we need more modern resources.",
    "The scholarships are helpful, but I believe more should be given to low-income students.",
    "There should be more funds for mental health services for students.",
    "Research grants are essential for students looking to innovate in their fields."
]


# Load spaCy model for English
nlp = spacy.load("en_core_web_sm")

def preprocess_review(review):
    doc = nlp(review.lower())  # Convert to lowercase and process
    tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
    return " ".join(tokens)

# Preprocess all reviews
preprocessed_reviews = [preprocess_review(review) for review in reviews]
# print(preprocessed_reviews) #['library outdate need modern resource', 'scholarship helpful believe give low income student', 'fund mental health service student', 'research grant essential student look innovate field']

sia = SentimentIntensityAnalyzer()
def analyze_sentiment(review):
    return sia.polarity_scores(review)['compound']

sentiments = [analyze_sentiment(review) for review in preprocessed_reviews]
print(sentiments)



# Vectorize the preprocessed reviews
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(preprocessed_reviews)

# Apply LDA (Topic Modeling)
lda = LatentDirichletAllocation(n_components=3, random_state=42)
lda.fit(X)

# Display the topics
for topic_idx, topic in enumerate(lda.components_):
    print(f"Topic #{topic_idx}:")
    print([vectorizer.get_feature_names_out()[i] for i in topic.argsort()[:-6 - 1:-1]])

