package br.unifor.blog.controller;

import br.unifor.blog.database.DaoFactory
import br.unifor.blog.entity.Comment
import br.unifor.blog.entity.Posts
import com.google.gson.GsonBuilder
import org.slf4j.LoggerFactory
import spark.Request
import spark.Response
import java.util.*


class ControllerPosts {

    companion object : IController<Comment> {

        override val logger = LoggerFactory.getLogger(ControllerPosts::class.java)
        override val gson = GsonBuilder().excludeFieldsWithoutExposeAnnotation().create()
        val postDAO = DaoFactory.getDaoInstance<Posts, Long>()

        override val insert = { req: Request, resp: Response ->

            val json = req.body()
            val posts = ControllerPosts.gson.fromJson(json, Posts::class.java)
            posts.postsDate = Date()
            val resul = postDAO.create(posts)

            if (resul == 1) {
                ControllerUser.logger.info("Posts created!")
                """{"status":"OK","description":"The posts was created successfully"}"""
            } else {
                ControllerUser.logger.error("An error occured during the process.")
                """{"status":"ERROR","description":"An error occured during the creation process."}"""
            }

        }
        override val update = { req: Request, resp: Response ->

            val id = req.params("id").toLong()
            val json = req.body()

            val posts = gson.fromJson(json, Posts::class.java)
            posts.id = id
            posts.postsDate = Date()

            val resul = postDAO.update(posts)

            if (resul == 1) {
                ControllerUser.logger.info("Posts updated!")
                """{"status":"OK","description":"The posts was updated!"}"""
            } else {
                ControllerUser.logger.error("An error occured during the process.")
                """{"status":"ERROR","description":"An error occured during the update process."}"""
            }

        }
        override val delete = { req: Request, resp: Response ->

            val id = req.params("id").toLong()

            val statementBuilder = postDAO.queryBuilder()
            statementBuilder.where().idEq(id)
            val posts = postDAO.query(statementBuilder.prepare())

            val resul = postDAO.delete(posts)

            if (resul == 1) {
                ControllerUser.logger.info("Posts deleted!")
                """{"status":"OK","description":"posts was delete successfully"}"""
            } else {
                ControllerUser.logger.error("An error occured during the process.")
                """{"status":"ERROR","description":"An error occured during the delete process."}"""
            }

        }
        override val get = { req: Request, resp: Response ->

            val id = req.params("id").toLong()

            val statementBuilder = postDAO.queryBuilder()
            statementBuilder.where().idEq(id)
            val user = postDAO.query(statementBuilder.prepare())

            if(user != null){
                logger.info("Posts with id $id was recoreved with your comments")
                gson.toJson(user)
            } else {
                logger.info("No posts with id $id on database")
                "{}"
            }

        }

        override val getAll = { req: Request, resp: Response ->

            val posts = postDAO.queryForAll()

            if(posts.size > 0){
                logger.info("Posts list was recoreved")
                gson.toJson(posts)
            } else {
                logger.info("No posts on database")
                ""
            }

        }

        override val getForUserId = {req: Request, resp: Response ->

            val idUser = req.params("id").toLong()

            val statementBuilderPosts = postDAO.queryBuilder()
            statementBuilderPosts.where().eq("user_id", idUser)
            val postsThisUser = postDAO.query(statementBuilderPosts.prepare())

            if(postsThisUser != null){
                logger.info("Posts with user_id $idUser was recoreved")
                gson.toJson(postsThisUser)
            } else {
                logger.info("No posts with user_id $idUser on database")
                "{}"
            }


        }

        override val getForPostId: (req: Request, resp: Response) -> String
            get() = TODO("not implemented") //To change initializer of created properties use File | Settings | File Templates.

    }
}