from django.urls import path
from .views import albums, artists, genres, songs

urlpatterns = [
    path("songs/", songs.songs, name="songs"),
    path("songs/<int:song_id>", songs.single_song, name="single_song"),
    path("albums/", albums.albums, name="albums"),
    path("albums/<int:album_id>", albums.single_album, name="single_album"),
    path("artists/", artists.artists, name="artists"),
    path("artists/<int:artist_id>", artists.single_artist, name="single_artist"),
    path("genres/", genres.genres, name="genres"),
    path("genres/<int:genre_id>", genres.single_genre, name="single_genre"),
]
