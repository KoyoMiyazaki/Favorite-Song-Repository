from django.test import TestCase
from django.urls import reverse
from app.models import Artist
import json, string


class GetLatestArtistsViewTest(TestCase):
    number_of_all_artists = 15

    @classmethod
    def setUpTestData(cls):
        for i in range(cls.number_of_all_artists):
            Artist.objects.create(
                artist_name=f"artist {string.ascii_uppercase[i]}",
            )

    def test_get_artists_by_url(self):
        """URL指定でgetできるかテスト"""
        response = self.client.get("/artists/latest/")
        self.assertEqual(response.status_code, 200)

    def test_get_artists_by_name(self):
        """名前指定でgetできるかテスト"""
        response = self.client.get(reverse("latest_artists"))
        self.assertEqual(response.status_code, 200)

    def test_get_artists_with_limit_query_params(self):
        """クエリパラメータとしてlimitを指定し、artistをgetできるかテスト"""
        limit = 10
        response = self.client.get(reverse("latest_artists"), {"limit": limit})
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data["data"]["getLatestArtists"]), limit)

    def test_get_artists_without_limit_query_params(self):
        """limitを指定しなかった場合でも、artistをgetできるかテスト"""
        response = self.client.get(reverse("latest_artists"))
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data["data"]["getLatestArtists"]), 5)
