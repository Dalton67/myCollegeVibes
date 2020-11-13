from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import pandas as pd
import numpy as np
import psycopg2
from selenium import webdriver #depends on chrome version
from selenium.webdriver.chrome.options import Options #same as above
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

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
universities = pd.DataFrame(universities_query, columns=["university_id", "name", "country", "spotify_link"])

university_genres_query = pd.read_sql_query("""Select * from university_genres""", conn)
global university_genres
university_genres = pd.DataFrame(university_genres_query, columns=["university_id", "genre_id", "popularity"])

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

miscellaneous_query = pd.read_sql_query("""Select * from miscellaneous""", conn)
global miscellaneous
miscellaneous = pd.DataFrame(miscellaneous_query, columns=["genre_id", "genre_name"])

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

@app.route('/<string:genre>')
def test_function(genre):
    # SELECT genre_id
    # FROM all_genres
    # WHERE genre_name = 'pop'
    # AS gid
    gid = int(all_genres.loc[all_genres['genre_name'] == genre]['genre_id'])


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
    top_10 = univ_names_list_with_pop[0:10]
    return str(top_10)

@app.route('/')
def questions():
    return {
                "Q1": "country or pop",
                "Q2": "electronic or pop",
                "Q3": "folk or pop",
                "Q4": "pop or funk",
                "Q5": "indie or pop",
                "Q6": "pop or rap",
                "Q7": "religious or pop",
                "Q8": "rock or pop",
            }

#adding route for function that take genre as input and returns spotify id
@app.route('/playlist/<string:genreKey>')

def getPlayListId(genreKey):
    options = Options()
    options.headless = True
    options.add_argument("--window-size=1920,1200")

    # DRIVER_PATH = 'chromedriver.exe'
    DRIVER_PATH = "C:/Users/Sai Nikhil Naru/Desktop/chromedriver_win32/chromedriver.exe"
    driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)
    #-----
        #to add way to replace with classic%20.. with actual genre
        #will parse for spaces with %20
    #-----
    driver.get('https://open.spotify.com/search/classic%20pop%27') 
    #hardcoded above for now
    page = driver.page_source
    page_soup = BeautifulSoup(page, 'html.parser')
    playlist_id = ""
    for link in page_soup.find_all('a'):
        if "/playlist/" in str(link.get('href')):
            print("link.get ", str(link.get('href')))
            playlist_id = str(link.get('href'))[
                str(link.get('href')).rfind("/")+1:]
            #print("playlist ID : ",playlist_id)
            return playlist_id

if __name__ == '__main__':
     app.run()