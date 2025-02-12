package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

)

type Pizza struct {
	Id       string  `json:"id,omitempty"`
	Name     string  `json:"pizza_name"`
	Size     int     `json:"size"`
	Price    float64 `json:"price"`
	Category string  `json:"category"`
}


func createPizza(c *gin.Context){
	var jbodyPizza Pizza

	if err := c.BindJSON(&jbodyPizza); err != nil {
		c.JSON(http.StatusInternalServerError,
		     gin.H{"error": "Server Error. " + err.Error()})
		return
	}

	createdPizza :=   Pizza{Id: "001",Name: "Papperoni Pizza",Size: 16, Price: 500.0,Category: "Fast Delivery"}
	c.JSON(http.StatusCreated,
		gin.H{"message": "Pizza Created Succesfully" ,
			"pizza" : createdPizza})
}

func readAllPizzas(c *gin.Context){

	pizzas := []Pizza{{Id: "001",Name: "Papperoni Pizza",Size: 16, Price: 500.0,Category: "Fast Delivery"},
		{Id: "002",Name: "Sizzling Pizza",Size: 18, Price: 55.0,Category: "Super fast Delivery"}}

	c.JSON(http.StatusOK, pizzas)
}

func readPizzaById(c *gin.Context){
	id := c.Param("id")
	pizza := Pizza{Id: id,Name: "Papperoni Pizza",Size: 16, Price: 500.0,Category: "Fast Delivery"} 
	c.JSON(http.StatusOK, pizza)

}


func updatePizza(c *gin.Context){
	id:= c.Param("id")
	var jbodyPizza Pizza 
	err := c.BindJSON(&jbodyPizza)
	if err != nil{
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "Server Error. " + err.Error()})
	   return
	}
	updatedPizza := Pizza{Id: id,Name: "Papperoni Pizza",Size: 16, Price: 500.0,Category: "Fast Delivery"}

	c.JSON(http.StatusOK, gin.H{"message": "Pizza Updated Successfully",
		"pizza": updatedPizza})
}


func deletePizza(c *gin.Context){
	id:= c.Param("id")
	fmt.Println(id)
	c.JSON(http.StatusOK,gin.H{"message": "Flight Deleted successfully. "})
}

func main(){
	r:= gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET","POST","DELETE","OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Lenght"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/pizzas",createPizza)
	r.GET("/pizzas" , readAllPizzas)
	r.GET("/pizzas/:id",  readPizzaById)
	r.PUT("/pizzas/:id",  updatePizza)
	r.DELETE("/pizzas/:id",  deletePizza)

	r.Run()
}


