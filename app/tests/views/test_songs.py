from django.test import TestCase
from django.urls import reverse
from app.models import Song
import json


class GetSongsViewTest(TestCase):
    number_of_songs_per_page = 5
    number_of_all_songs = 15

    @classmethod
    def setUpTestData(cls):
        for i in range(cls.number_of_all_songs):
            Song.objects.create(
                song_name=f"song {i}",
                album_id=None,
                genre_id=None,
            )

    def test_get_all_songs_by_url(self):
        """URL指定でgetできるかテスト"""
        response = self.client.get("/songs/")
        self.assertEqual(response.status_code, 200)

    def test_get_all_songs_by_name(self):
        """名前指定でgetできるかテスト"""
        response = self.client.get(reverse("songs"))
        self.assertEqual(response.status_code, 200)

    def test_pagination(self):
        """ページネーションができているかテスト"""
        response = self.client.get("/songs/", {"page": 1})
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["status"], "success")
        self.assertEqual(
            int(data["numPages"]),
            self.number_of_all_songs / self.number_of_songs_per_page,
        )
        self.assertEqual(
            len(data["data"]["getAllSongs"]), self.number_of_songs_per_page
        )


class PostSongsViewTest(TestCase):
    def test_create_song(self):
        """songをpostできるかテスト"""
        response = self.client.post(
            path="/songs/",
            data={
                "song_name": "song",
                "album_name": "album",
                "artist_name": "artist",
                "genre_name": "genre",
            },
            content_type="application/json",
        )
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data["status"], "success")

    def test_cannot_create_song_without_song_name(self):
        """song_nameを指定しない場合、songをpostできないことをテスト"""
        response = self.client.post(
            path="/songs/",
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

    def test_cannot_create_song_with_empty_song_name(self):
        """song_nameが空文字の場合、songをpostできないことをテスト"""
        response = self.client.post(
            path="/songs/",
            data={
                "song_name": "",
                "album_name": "album",
                "artist_name": "artist",
                "genre_name": "genre",
            },
            content_type="application/json",
        )
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data["status"], "fail")

    def test_cannot_create_same_song(self):
        """同一のsongをpostできないことをテスト"""
        for i in range(2):
            response = self.client.post(
                path="/songs/",
                data={
                    "song_name": "song",
                    "album_name": "album",
                    "artist_name": "artist",
                    "genre_name": "genre",
                },
                content_type="application/json",
            )
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data["status"], "fail")
