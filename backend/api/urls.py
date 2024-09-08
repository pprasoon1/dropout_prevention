from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, StudentViewSet, TeacherViewSet, ParentViewSet, StudentDataViewSet, process_student_data

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'parents', ParentViewSet)
router.register(r'student-data', StudentDataViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('process-student-data/', process_student_data, name='process_student_data'),
    
]