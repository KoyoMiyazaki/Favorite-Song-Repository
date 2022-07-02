from django.db.utils import IntegrityError
from django.core.paginator import Paginator
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Album, Artist, Genre, Song
from ..serializers import SongSerializer


@api_view(["GET", "POST"])
def songs(request):
    if request.method == "GET":
        try:
            songs = Song.objects.select_related("album_id", "genre_id").order_by(
                "-updated_at", "song_name"
            )
            paginator = Paginator(songs, 5)
            page_number = request.GET.get("page")
            paginated_songs = paginator.get_page(page_number)

            serializer = SongSerializer(paginated_songs, many=True)
            content = {
                "status": "success",
                "data": {"getAllSongs": serializer.data},
                "numPages": paginator.num_pages,
            }
            return Response(content, status=status.HTTP_200_OK)

        except Exception:
            content = {
                "status": "error",
                "message": "Internal server error",
            }
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == "POST":
        try:
            song_name = request.data["song_name"]
            album_name = request.data["album_name"]
            artist_name = request.data["artist_name"]
            genre_name = request.data["genre_name"]

            genre, created = Genre.objects.get_or_create(genre_name=genre_name)
            artist, created = Artist.objects.get_or_create(artist_name=artist_name)
            album, created = Album.objects.get_or_create(
                album_name=album_name, artist_id=artist
            )
            song = Song.objects.create(
                song_name=song_name, album_id=album, genre_id=genre
            )

            serializer = SongSerializer(song, many=False)
            content = {
                "status": "success",
                "data": {"createSong": serializer.data},
            }
            return Response(content, status=status.HTTP_201_CREATED)
        except KeyError:
            content = {
                "status": "fail",
                "message": "song_name must be required",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            content = {
                "status": "fail",
                "message": f"A pair of song_name: {song_name} and album_name: {album_name} is already exist",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        # except Album.DoesNotExist:
        #     content = {
        #         "status": "fail",
        #         "message": f"album_name: {album_name} is not found",
        #     }
        #     return Response(content, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            content = {
                "status": "error",
                "message": "Internal server error",
            }
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET", "PUT", "DELETE"])
def single_song(request, song_id):

    try:
        song = Song.objects.get(song_id=song_id)
    except Song.DoesNotExist:
        content = {
            "status": "fail",
            "message": f"song_id: {song_id} is not found",
        }
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = SongSerializer(song, many=False)
        content = {
            "status": "success",
            "data": {"getSingleSong": serializer.data},
        }
        return Response(content, status=status.HTTP_200_OK)

    if request.method == "PUT":
        try:
            song_name = request.data["song_name"]
            album_name = request.data["album_name"]
            artist_name = request.data["artist_name"]
            genre_name = request.data["genre_name"]

            genre, created = Genre.objects.get_or_create(genre_name=genre_name)
            artist, created = Artist.objects.get_or_create(artist_name=artist_name)
            album, created = Album.objects.get_or_create(
                album_name=album_name, artist_id=artist
            )
            song.song_name = song_name
            song.genre_id = genre
            song.album_id = album
            song.save()

            serializer = SongSerializer(song, many=False)
            content = {
                "status": "success",
                "data": {"updateSong": serializer.data},
            }
            return Response(content, status=status.HTTP_200_OK)
        except KeyError:
            content = {
                "status": "fail",
                "message": "song_name must be required",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            content = {
                "status": "fail",
                "message": f"song_name: {song_name} is already exist",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            content = {
                "status": "error",
                "message": "Internal server error",
            }
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == "DELETE":
        song.delete()
        content = {
            "status": "success",
        }
        return Response(content, status=status.HTTP_200_OK)
