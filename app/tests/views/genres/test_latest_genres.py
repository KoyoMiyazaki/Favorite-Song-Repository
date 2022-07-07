from django.test import TestCase
from django.urls import reverse
from app.models import Genre
import json, string


class GetLatestGenresViewTest(TestCase):
    number_of_all_genres = 15

    @classmethod
    def setUpTestData(cls):
        for i in range(cls.number_of_all_genres):
            Genre.objects.create(
                genre_name=f"genre {string.ascii_uppercase[i]}",
            )

    def test_get_genres_by_url(self):
        """URL指定でgetできるかテスト"""
        response = self.client.get("/genres/latest/")
        self.assertEqual(response.status_code, 200)

    def test_get_genres_by_name(self):
        """名前指定でgetできるかテスト"""
        response = self.client.get(reverse("latest_genres"))
        self.assertEqual(response.status_code, 200)

    def test_get_genres_with_limit_query_params(self):
        """クエリパラメータとしてlimitを指定し、genreをgetできるかテスト"""
        limit = 10
        response = self.client.get(reverse("latest_genres"), {"limit": limit})
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data["data"]["getLatestGenres"]), limit)

    def test_get_genres_without_limit_query_params(self):
        """limitを指定しなかった場合でも、genreをgetできるかテスト"""
        response = self.client.get(reverse("latest_genres"))
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data["data"]["getLatestGenres"]), 5)
