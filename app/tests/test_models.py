from django.test import TestCase
from django.db.utils import DataError, IntegrityError
from app.models import Album, Artist, Genre, Song


class SongModelTest(TestCase):
    def test_create_with_song_name(self):
        """song_name 有りでsongが作成できるかテスト"""
        Song.objects.create(
            song_name="song",
        )
        saved_songs = Song.objects.all()
        self.assertEqual(saved_songs.count(), 1)

    def test_create_with_empty_song_name(self):
        """song_name が空文字の場合、songが作成できないことをテスト"""
        with self.assertRaises(IntegrityError):
            Song.objects.create()

    def test_create_with_song_name_contains_many_letters(self):
        """song_name の文字数が多い場合(256文字以上)、songが作成できないことをテスト"""
        with self.assertRaises(DataError) as err:
            Song.objects.create(
                song_name="a" * 256,
            )

    def test_create_with_null_song_name(self):
        """song_name がNone(null)の場合、songが作成できないことをテスト"""
        with self.assertRaises(IntegrityError):
            Song.objects.create(song_name=None)

    def test_create_different_songs(self):
        """異なるsongオブジェクトが作成できることをテスト"""
        album1 = Album.objects.create(
            album_name="album1", artist=Artist.objects.create(artist_name="artist1")
        )
        album2 = Album.objects.create(
            album_name="album2", artist=Artist.objects.create(artist_name="artist2")
        )
        Song.objects.create(
            song_name="song1",
            album=album1,
        )
        Song.objects.create(
            song_name="song2",
            album=album2,
        )
        saved_songs = Song.objects.all()
        self.assertEqual(saved_songs.count(), 2)

    def test_create_same_songs(self):
        """同一songオブジェクトが作成できないことをテスト"""
        album1 = Album.objects.create(
            album_name="album1", artist=Artist.objects.create(artist_name="artist1")
        )
        with self.assertRaises(IntegrityError):
            for i in range(2):
                Song.objects.create(
                    song_name="test",
                    album=album1,
                )


class AlbumModelTest(TestCase):
    def test_create_with_album_name_and_artist(self):
        """album_name, artist 有りでalbumが作成できるかテスト"""
        Album.objects.create(
            album_name="album",
            artist=Artist.objects.create(artist_name="artist"),
        )
        saved_albums = Album.objects.all()
        self.assertEqual(saved_albums.count(), 1)

    def test_create_with_null_album_name_and_any_artist(self):
        """album_name がNone(null)で、artist が指定されている場合、albumが作成できないことをテスト"""
        with self.assertRaises(IntegrityError):
            Album.objects.create(
                album_name=None,
                artist=Artist.objects.create(artist_name="artist"),
            )

    def test_create_with_any_album_name_and_null_artist(self):
        """album_name が指定されており、artist がNone(null)の場合、albumが作成できないことをテスト"""
        with self.assertRaises(IntegrityError):
            Album.objects.create(
                album_name="album",
                artist=None,
            )

    def test_create_with_album_name_contains_many_letters(self):
        """album_name の文字数が多い場合(256文字以上)、albumが作成できないことをテスト"""
        with self.assertRaises(DataError) as err:
            Album.objects.create(
                album_name="a" * 256,
            )

    def test_create_different_albums(self):
        """異なるalbumオブジェクトが作成できることをテスト"""
        Album.objects.create(
            album_name="album1", artist=Artist.objects.create(artist_name="artist1")
        )
        Album.objects.create(
            album_name="album2", artist=Artist.objects.create(artist_name="artist2")
        )

        saved_albums = Album.objects.all()
        self.assertEqual(saved_albums.count(), 2)

    def test_create_same_albums(self):
        """同一albumオブジェクトが作成できないことをテスト"""
        with self.assertRaises(IntegrityError):
            for i in range(2):
                Album.objects.create(
                    album_name="album1",
                    artist=Artist.objects.create(artist_name="artist1"),
                )


class ArtistModelTest(TestCase):
    def test_create_with_artist_name(self):
        """artist_name 有りでartistが作成できるかテスト"""
        Artist.objects.create(
            artist_name="artist",
        )
        saved_artists = Artist.objects.all()
        self.assertEqual(saved_artists.count(), 1)

    def test_create_with_null_artist_name(self):
        """artist_name がNone(null)の場合、artistが作成できないことをテスト"""
        with self.assertRaises(IntegrityError):
            Artist.objects.create(
                artist_name=None,
            )

    def test_create_with_artist_name_contains_many_letters(self):
        """artist_name の文字数が多い場合(256文字以上)、artistが作成できないことをテスト"""
        with self.assertRaises(DataError) as err:
            Artist.objects.create(
                artist_name="a" * 256,
            )

    def test_create_different_artists(self):
        """異なるartistオブジェクトが作成できることをテスト"""
        Artist.objects.create(artist_name="artist1")
        Artist.objects.create(artist_name="artist2")

        saved_artists = Artist.objects.all()
        self.assertEqual(saved_artists.count(), 2)

    def test_create_same_artists(self):
        """同一artistオブジェクトが作成できないことをテスト"""
        with self.assertRaises(IntegrityError):
            for i in range(2):
                Artist.objects.create(
                    artist_name="artist1",
                )


class GenreModelTest(TestCase):
    def test_create_with_genre_name(self):
        """genre_name 有りでgenreが作成できるかテスト"""
        Genre.objects.create(
            genre_name="genre",
        )
        saved_genres = Genre.objects.all()
        self.assertEqual(saved_genres.count(), 1)

    def test_create_with_null_genre_name(self):
        """genre_name がNone(null)の場合、genreが作成できないことをテスト"""
        with self.assertRaises(IntegrityError):
            Genre.objects.create(
                genre_name=None,
            )

    def test_create_with_genre_name_contains_many_letters(self):
        """genre_name の文字数が多い場合(256文字以上)、genreが作成できないことをテスト"""
        with self.assertRaises(DataError) as err:
            Genre.objects.create(
                genre_name="a" * 256,
            )

    def test_create_different_genres(self):
        """異なるgenreオブジェクトが作成できることをテスト"""
        Genre.objects.create(genre_name="genre1")
        Genre.objects.create(genre_name="genre2")

        saved_genres = Genre.objects.all()
        self.assertEqual(saved_genres.count(), 2)

    def test_create_same_genres(self):
        """同一genreオブジェクトが作成できないことをテスト"""
        with self.assertRaises(IntegrityError):
            for i in range(2):
                Genre.objects.create(
                    genre_name="genre1",
                )
