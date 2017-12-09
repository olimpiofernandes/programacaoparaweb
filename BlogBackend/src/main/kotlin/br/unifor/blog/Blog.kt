package br.unifor.blog

import br.unifor.blog.controller.AuthController
import br.unifor.blog.controller.ControllerComment
import br.unifor.blog.controller.ControllerPosts
import br.unifor.blog.controller.ControllerUser
import br.unifor.blog.database.DaoFactory
import br.unifor.blog.entity.*
import com.j256.ormlite.jdbc.JdbcConnectionSource
import org.slf4j.LoggerFactory
import spark.Spark.*

fun main(args: Array<String>) {

    val DATABASE_URL = "jdbc:h2:./blog.db"
    DaoFactory.connSource = JdbcConnectionSource(DATABASE_URL)

    DaoFactory.createTable<Token>()
    DaoFactory.createTable<User>()
    DaoFactory.createTable<Comment>()
    DaoFactory.createTable<Posts>()

    val logger = LoggerFactory.getLogger("App")

    path("/api", {

        before("/*", { req, res ->
            logger.info("A requesdt from ${req.host()} was received.")

//            if(!req.uri().contains(("login"))){
//
//                val key = req.headers("keyUser") ?: ""
//
//                val tokenDao = DaoFactory.getDaoInstance<Token, Long>()
//                val tokenstatementBuilder = AuthController.tokenDAO.queryBuilder()
//                tokenstatementBuilder.where().eq("key", key)
//                val token = tokenDao.query(tokenstatementBuilder.prepare()).firstOrNull()
//
//                if(token == null){
//                    halt(404, """{"status":"ERROR", "description":"You are not welcome here!"}""")
//                } else {
//                    logger.info("A requesdt from ${req.host()} to ${req.uri()} is authenticated.")
//                }
//
//            }

        })

        path("/posts", {
            get("/", ControllerPosts.getAll)
            get("/:id", ControllerPosts.get)
            get("/edit/:id", ControllerPosts.get)
            get("/postsUser/:id", ControllerPosts.getForUserId)
            post("/", ControllerPosts.insert)
            put("/:id", ControllerPosts.update)
            delete("/:id", ControllerPosts.delete)
        })

        path("/comment", {
            get("/", ControllerComment.getAll)
            get("/:id", ControllerComment.get)
            get("/commentsPost/:id", ControllerComment.getForPostId)
            post("/", ControllerComment.insert)
            put("/:id", ControllerComment.update)
            delete("/:id", ControllerComment.delete)
        })

        path("/user", {
            get("/", ControllerUser.getAll)
            get("/:id", ControllerUser.get)
            post("/", ControllerUser.insert)
            put("/:id", ControllerUser.update)
            delete("/:id", ControllerUser.delete)
        })

        path("/login", {
            post("/", AuthController.login)
        })

    })

}