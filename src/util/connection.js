var mongodb=require("mongodb")
module.exports = {
	getConn: function() {
		return new Promise(function(resolve, reject) {
			mongodb.connect("mongodb://127.0.0.1:27017", function(err, conn) {
				if (err) {
					reject(err)
				} else {
					resolve(conn)
				}
			})
		})
	}
}
