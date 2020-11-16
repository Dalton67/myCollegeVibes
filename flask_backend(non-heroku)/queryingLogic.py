import pandas as pd
import numpy as np
import requests
import psycopg2

DB_NAME = "wesbcdcw"
DB_USER = "wesbcdcw"
DB_PASS = "K0eRtBbOQ92yDaj6pK1mJsuJ_OavjzOZ"
DB_HOST = "lallah.db.elephantsql.com"
DB_PORT = "5432"
print("\nConnecting to postgres database...")

conn = psycopg2.connect(database=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST, port=DB_PORT)

print("\nDatabase connected successfully!")

# fetch all tables from DB and store in pandas dataframe
universities_query = pd.read_sql_query("""Select * from universities""", conn)
global universities
universities = pd.DataFrame(universities_query, columns=[
                            "university_id", "name", "country", "spotify_link"])

university_genres_query = pd.read_sql_query(
    """Select * from university_genres""", conn)
global university_genres
university_genres = pd.DataFrame(university_genres_query, columns=[
                                 "university_id", "genre_id", "popularity"])

all_genres_query = pd.read_sql_query("""Select * from all_genres""", conn)
global all_genres
all_genres = pd.DataFrame(all_genres_query, columns=["genre_id", "genre_name"])

country_query = pd.read_sql_query("""Select * from country""", conn)
global country
country = pd.DataFrame(country_query, columns=["genre_id", "genre_name"])

electronic_query = pd.read_sql_query("""Select * from electronic""", conn)
global electronic
electronic = pd.DataFrame(electronic_query, columns=["genre_id", "genre_name"])

folk_query = pd.read_sql_query("""Select * from folk""", conn)
global folk
folk = pd.DataFrame(folk_query, columns=["genre_id", "genre_name"])

funk_query = pd.read_sql_query("""Select * from funk""", conn)
global funk
funk = pd.DataFrame(funk_query, columns=["genre_id", "genre_name"])

indie_query = pd.read_sql_query("""Select * from indie""", conn)
global indie
indie = pd.DataFrame(indie_query, columns=["genre_id", "genre_name"])

miscellaneous_query = pd.read_sql_query(
    """Select * from miscellaneous""", conn)
global miscellaneous
miscellaneous = pd.DataFrame(miscellaneous_query, columns=[
                             "genre_id", "genre_name"])

pop_query = pd.read_sql_query("""Select * from pop""", conn)
global pop
pop = pd.DataFrame(pop_query, columns=["genre_id", "genre_name"])

rap_query = pd.read_sql_query("""Select * from rap""", conn)
global rap
rap = pd.DataFrame(rap_query, columns=["genre_id", "genre_name"])

religious_query = pd.read_sql_query("""Select * from religious""", conn)
global religious
religious = pd.DataFrame(religious_query, columns=["genre_id", "genre_name"])

rock_query = pd.read_sql_query("""Select * from rock""", conn)
global rock
rock = pd.DataFrame(rock_query, columns=["genre_id", "genre_name"])

user_selected_genres = ['country', 'rap', 'pop']
all_university_ids = university_genres['university_id']
all_university_ids = list(dict.fromkeys(all_university_ids))

gids = []
for i in range(len(user_selected_genres)):
    gids.append(int(all_genres.loc[all_genres['genre_name'] == str(
        user_selected_genres[i])]['genre_id']))

popularities_per_uids_total = {key: 0 for key in all_university_ids}
for i in range(len(user_selected_genres)):
    uids_per_genre = np.array(
        university_genres.loc[university_genres['genre_id'] == gids[i]]['university_id'])
    popularities_per_uids_per_genre = np.array(
        university_genres.loc[university_genres['genre_id'] == gids[i]]['popularity'])
    for j in range(len(popularities_per_uids_per_genre)):
        popularities_per_uids_total[uids_per_genre[j]
                                    ] += popularities_per_uids_per_genre[j]

popularities_per_uids_total = sorted(
    popularities_per_uids_total.items(), key=lambda x: x[1], reverse=True)
topNCount = 0
topN_UIDS = []
topN_pops = []
topN_spotifyLinks = []
for uid_popularity_pair in popularities_per_uids_total:
    if topNCount == 10:
        break
    else:
        spotify_link = np.array(universities.loc[universities['university_id']
                                                 == uid_popularity_pair[0]]['spotify_link'])[0]
        topN_UIDS.append(uid_popularity_pair[0])
        topN_pops.append(uid_popularity_pair[1])
        topN_spotifyLinks.append(spotify_link)
        topNCount += 1

final_answer = {}
loc = 0
rank = 1
for id in topN_UIDS:
    name = np.array(
        universities.loc[universities['university_id'] == id])[0][1]
    final_answer[rank] = {
        'university_id': id,
        'university_name': name,
        'popularity': topN_pops[loc],
        'spotify_link': topN_spotifyLinks[loc]
    }
    loc += 1
    rank += 1
print(final_answer)
