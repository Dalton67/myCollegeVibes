import re
import sys
import time
import urllib.request as ur
import psycopg2
import requests
from bs4 import BeautifulSoup

DB_NAME = ""
DB_USER = ""
DB_PASS = ""
DB_HOST = ""
DB_PORT = ""

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

num_to_scrape = 5   # Number of links to scrape/parse: len(universities) for all

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

linkSubset = links[0:num_to_scrape] # subset of links for quicker testing
j=1

for link in links: # switch out linkSubset with links for full dataset
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

print("\nConnecting to postgres database...")

conn = psycopg2.connect(database=DB_NAME, user=DB_USER,
        password=DB_PASS, host=DB_HOST, port=DB_PORT)

print("\nDatabase connected successfully!")

cur = conn.cursor()

cur.execute("""
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS electronic;
DROP TABLE IF EXISTS folk;
DROP TABLE IF EXISTS funk;
DROP TABLE IF EXISTS indie;
DROP TABLE IF EXISTS miscellaneous;
DROP TABLE IF EXISTS pop;
DROP TABLE IF EXISTS rap;
DROP TABLE IF EXISTS religious;
DROP TABLE IF EXISTS rock;
DROP TABLE IF EXISTS university_genres;
DROP TABLE IF EXISTS all_genres;
DROP TABLE IF EXISTS universities;
""")

conn.commit()

cur.execute("""

CREATE TABLE universities
(
university_id INT PRIMARY KEY NOT NULL,
name TEXT NOT NULL,
country TEXT NOT NULL,
spotify_link TEXT NOT NULL
)

""")

conn.commit()

print("universities table created successfully!")

key=1
index=0

for university in universities:
    try:
        cur.execute('''INSERT INTO universities(university_id, name, country, spotify_link)
        VALUES (%s, %s, %s, %s)''', [key, universities[index], countries[index], spotifyLinks[index]])
        print("\nUniversity Inserted: ", universities[index], key)
        conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR Saving {university} to database.')
        conn.rollback()
    key=key+1
    index=index+1

print("universities table data inserted successfully!")

cur.execute("""

CREATE TABLE all_genres
(
genre_id INT PRIMARY KEY NOT NULL,
genre_name TEXT NOT NULL
)

""")

conn.commit()

print("all_genres table created successfully!")

key=1

for distinct_genre in distinct_genres_list:
    try:
        cur.execute('''INSERT INTO all_genres(genre_id, genre_name)
        VALUES (%s, %s)''', (key, distinct_genre))
        print("Inserted:", distinct_genre, key)
        conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR Saving {genre} for {university}')
        conn.rollback()
    key=key+1

print("all_genres table data inserted successfully!")


cur.execute("""

CREATE TABLE university_genres
(
university_id INT NOT NULL,
genre_id INT NOT NULL,
PRIMARY KEY(university_id, genre_id),
FOREIGN KEY (university_id) REFERENCES universities(university_id) ON UPDATE CASCADE,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE,
popularity INT NOT NULL
)

""")

conn.commit()

print("university_genres table created successfully!")

max=num_to_scrape # len(universities)

for x in range(0, len(universities)):
    try:
        university = universities[x]
        print(university)
        u_genres = genres[x]
        u_weights = weights[x]
        for y in range(0, len(u_genres)):
            # for genre in genre_list:
            genre = u_genres[y]
            weight = u_weights[y]
            cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
            result = cur.fetchone()
            if result != None:
                g_id = result[0]
                # print(g_id, genre)
                # print(type(g_id))
                try:
                    cur.execute('''INSERT INTO university_genres(university_id, genre_id, popularity)
                    VALUES (%s, %s, %s)''', (x+1, g_id, weight))
                    conn.commit()
                    print(f'Inserted {genre} for {university} into university_genres table.')
                except psycopg2.DatabaseError as e:
                    print(f'ERROR Saving {genre} for {university}')
                    conn.rollback()
    except:
        print(sys.exc_info()[0])

print("\nuniversity_genres table data inserted successfully!")

# Country Genre Table
cur.execute("""
CREATE TABLE country
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("country genre table created successfully!")

for genre in country:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO country(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into country genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into country genre table.')
        conn.rollback()

print("country genre table data inserted successfully!")

# Electronic Genre Table
cur.execute("""
CREATE TABLE electronic
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("electronic genre table created successfully!")

for genre in electronic:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO electronic(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into electronic genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into electronic genre table.')
        conn.rollback()

print("electronic genre table data inserted successfully!")

# Folk Genre Table
cur.execute("""
CREATE TABLE folk
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("folk genre table created successfully!")

for genre in folk:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO folk(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into folk genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into folk genre table.')
        conn.rollback()

print("folk genre table data inserted successfully!")

# Funk Genre Table
cur.execute("""
CREATE TABLE funk
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("funk genre table created successfully!")

for genre in funk:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO funk(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into funk genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into funk genre table.')
        conn.rollback()

print("funk genre table data inserted successfully!")

# Indie Genre Table
cur.execute("""
CREATE TABLE indie
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("indie genre table created successfully!")

for genre in indie:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO indie(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into indie genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into indie genre table.')
        conn.rollback()

print("indie genre table data inserted successfully!")

# Pop Genre Table
cur.execute("""
CREATE TABLE pop
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("pop genre table created successfully!")

for genre in pop:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO pop(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into pop genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into pop genre table.')
        conn.rollback()

print("pop genre table data inserted successfully!")

# Rap Genre Table
cur.execute("""
CREATE TABLE rap
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("rap genre table created successfully!")

for genre in rap:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO rap(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into rap genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into rap genre table.')
        conn.rollback()

print("rap genre table data inserted successfully!")

# Religious Genre Table
cur.execute("""
CREATE TABLE religious
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("religious genre table created successfully!")

for genre in religious:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO religious(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into religious genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into religious genre table.')
        conn.rollback()

print("religious genre table data inserted successfully!")

# Rock Genre Table
cur.execute("""
CREATE TABLE rock
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("rock genre table created successfully!")

for genre in rock:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO rock(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into rock genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into rock genre table.')
        conn.rollback()

print("rock genre table data inserted successfully!")

# Miscellaneous Genre Table
cur.execute("""
CREATE TABLE miscellaneous
(
genre_id INT NOT NULL,
genre_name TEXT NOT NULL,
FOREIGN KEY (genre_id) REFERENCES all_genres(genre_id) ON UPDATE CASCADE
)
""")

conn.commit()

print("miscellaneous genre table created successfully!")

for genre in misc:
    try:
        cur.execute(f'SELECT genre_id FROM all_genres WHERE genre_name = \'{genre}\'')
        result = cur.fetchone()
        if result != None:
            g_id = result[0]
            cur.execute('''INSERT INTO miscellaneous(genre_id, genre_name)
            VALUES (%s, %s)''', (g_id, genre))
            print(f'Inserted {genre} into miscellaneous genre table.')
            conn.commit()
    except psycopg2.DatabaseError as e:
        print(f'ERROR inserting {genre} into miscellaneous genre table.')
        conn.rollback()

print("miscellaneous genre table data inserted successfully!")

print("\nFull data inserted successfully!")

conn.close()
print("\nDisconnected from database!")
