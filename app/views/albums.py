from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Album, Artist
from ..serializers import AlbumSerializer


@api_view(["GET", "POST"])
def albums(request):
    if request.method == "GET":
        try:
            albums = Album.objects.all()
            serializer = AlbumSerializer(albums, many=True)
            content = {
                "status": "success",
                "data": {"getAllAlbums": serializer.data},
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
            album_name = request.data["album_name"]
            artist_name = request.data["artist_name"]
            artist = Artist.objects.get(artist_name=artist_name)
            album = Album.objects.create(album_name=album_name, artist_id=artist)
            serializer = AlbumSerializer(album, many=False)
            content = {
                "status": "success",
                "data": {"createAlbum": serializer.data},
            }
            return Response(content, status=status.HTTP_201_CREATED)
        except KeyError:
            content = {
                "status": "fail",
                "message": "album_name and artist_name must be required",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            content = {
                "status": "fail",
                "message": f"A pair of album_name: {album_name} and artist_name: {artist_name} is already exist",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Artist.DoesNotExist:
            content = {
                "status": "fail",
                "message": f"artist_name: {artist_name} is not found",
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            content = {
                "status": "error",
                "message": "Internal server error",
            }
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET", "PUT", "DELETE"])
def single_album(request, album_id):

    try:
        album = Album.objects.get(album_id=album_id)
    except Album.DoesNotExist:
        content = {
            "status": "fail",
            "message": f"album_id: {album_id} is not found",
        }
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = AlbumSerializer(album, many=False)
        content = {
            "status": "success",
            "data": {"getSingleAlbum": serializer.data},
        }
        return Response(content, status=status.HTTP_200_OK)

    if request.method == "PUT":
        try:
            album_name = request.data["album_name"]
            album.album_name = album_name
            album.save()
            serializer = AlbumSerializer(album, many=False)
            content = {
                "status": "success",
                "data": {"updateAlbum": serializer.data},
            }
            return Response(content, status=status.HTTP_200_OK)
        except KeyError:
            content = {
                "status": "fail",
                "message": "album_name must be required",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            content = {
                "status": "fail",
                "message": f"album_name: {album_name} is already exist",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            content = {
                "status": "error",
                "message": "Internal server error",
            }
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == "DELETE":
        album.delete()
        content = {
            "status": "success",
        }
        return Response(content, status=status.HTTP_200_OK)
