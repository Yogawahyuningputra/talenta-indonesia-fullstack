package handlers

import (
	"encoding/json"
	"net/http"
	friendsdto "server/dto/friends"
	dto "server/dto/result"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerFriends struct {
	FriendsRepository repositories.FriendsRepository
}

func HandlerFriends(FriendsRepository repositories.FriendsRepository) *handlerFriends {
	return &handlerFriends{FriendsRepository}
}

func (h *handlerFriends) CreateFriends(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userID := int(userInfo["id"].(float64))

	age, _ := strconv.Atoi(r.FormValue("age"))
	request := friendsdto.FriendsRequest{
		Name:   r.FormValue("name"),
		Age:    age,
		Gender: r.FormValue("gender"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	friend := models.Friends{
		Name:   request.Name,
		Age:    request.Age,
		Gender: request.Gender,
		UserID: userID,
	}

	data, err := h.FriendsRepository.CreateFriends(friend)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func convertResponse(u models.Friends) friendsdto.FriendsResponse {
	return friendsdto.FriendsResponse{
		ID:     u.ID,
		Name:   u.Name,
		Age:    u.Age,
		Gender: u.Gender,
	}
}

func (h *handlerFriends) GetFriendsByGenderAndAge(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userID := int(userInfo["id"].(float64))
	user := models.User{ID: userID}

	gender := mux.Vars(r)["gender"]
	ageRange := mux.Vars(r)["ageRange"]

	friends, err := h.FriendsRepository.GetFriendsByGenderAndAge(user, gender, ageRange)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: friends}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerFriends) GetFriendsByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userID := int(userInfo["id"].(float64))

	friend, err := h.FriendsRepository.GetFriendsByUser(userID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: friend}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerFriends) FindAllFriends(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	friends, err := h.FriendsRepository.FindAllFriends()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: friends}
	json.NewEncoder(w).Encode(response)

}
