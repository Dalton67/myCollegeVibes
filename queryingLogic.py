import psycopg2
import tableschema
import pandas as pd
import numpy as np

DB_NAME = "wesbcdcw"
DB_USER = "wesbcdcw"
DB_PASS = "K0eRtBbOQ92yDaj6pK1mJsuJ_OavjzOZ"
DB_HOST = "lallah.db.elephantsql.com"
DB_PORT = "5432"

print("\nConnecting to postgres database...")

conn = psycopg2.connect(database=DB_NAME, user=DB_USER,
                        password=DB_PASS, host=DB_HOST, port=DB_PORT)

print("\nDatabase connected successfully!")
cur = conn.cursor()


# fetch all tables from DB and store in pandas dataframe
universities_query = pd.read_sql_query("""Select * from universities""", conn)
universities = pd.DataFrame(universities_query, columns=["university_id", "name", "country", "spotify_link"])

university_genres_query = pd.read_sql_query("""Select * from university_genres""", conn)
university_genres = pd.DataFrame(university_genres_query, columns=["university_id", "genre_id", "popularity"])

all_genres_query = pd.read_sql_query("""Select * from all_genres""", conn)
all_genres = pd.DataFrame(all_genres_query, columns=["genre_id", "genre_name"])

country_query = pd.read_sql_query("""Select * from country""", conn)
country = pd.DataFrame(country_query, columns=["genre_id", "genre_name"])

electronic_query = pd.read_sql_query("""Select * from electronic""", conn)
electronic = pd.DataFrame(electronic_query, columns=["genre_id", "genre_name"])

folk_query = pd.read_sql_query("""Select * from folk""", conn)
folk = pd.DataFrame(folk_query, columns=["genre_id", "genre_name"])

funk_query = pd.read_sql_query("""Select * from funk""", conn)
funk = pd.DataFrame(funk_query, columns=["genre_id", "genre_name"])

indie_query = pd.read_sql_query("""Select * from indie""", conn)
indie = pd.DataFrame(indie_query, columns=["genre_id", "genre_name"])

miscellaneous_query = pd.read_sql_query("""Select * from miscellaneous""", conn)
miscellaneous = pd.DataFrame(miscellaneous_query, columns=["genre_id", "genre_name"])

pop_query = pd.read_sql_query("""Select * from pop""", conn)
pop = pd.DataFrame(pop_query, columns=["genre_id", "genre_name"])

rap_query = pd.read_sql_query("""Select * from rap""", conn)
rap = pd.DataFrame(rap_query, columns=["genre_id", "genre_name"])

religious_query = pd.read_sql_query("""Select * from religious""", conn)
religious = pd.DataFrame(religious_query, columns=["genre_id", "genre_name"])

rock_query = pd.read_sql_query("""Select * from rock""", conn)
rock = pd.DataFrame(rock_query, columns=["genre_id", "genre_name"])


# SELECT genre_id
# FROM all_genres
# WHERE genre_name = 'pop'
# AS gid

gid = int(all_genres.loc[all_genres['genre_name'] == 'pop']['genre_id'])


# SELECT university_id
# FROM university_genres
# WHERE genre_id = gid
# AS uid

uids = np.array(university_genres.loc[university_genres['genre_id'] == gid]['university_id'])


# SELECT popularity
# FROM university_genres
# WHERE genre_id = gid
# AS pop

pop = np.array(university_genres.loc[university_genres['genre_id'] == gid]['popularity'])


# helper function to sort list by popularity
def sort_pop(pop):
    return pop[1]


# SELECT name FROM universities
# WHERE university_id = uid
# Sort name by popularity
univ_names_list_with_pop = []
pos = 0
for id in uids:
    name = np.array(universities.loc[universities['university_id'] == id])[0][1]  # column headers: id, name, country, spotifylink
    univ_names_list_with_pop.append([name, pop[pos]])
    pos += 1
univ_names_list_with_pop.sort(key=sort_pop, reverse=True)
print(univ_names_list_with_pop[0:5])
