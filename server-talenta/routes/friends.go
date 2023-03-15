package routes

import (
	"server/handlers"
	"server/packages/middleware"
	"server/packages/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func FriendsRoutes(r *mux.Router) {
	friendsRepository := repositories.RepositoryFriends(mysql.DB)
	h := handlers.HandlerFriends(friendsRepository)

	r.HandleFunc("/friend", middleware.Auth(h.CreateFriends)).Methods("POST")
	r.HandleFunc("/friend/{gender}/{ageRange}", middleware.Auth(h.GetFriendsByGenderAndAge)).Methods("GET")
	r.HandleFunc("/friendByUser", middleware.Auth(h.GetFriendsByUser)).Methods("GET")
	r.HandleFunc("/friends", middleware.Auth(h.FindAllFriends)).Methods("GET")

}
