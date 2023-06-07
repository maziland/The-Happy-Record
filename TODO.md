# TODO

Lists of TODO's based on category

## Controllers

* Handle /album/<id> endpoint

## Frontend

* Grab svg icons from `https://icons8.com/icons/set/cart`

* Finish designing Navbar and home page

* 

* Add clicking on album capability to display extra info (tracklist and geners)

* Add filtering by price, genre


## Database

* Add track list and genres of each Album from `https://musicbrainz.org/` and from `AllMusic.com`
```bash
# Fetch release-group id using the musicbrainz API
curl -k -s "https://musicbrainz.org/ws/2/release-group/?query=album:Please%20Hammer%20Don't%20Hurt%20'Em&fmt=json&limit=1" | jq '.["release-groups"][] | {id,title,artist: .["artist-credit"][0].artist.name}'

# Get AllMusic link from release group
curl -k -s https://musicbrainz.org/release-group/4a076697-3fb1-31fa-aad8-60fc3d93e3ca | grep -i "external links"

# Parse Track list and add to DB
```

## Docker

* Create a docker file for the app 