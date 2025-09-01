# Sly-Drider
An incredibly basic image slideshow and categorizing app. Rating images via browser moves them to different folders.

The whole thing is a garbage, hard-coded, undocumented, insecure mess. Don't look.

The only semi-interesting performance note to make is that it's faster to randomize a full glob than cast a huge generator as a list and then randomize.  
i.e.  
`Path(random.choice(glob.glob("backend/dump/*"))).name`  
is noticably faster than  
`random.choice(list(Path("backend/dump").glob("*"))).name`
