import re
import time
import urllib.request as ur
import psycopg2
import requests
from bs4 import BeautifulSoup

DB_NAME = "wesbcdcw"
DB_USER = "wesbcdcw"
DB_PASS = "K0eRtBbOQ92yDaj6pK1mJsuJ_OavjzOZ"
DB_HOST = "lallah.db.elephantsql.com"
DB_PORT = "5432"

data = []           # used to sort between country and university <td> tags
links = []          # stores links from clicking on the university name and used to get genres

countries = []      # indices match for these 4 lists
universities = []   #
spotifyLinks = []   #
fontSizes = []      #

genres = [[]]       # indices match for these 2 lists
weights = [[]]      #

country = []        # Main Genres used for Sub-Genre categorization
electronic = []     #
folk = []           #
funk = []           #
indie = []          #
pop = []            #
rap = []            #
religious = []      #
rock = []           #
misc = []           #


page = requests.get("http://everynoise.com/everyschool.cgi")    # stores response from Every Noise into page
soup = BeautifulSoup(page.content, 'html.parser')   # used to create data list
soup1 = BeautifulSoup(page.content, 'html.parser')  # usied to create links and spotifyLinks lists

soupList = list(soup.find_all('td', class_="note")) # creates list of <td> tags where class="note"

for soup in soupList:                   #
    if not soup.get_text().isnumeric(): # stores all country and university names in data list
        data.append(soup.get_text())    #

for i in range(len(data)):              #
    if i%2==0:                          # separates data list into two individual lists
        countries.append(data[i])       # for country and university names respectively
    else:                               #
        universities.append(data[i])    #

for a in soup1.find_all('a', attrs={'href': re.compile("\?root=")}):    # finding/creating university links
    links.append('http://everynoise.com/everyschool.cgi' + a['href'])   #

for a in soup1.find_all('a', attrs={'href': re.compile("spotify:playlist:")}):  # finding/creating spotify links
    spotifyLinks.append('https://open.spotify.com/playlist/' + a['href'][17:])  #

spotifyLinks = spotifyLinks[:-1] # trimming spotifyLinks list

linkSubset = links[0:4] # subset of links for quicker testing
j=1

for link in linkSubset: # switch out linkSubset with links for full dataset
    time.sleep(1)   # so we don't spam their servers
    schoolGenres = []
    genreWeights = []
    page = ur.urlopen(url=link)
    nextPage = page.read()
    bs_obj = BeautifulSoup(nextPage, "html.parser")

    for a in bs_obj.find_all('a', attrs={'href': re.compile("^engenremap-")}):
        schoolGenres.append(a.get_text()) # grabbing current school's genres

    pattern = re.compile(r'font-size: (\d+)')

    for a in bs_obj.select('div[style*="font-size"]'):
        genreWeights.append(int(pattern.search(str(a)).group(1))) # grabbing genre weights

    weights.append(genreWeights)
    genres.append(schoolGenres)

    print("\nScraping...", j)
    j=j+1

    print("Genres: ", schoolGenres)
    print("Genre Weights: ", genreWeights)

genres = genres[1:]     # trimming genres and weights lists
weights = weights[1:]   #

print("\nAll Weights: ", weights)

distinct_genres = set() # used 'set' data struct because forces unique elements

for genre in genres: # adding genres to distinct_genres set
    distinct_genres.update(genre)

distinct_genres_list = list(distinct_genres) # cast set to list so it us indexed

for genre in distinct_genres_list: # Sub-Genre Categorization
    categorized = False
    if any(ele in genre for ele in ['country', 'red', 'americana']):
        country.append(genre)
        categorized = True
    if any(ele in genre for ele in ['electronic', 'edm', 'rave', 'dub', 'step', 'bass', 'house', 'break', 'vapor', 'synth']):
        electronic.append(genre)
        categorized = True
    if any(ele in genre for ele in ['folk', 'oyun']):
        folk.append(genre)
        categorized = True
    if any(ele in genre for ele in ['funk']):
        funk.append(genre)
        categorized = True
    if any(ele in genre for ele in ['indie', 'songwriter']):
        indie.append(genre)
        categorized = True
    if any(ele in genre for ele in ['pop', 'r&b', 'boy band', 'songwriter']):
        pop.append(genre)
        categorized = True
    if any(ele in genre for ele in ['rap', 'hip hop', 'hip-hop', 'r&b', 'reggaeton', 'perreo']):
        rap.append(genre)
        categorized = True
    if any(ele in genre for ele in ['religious', 'christian', 'worship', 'islamic', 'sikh', 'jewish', 'hindu']):
        religious.append(genre)
        categorized = True
    if any(ele in genre for ele in ['rock', 'punk', 'metal', 'alternative', 'core', 'grunge', 'emo', 'ska', 'psych']):
        rock.append(genre)
        categorized = True
    if genre not in misc and not categorized:
        misc.append(genre)

print("\nCountry Genres: ", country)
print("\nElectronic Genres: ", electronic)
print("\nFolk Genres: ", folk)
print("\nFunk Genres: ", funk)
print("\nIndie Genres: ", indie)
print("\nPop Genres: ", pop)
print("\nRap Genres: ", rap)
print("\nReligious Genres: ", religious)
print("\nRock Genres: ", rock)
print("\nMiscellaneous Genres: ", misc)


print("\n\nDistinct Genres:", distinct_genres_list)

print("\nTest University Number 3: ")
print("Country:", countries[2])
print("University:", universities[2])
print("Playlist Link:", spotifyLinks[2])
print("Genres:", genres[2])
print("Weights:", weights[2])

print("\nConnecting to postgres database...")

conn = psycopg2.connect(database=DB_NAME, user=DB_USER,
        password=DB_PASS, host=DB_HOST, port=DB_PORT)

print("Database connected successfully!")

cur = conn.cursor()

# cur.execute("""
#
# CREATE TABLE Universities
# (
# ID INT PRIMARY KEY NOT NULL,
# NAME TEXT NOT NULL,
# COUNTRY TEXT NOT NULL,
# SPOTIFYLINK TEXT NOT NULL
# )
#
# """)
#
# conn.commit()
# print("Table created successfully!")
#
# key=1
# index=0
#
# for university in universities:
#     cur.execute('''INSERT INTO universities(ID, NAME, COUNTRY, SPOTIFYLINK)
#     VALUES (%s, %s, %s, %s)''', [key, universities[index], countries[index], spotifyLinks[index]])
#     print "Inserted:", key
#     key=key+1
#     index=index+1
#
# conn.commit()
#
# print("Full data inserted successfully!")
#
# cur.execute("""
#
# CREATE TABLE All_Genres
# (
# GENRE_ID INT PRIMARY KEY NOT NULL,
# GENRE_NAME TEXT NOT NULL
# )
#
# """)
#
# conn.commit()
# print("Table created successfully!")
#
# key=1
# index=0
#
# for distinct_genre in distinct_genres_list:
#     cur.execute('''INSERT INTO all_genres(GENRE_ID, GENRE_NAME)
#     VALUES (%s, %s)''', (key, distinct_genres_list[index]))
#     print("Inserted:", key)
#     key=key+1
#     index=index+1
#
# conn.commit()
#
# print("Full data inserted successfully!")

conn.close()
print("Disconnected from database!")
