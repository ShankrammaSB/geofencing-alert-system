package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var Clients = make(map[*websocket.Conn]bool)

var Upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func AlertWebSocket(c *gin.Context) {

	conn, err := Upgrader.Upgrade(
		c.Writer,
		c.Request,
		nil,
	)

	if err != nil {
		return
	}

	Clients[conn] = true

	for {
		_, _, err := conn.ReadMessage()

		if err != nil {
			delete(Clients, conn)
			conn.Close()
			break
		}
	}
}
