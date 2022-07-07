from django.urls import path
from .views import albums, artists, genres, songs

urlpatterns = [
    path("songs/", songs.songs, name="songs"),
    path("songs/<int:song_id>", songs.single_song, name="single_song"),
    path("songs/search/<str:search_word>", songs.search_songs, name="search_songs"),
    path("albums/", albums.albums, name="albums"),
    path("albums/<int:album_id>", albums.single_album, name="single_album"),
    path("albums/latest/", albums.latest_albums, name="latest_albums"),
    path("artists/", artists.artists, name="artists"),
    path("artists/<int:artist_id>", artists.single_artist, name="single_artist"),
    path("artists/latest/", artists.latest_artists, name="latest_artists"),
    path("genres/", genres.genres, name="genres"),
    path("genres/<int:genre_id>", genres.single_genre, name="single_genre"),
    path("genres/latest/", genres.latest_genres, name="latest_genres"),
]
