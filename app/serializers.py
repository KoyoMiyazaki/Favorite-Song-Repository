from rest_framework.serializers import ModelSerializer
from .models import Album, Artist, Genre, Song


class AlbumSerializer(ModelSerializer):
    class Meta:
        model = Album
        fields = "__all__"


class ArtistSerializer(ModelSerializer):
    class Meta:
        model = Artist
        fields = "__all__"


class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


class SongSerializer(ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"
        depth = 2
