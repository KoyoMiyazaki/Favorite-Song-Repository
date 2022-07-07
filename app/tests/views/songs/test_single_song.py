from django.test import TestCase
from django.urls import reverse
from app.models import Album, Artist, Genre, Song
import json


class GetSingleSongViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.song = Song.objects.create(
            song_name="song",
            album=None,
            genre=None,
        )

    def test_get_single_song_by_url(self):
        """URL指定でgetできるかテスト"""
        response = self.client.get(f"/songs/{self.song.song_id}")
        self.assertEqual(response.status_code, 200)

    def test_get_single_song_by_name(self):
        """名前指定でgetできるかテスト"""
        response = self.client.get(reverse("single_song", args=[self.song.song_id]))
        self.assertEqual(response.status_code, 200)

    def test_cannot_get_single_song_with_not_exist_song_id(self):
        """存在しないsong_idを指定して、getできないことをテスト"""
        response = self.client.get(reverse("single_song", args=[100]))
        self.assertEqual(response.status_code, 404)


class PutSingleSongViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        album1 = Album.objects.create(
            album_name="album1", artist=Artist.objects.create(artist_name="artist1")
        )
        album2 = Album.objects.create(
            album_name="album2", artist=Artist.objects.create(artist_name="artist2")
        )
        cls.song1 = Song.objects.create(
            song_name="song1",
            album=album1,
            genre=Genre.objects.create(genre_name="genre1"),
        )
        cls.song2 = Song.objects.create(
            song_name="song2",
            album=album2,
            genre=Genre.objects.create(genre_name="genre2"),
        )

    def test_update_single_song(self):
        """既存のsongをputできるかテスト"""
        response = self.client.put(
            path=f"/songs/{self.song1.song_id}",
            data={
                "song_name": "song(updated)",
                "album_name": "album(updated)",
                "artist_name": "artist(updated)",
                "genre_name": "genre(updated)",
            },
            content_type="application/json",
        )
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["status"], "success")

    def test_cannot_update_single_song_without_song_name(self):
        """song_nameを指定しない場合、putできないことをテスト"""
        response = self.client.put(
            path=f"/songs/{self.song1.song_id}",
            data={
                "album_name": "album",
                "artist_name": "artist",
                "genre_name": "genre",
            },
            content_type="application/json",
        )
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data["status"], "fail")

    def test_cannot_update_single_song(self):
        """既に存在するsongと同じsongにputできないことをテスト"""
        response = self.client.put(
            path=f"/songs/{self.song2.song_id}",
            data={
                "song_name": "song1",
                "album_name": "album1",
                "artist_name": "artist1",
                "genre_name": "genre1",
            },
            content_type="application/json",
        )
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data["status"], "fail")


class DeleteSingleSongViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.song = Song.objects.create(
            song_name="song",
            album=None,
            genre=None,
        )

    def test_delete_single_song(self):
        """既存のsongをdeleteできるかテスト"""
        response = self.client.delete(
            path=f"/songs/{self.song.song_id}",
            content_type="application/json",
        )
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["status"], "success")
