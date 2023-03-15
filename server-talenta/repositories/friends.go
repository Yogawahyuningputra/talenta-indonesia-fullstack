package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type FriendsRepository interface {
	CreateFriends(friend models.Friends) (models.Friends, error)
	GetFriendsByGenderAndAge(user models.User, gender string, ageRange string) ([]models.Friends, error)
	GetFriendsByUser(ID int) ([]models.Friends, error)
	FindAllFriends() ([]models.Friends, error)
}

func RepositoryFriends(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateFriends(friend models.Friends) (models.Friends, error) {
	err := r.db.Create(&friend).Error
	return friend, err
}

func (r *repository) GetFriendsByGenderAndAge(user models.User, gender string, ageRange string) ([]models.Friends, error) {
	friends := []models.Friends{}

	query := r.db.Find(&user).
		Joins("JOIN friends ON friends.user_id = users.id").
		Preload("User").
		Where("friends.gender = ?", gender)

	if ageRange == "below_19" {
		query = query.Where("friends.age <= 19")
	} else if ageRange == "above_20" {
		query = query.Where("friends.age >= 20")
	}

	if err := query.Find(&friends).Error; err != nil {
		return nil, err
	}

	return friends, nil
}

func (r *repository) GetFriendsByUser(ID int) ([]models.Friends, error) {
	var friend []models.Friends
	err := r.db.Preload("User").Where("user_id = ?", ID).Find(&friend).Error
	return friend, err
}

func (r *repository) FindAllFriends() ([]models.Friends, error) {
	var friends []models.Friends
	err := r.db.Preload("User").Find(&friends).Error
	return friends, err
}
