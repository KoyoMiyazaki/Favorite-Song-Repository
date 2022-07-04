from django.test import TestCase
from django.urls import reverse, resolve
from app.views import albums, artists, genres, songs


class UrlsTest(TestCase):
    def test_songs_url(self):
        """songs URL のテスト"""
        view = resolve("/songs/")
        self.assertEqual(view.func, songs.songs)

    def test_single_song_url(self):
        """single_song URL のテスト"""
        view = resolve("/songs/1")
        self.assertEqual(view.func, songs.single_song)

    def test_albums_url(self):
        """albums URL のテスト"""
        view = resolve("/albums/")
        self.assertEqual(view.func, albums.albums)

    def test_single_album_url(self):
        """single_album URL のテスト"""
        view = resolve("/albums/1")
        self.assertEqual(view.func, albums.single_album)

    def test_artists_url(self):
        """artists URL のテスト"""
        view = resolve("/artists/")
        self.assertEqual(view.func, artists.artists)

    def test_single_artist_url(self):
        """single_artist URL のテスト"""
        view = resolve("/artists/1")
        self.assertEqual(view.func, artists.single_artist)

    def test_genres_url(self):
        """genres URL のテスト"""
        view = resolve("/genres/")
        self.assertEqual(view.func, genres.genres)

    def test_single_genre_url(self):
        """single_genre URL のテスト"""
        view = resolve("/genres/1")
        self.assertEqual(view.func, genres.single_genre)
