from django.test import TestCase
from django.urls import reverse
from app.models import Album, Artist
import json, string


class GetLatestAlbumsViewTest(TestCase):
    number_of_all_albums = 15

    @classmethod
    def setUpTestData(cls):
        for i in range(cls.number_of_all_albums):
            Album.objects.create(
                album_name=f"album {string.ascii_uppercase[i]}",
                artist=Artist.objects.create(
                    artist_name=f"artist {string.ascii_uppercase[i]}"
                ),
            )

    def test_get_albums_by_url(self):
        """URL指定でgetできるかテスト"""
        response = self.client.get("/albums/latest/")
        self.assertEqual(response.status_code, 200)

    def test_get_albums_by_name(self):
        """名前指定でgetできるかテスト"""
        response = self.client.get(reverse("latest_albums"))
        self.assertEqual(response.status_code, 200)

    def test_get_albums_with_limit_query_params(self):
        """クエリパラメータとしてlimitを指定し、albumをgetできるかテスト"""
        limit = 10
        response = self.client.get(reverse("latest_albums"), {"limit": limit})
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data["data"]["getLatestAlbums"]), limit)

    def test_get_albums_without_limit_query_params(self):
        """limitを指定しなかった場合でも、albumをgetできるかテスト"""
        response = self.client.get(reverse("latest_albums"))
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data["data"]["getLatestAlbums"]), 5)
