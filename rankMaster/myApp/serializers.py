from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers
from .models import UserProfile, User

from django.db import IntegrityError


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']

    # def create(self, validated_data):
    #     try:
    #         user = self.perform_create(validated_data)
    #         UserProfile.objects.create(user_id=user.id)
    #     except IntegrityError:
    #         self.fail("cannot_create_user")

    #     return user



class UserProfileSerializer(serializers.ModelSerializer):

    id_lists = serializers.ListField(child=serializers.IntegerField(), required=False)
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user_id', 'id_lists', 'birth_date']

    def update(self, instance, validated_data):
        if 'id_lists' in validated_data:
            id_lists = validated_data.pop('id_lists')
            if id_lists is not None:
                instance.id_lists = ' '.join(str(id) for id in id_lists)
            else:
                instance.id_lists = ''
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        instance.id_lists = self.get_id_lists(instance)
        return super().to_representation(instance)

    def get_id_lists(self, obj):
        if obj.id_lists and obj.id_lists is not None:
            return [int(id) for id in obj.id_lists.split() if id.isdigit()]
        else:
            return []
