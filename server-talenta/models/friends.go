package models

type Friends struct {
	ID     int          `json:"id"`
	Name   string       `json:"name" gorm:"type:varchar(255)"`
	Age    int          `json:"age" gorm:"type:varchar(10)"`
	Gender string       `json:"gender" gorm:"type:varchar(25)"`
	User   UserResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	UserID int          `json:"user_id"`
}
