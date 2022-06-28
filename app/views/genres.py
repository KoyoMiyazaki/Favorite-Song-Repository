from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.utils import IntegrityError
from ..models import Genre
from ..serializers import GenreSerializer


@api_view(["GET", "POST"])
def genres(request):
    if request.method == "GET":
        try:
            genres = Genre.objects.all()
            serializer = GenreSerializer(genres, many=True)
            content = {
                "status": "success",
                "data": {"getAllGenres": serializer.data},
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
            genre_name = request.data["genre_name"]
            genre = Genre.objects.create(genre_name=genre_name)
            serializer = GenreSerializer(genre, many=False)
            content = {
                "status": "success",
                "data": {"createGenre": serializer.data},
            }
            return Response(content, status=status.HTTP_201_CREATED)
        except KeyError:
            content = {
                "status": "fail",
                "message": "genre_name must be required",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            content = {
                "status": "fail",
                "message": f"genre_name: {genre_name} is already exist",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            content = {
                "status": "error",
                "message": "Internal server error",
            }
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET", "PUT", "DELETE"])
def single_genre(request, genre_id):

    try:
        genre = Genre.objects.get(genre_id=genre_id)
    except Genre.DoesNotExist:
        content = {
            "status": "fail",
            "message": f"genre_id: {genre_id} is not found",
        }
        return Response(content, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = GenreSerializer(genre, many=False)
        content = {
            "status": "success",
            "data": {"getSingleGenre": serializer.data},
        }
        return Response(content, status=status.HTTP_200_OK)

    if request.method == "PUT":
        try:
            genre_name = request.data["genre_name"]
            genre.genre_name = genre_name
            genre.save()
            serializer = GenreSerializer(genre, many=False)
            content = {
                "status": "success",
                "data": {"updateGenre": serializer.data},
            }
            return Response(content, status=status.HTTP_200_OK)
        except KeyError:
            content = {
                "status": "fail",
                "message": "genre_name must be required",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            content = {
                "status": "fail",
                "message": f"genre_name: {genre_name} is already exist",
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            content = {
                "status": "error",
                "message": "Internal server error",
            }
            return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if request.method == "DELETE":
        genre.delete()
        content = {
            "status": "success",
        }
        return Response(content, status=status.HTTP_200_OK)
