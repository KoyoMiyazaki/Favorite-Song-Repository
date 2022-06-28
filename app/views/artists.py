from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Artist
from ..serializers import ArtistSerializer


@api_view(["GET", "POST"])
def artists(request):
    if request.method == "GET":
        try:
            artists = Artist.objects.all()
            serializer = ArtistSerializer(artists, many=True)
            content = {
                "status": "success",
                "data": {"getAllArtists": serializer.data},
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
            artist_name = request.data["artist_name"]
            artist = Artist.objects.create(artist_name=artist_name)
            serializer = ArtistSerializer(artist, many=False)
            content = {
                "status": "success",
                "data": {"createArtist": serializer.data},
            }
            return Response(content, status=status.HTTP_201_CREATED)
        except KeyError:
            content = {
                "status": "fail",
                "message": "artist_name must be required",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            content = {
                "status": "fail",
                "message": f"artist_name: {artist_name} is already exist",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            content = {
                "status": "error",
                "message": "Internal server error",
            }
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET", "PUT", "DELETE"])
def single_artist(request, artist_id):

    try:
        artist = Artist.objects.get(artist_id=artist_id)
    except Artist.DoesNotExist:
        content = {
            "status": "fail",
            "message": f"artist_id: {artist_id} is not found",
        }
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ArtistSerializer(artist, many=False)
        content = {
            "status": "success",
            "data": {"getSingleArtist": serializer.data},
        }
        return Response(content, status=status.HTTP_200_OK)

    if request.method == "PUT":
        try:
            artist_name = request.data["artist_name"]
            artist.artist_name = artist_name
            artist.save()
            serializer = ArtistSerializer(artist, many=False)
            content = {
                "status": "success",
                "data": {"updateArtist": serializer.data},
            }
            return Response(content, status=status.HTTP_200_OK)
        except KeyError:
            content = {
                "status": "fail",
                "message": "artist_name must be required",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            content = {
                "status": "fail",
                "message": f"artist_name: {artist_name} is already exist",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            content = {
                "status": "error",
                "message": "Internal server error",
            }
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == "DELETE":
        artist.delete()
        content = {
            "status": "success",
        }
        return Response(content, status=status.HTTP_200_OK)
