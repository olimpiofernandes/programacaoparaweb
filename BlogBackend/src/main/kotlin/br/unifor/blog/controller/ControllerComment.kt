package br.unifor.blog.controller;

import br.unifor.blog.database.DaoFactory
import br.unifor.blog.entity.Comment
import com.google.gson.GsonBuilder
import org.slf4j.LoggerFactory
import spark.Request
import spark.Response
import java.util.*

class ControllerComment {

    companion object: IController<Comment> {

        override val logger = LoggerFactory.getLogger(ControllerComment::class.java)
        override val gson = GsonBuilder().excludeFieldsWithoutExposeAnnotation().create()
        val commentDao = DaoFactory.getDaoInstance<Comment, Long>()

        override val insert = { req: Request, resp: Response ->

            val json = req.body()
            val comment = gson.fromJson(json, Comment::class.java)

            comment.dateComment = Date()
            val resul = commentDao.create(comment)

            if (resul == 1) {
                logger.info("Comment send sucessfully!")
                """{"status":"OK","description":"Comment send sucessfully!"}"""
            } else {
                logger.error("An error occured during the process.")
                """{"status":"ERROR","description":"An error occured during the creation process."}"""
            }

        }
        override val update = { req: Request, resp: Response ->

            val id = req.params("id").toLong()
            val json = req.body()

            val comment = gson.fromJson(json, Comment::class.java)
            comment.id = id
            comment.dateComment = Date()
            val resul = commentDao.update(comment)

            if (resul == 1) {
                logger.info("Comment update sucessfully!")
                """{"status":"OK","description":"Comment update sucessfully!"}"""
            } else {
                logger.error("An error occured during the process.")
                """{"status":"ERROR","description":"An error occured during the update process."}"""
            }
        }

        override val delete = { req: Request, resp: Response ->

            val id = req.params("id").toLong()

            val statementBuilder = commentDao.queryBuilder()
            statementBuilder.where().idEq(id)
            val comment = commentDao.query(statementBuilder.prepare())

            val resul = commentDao.delete(comment)

            if (resul == 1) {
                logger.info("Comment deleted!")
                """{"status":"OK","description":"Comment deleted with sucessfully!"}"""
            } else {
                logger.error("An error occured during the process.")
                """{"status":"ERROR","description":"An error occured during the delete process."}"""
            }
        }

        override val get = { req: Request, resp: Response ->

            val id = req.params("id").toLong()

            val statementBuilder = commentDao.queryBuilder()
            statementBuilder.where().idEq(id)
            val comment = commentDao.query(statementBuilder.prepare())

            if(comment != null){
                logger.info("Comment with id $id was recoreved")
                gson.toJson(comment)
            } else {
                logger.info("No comments with id $id on database")
                "{}"
            }

        }

        override val getAll = { req: Request, resp: Response ->

            val comments = commentDao.queryForAll()

            if(comments.size > 0){
                logger.info("Comment list was recoreved")
                gson.toJson(comments)
            } else {
                logger.info("No Comments on database")
                "{}"
            }

        }

        override val getForPostId = {req: Request, resp: Response ->

            val idPost = req.params("id").toLong()

            val statementBuilderPosts = commentDao.queryBuilder()
            statementBuilderPosts.where().eq("posts_id", idPost)
            val commentsThisPost = commentDao.query(statementBuilderPosts.prepare())

            if(commentsThisPost != null){
                logger.info("Comments with posts_id $idPost was recoreved")
                gson.toJson(commentsThisPost)
            } else {
                logger.info("No comments with posts_id $idPost on database")
                "{}"
            }


        }

        override val getForUserId: (req: Request, resp: Response) -> String
            get() = TODO("not implemented") //To change initializer of created properties use File | Settings | File Templates.

    }
}