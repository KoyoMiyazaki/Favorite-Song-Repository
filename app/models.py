from django.db import models
from django.db.models.functions import Length

models.CharField.register_lookup(Length)


class Genre(models.Model):
    genre_id = models.AutoField(primary_key=True)
    genre_name = models.CharField(max_length=255, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "genre"
        verbose_name_plural = "Genre"
        constraints = [
            models.UniqueConstraint(
                fields=["genre_name"], name="genre_unique_constraint"
            )
        ]

    def __str__(self):
        return self.genre_name


class Artist(models.Model):
    artist_id = models.AutoField(primary_key=True)
    artist_name = models.CharField(max_length=255, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "artist"
        verbose_name_plural = "Artist"
        constraints = [
            models.UniqueConstraint(
                fields=["artist_name"], name="artist_unique_constraint"
            ),
        ]

    def __str__(self):
        return self.artist_name


class Album(models.Model):
    album_id = models.AutoField(primary_key=True)
    album_name = models.CharField(max_length=255, null=False, blank=False)
    artist = models.ForeignKey(
        Artist,
        on_delete=models.DO_NOTHING,
        null=False,
        db_column="artist_id",
        to_field="artist_id",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "album"
        verbose_name_plural = "Album"
        constraints = [
            models.UniqueConstraint(
                fields=["album_name", "artist_id"], name="album_unique_constraint"
            )
        ]

    def __str__(self):
        return self.album_name


class Song(models.Model):
    song_id = models.AutoField(primary_key=True)
    song_name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )
    album = models.ForeignKey(
        Album,
        on_delete=models.DO_NOTHING,
        null=True,
        db_column="album_id",
        to_field="album_id",
    )
    genre = models.ForeignKey(
        Genre,
        on_delete=models.DO_NOTHING,
        null=True,
        db_column="genre_id",
        to_field="genre_id",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "song"
        verbose_name_plural = "Song"
        constraints = [
            models.UniqueConstraint(
                fields=["song_name", "album_id"], name="song_unique_constraint"
            ),
            models.CheckConstraint(
                check=models.Q(song_name__length__gt=0),
                name="song_check_constraint",
            ),
        ]

    def __str__(self):
        return self.song_name
