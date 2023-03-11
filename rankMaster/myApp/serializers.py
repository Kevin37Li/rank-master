from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers
from .models import UserProfile, User, Rank

from django.db import IntegrityError

import json


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






class RankSerializer(serializers.ModelSerializer):

    ranking_list = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = Rank
        fields = ['user_id', 'title', 'id_list', 'ranking_list']

    def update(self, instance, validated_data):
        if 'ranking_list' in validated_data:
            ranking_list = validated_data.pop('ranking_list', None)
            if ranking_list is not None:
                instance.ranking_list = json.dumps(ranking_list)
            else:
                instance.ranking_list = '[]'
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        instance.ranking_list = self.get_ranking_list(instance)
        return super().to_representation(instance)

    def get_ranking_list(self, obj):
        if obj.ranking_list is not None:
            return json.loads(obj.ranking_list)
        else:
            return []

class UserProfileSerializer(serializers.ModelSerializer):

    id_lists = serializers.ListField(child=serializers.CharField(), required=False)
    # user_id = serializers.IntegerField(read_only=True)
    user = UserSerializer()
    # rank_set=RankSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'id_lists', 'birth_date']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
        if 'id_lists' in validated_data:
            id_lists = validated_data.pop('id_lists', None)
            if id_lists is not None:
                instance.id_lists = json.dumps(id_lists)
            else:
                instance.id_lists = '[]'
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        instance.id_lists = self.get_id_lists(instance)
        return super().to_representation(instance)

    def get_id_lists(self, obj):
        if obj.id_lists is not None:
            return json.loads(obj.id_lists)
        else:
            return []