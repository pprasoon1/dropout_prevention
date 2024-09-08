from rest_framework import viewsets
from .models import User, Student, Teacher, Parent, StudentData
from .serializers import UserSerializer, StudentSerializer, TeacherSerializer, ParentSerializer, StudentDataSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .gemini_client import analyze_student_data
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

class StudentDataViewSet(viewsets.ModelViewSet):
    queryset = StudentData.objects.all()
    serializer_class = StudentDataSerializer


@api_view(['POST'])
def process_student_data(request):
    student_data = request.data
    analysis_result = analyze_student_data(student_data)
    return Response({'analysis': analysis_result})