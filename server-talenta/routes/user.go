package routes

import (
	"server/handlers"
	"server/packages/middleware"
	"server/packages/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)
	r.HandleFunc("/register", h.Register).Methods("POST")
	r.HandleFunc("/login", h.Login).Methods("POST")
	r.HandleFunc("/checkAuth", middleware.Auth(h.CheckAuth)).Methods("GET")

}
