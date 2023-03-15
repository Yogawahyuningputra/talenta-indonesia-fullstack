package friendsdto

import "server/models"

type FriendsRequest struct {
	Name   string `json:"name" validate:"required"`
	Age    int    `json:"age" validate:"required"`
	Gender string `json:"gender" validate:"required"`
}

type FriendsResponse struct {
	ID     int
	Name   string      `json:"name"`
	Age    int         `json:"age"`
	Gender string      `json:"gender"`
	User   models.User `json:"user"`
}
