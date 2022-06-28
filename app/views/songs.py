from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Album, Genre, Song
from ..serializers import SongSerializer


@api_view(["GET", "POST"])
def songs(request):
    if request.method == "GET":
        try:
            songs = Song.objects.all()
            serializer = SongSerializer(songs, many=True)
            content = {
                "status": "success",
                "data": {"getAllSongs": serializer.data},
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
            genre_name = request.data["genre_name"]
            album = Album.objects.get(album_name=album_name)
            genre = Genre.objects.get(genre_name=genre_name)

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
            song.song_name = song_name
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
