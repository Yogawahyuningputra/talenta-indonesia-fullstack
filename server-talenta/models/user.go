package models

type User struct {
	ID       int       `json:"id"`
	Fullname string    `json:"fullname"`
	Email    string    `json:"email" gorm:"type:varchar(255);unique;not null"`
	Password string    `json:"password" gorm:"type:varchar(255)"`
	Friends  []Friends `json:"friends"`
}

type UserResponse struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (UserResponse) TableName() string {
	return "users"
}
