package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Config
var mongoUri string = "mongodb://localhost:27017"
var mongoDbName string = "pizza_app_db"
var mongoCollectionPizza string = "pizzas"

// Database variables
var mongoclient *mongo.Client
var pizzaCollection *mongo.Collection

// Pizza model
type Pizza struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name     string             `json:"pizza_name" bson:"pizza_name"`
	Size     int                `json:"size" bson:"size"`
	Price    float64            `json:"price" bson:"price"`
	Category string             `json:"category" bson:"category"`
}

// Connect to MongoDB
func connectDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	mongoclient, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	if err != nil {
		log.Fatal("MongoDB Connection Error:", err)
	}

	pizzaCollection = mongoclient.Database(mongoDbName).Collection(mongoCollectionPizza)
	fmt.Println("Connected to MongoDB!")
}

// Create a new pizza
func createPizza(c *gin.Context) {
	var jbodyPizza Pizza
	if err := c.BindJSON(&jbodyPizza); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := pizzaCollection.InsertOne(ctx, jbodyPizza)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create pizza"})
		return
	}

	pizzaId, _ := result.InsertedID.(primitive.ObjectID)
	jbodyPizza.ID = pizzaId

	c.JSON(http.StatusCreated, gin.H{"message": "Pizza created successfully", "pizza": jbodyPizza})
}

// Read all pizzas
func readAllPizzas(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := pizzaCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pizzas"})
		return
	}
	defer cursor.Close(ctx)

	var pizzas []Pizza
	if err := cursor.All(ctx, &pizzas); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse pizzas"})
		return
	}

	c.JSON(http.StatusOK, pizzas)
}

// Read pizza by ID
func readPizzaById(c *gin.Context) {
	id := c.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var pizza Pizza
	err = pizzaCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&pizza)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}

	c.JSON(http.StatusOK, pizza)
}

// Update pizza
func updatePizza(c *gin.Context) {
	id := c.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	var jbodyPizza Pizza
	if err := c.BindJSON(&jbodyPizza); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := pizzaCollection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": jbodyPizza})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update pizza"})
		return
	}

	if result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pizza updated successfully"})
}

// Delete pizza
func deletePizza(c *gin.Context) {
	id := c.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := pizzaCollection.DeleteOne(ctx, bson.M{"_id": objectID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete pizza"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pizza not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pizza deleted successfully"})
}

func main() {
	connectDB()
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/pizzas", createPizza)
	r.GET("/pizzas", readAllPizzas)
	r.GET("/pizzas/:id", readPizzaById)
	r.PUT("/pizzas/:id", updatePizza)
	r.DELETE("/pizzas/:id", deletePizza)

	r.Run(":8080")
}
