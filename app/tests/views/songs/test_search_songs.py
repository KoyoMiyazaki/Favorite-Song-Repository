from django.test import TestCase
from django.urls import reverse
from app.models import Song
import json, string


class GetSearchSongsViewTest(TestCase):
    number_of_songs_per_page = 5
    number_of_all_songs = 15

    @classmethod
    def setUpTestData(cls):
        for i in range(cls.number_of_all_songs):
            Song.objects.create(
                song_name=f"song {string.ascii_uppercase[i]}",
                album_id=None,
                genre_id=None,
            )

    def test_get_songs_with_search_word_by_url(self):
        """URL指定でgetできるかテスト"""
        search_word = "song"
        response = self.client.get(f"/songs/search/{search_word}")
        self.assertEqual(response.status_code, 200)

    def test_get_songs_with_search_word_by_name(self):
        """名前指定でgetできるかテスト"""
        search_word = "song"
        response = self.client.get(reverse("search_songs", args=[search_word]))
        self.assertEqual(response.status_code, 200)

    def test_get_any_songs_with_search_word(self):
        """任意のsongをgetできるかテスト"""
        search_word = "song A"
        response = self.client.get(reverse("search_songs", args=[search_word]))
        data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["numData"], 1)
