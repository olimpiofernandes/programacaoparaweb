package br.unifor.blog.controller;

import br.unifor.blog.database.DaoFactory
import br.unifor.blog.entity.User
import com.google.gson.GsonBuilder
import org.slf4j.LoggerFactory
import spark.Request
import spark.Response
import java.security.MessageDigest

class ControllerUser {

    companion object : IController<User> {

        override val logger = LoggerFactory.getLogger(ControllerUser::class.java)
        override val gson = GsonBuilder().excludeFieldsWithoutExposeAnnotation().create()
        val userDAO = DaoFactory.getDaoInstance<User, Long>()

        override val insert = { req: Request, resp: Response ->

            val json = req.body()
            val user = gson.fromJson(json, User::class.java)

            user.salt = "${System.currentTimeMillis()}"

            val digest = MessageDigest.getInstance("SHA-256")
            val hashedPassword = digest.digest("${user.email}:${user.password}:${user.salt}".toByteArray())
            user.password = String(hashedPassword)

            val ret = userDAO.create(user)

            if (ret == 1) {
                logger.info("User created successfully")
                """{"status":"OK","description":"User created successfully"}"""
            } else {
                logger.error("An error occured during the process.")
                """{"status":"ERROR","description":"An error occured during the creation process."}"""
            }

        }

        override val update = { req: Request, resp: Response ->

            val id = req.params("id").toLong()
            val json = req.body()

            val user = gson.fromJson(json, User::class.java)
            user.id = id

            user.salt = "${System.currentTimeMillis()}"

            val digest = MessageDigest.getInstance("SHA-256")
            val hashedPassword = digest.digest("${user.email}:${user.password}:${user.salt}".toByteArray())
            user.password = String(hashedPassword)

            val ret = userDAO.update(user)

            if (ret == 1) {
                logger.info("User created successfully")
                """{"status":"OK","description":"User updated successfully"}"""
            } else {
                logger.error("An error occured during the process.")
                """{"status":"ERROR","description":"An error occured during the update process."}"""
            }

        }

        override val delete = { req: Request, resp: Response ->

            val id = req.params("id").toLong()

            val statementBuilder = userDAO.queryBuilder()
            statementBuilder.where().idEq(id)
            val user = userDAO.query(statementBuilder.prepare())

            val ret = userDAO.delete(user)

            if (ret == 1) {
                logger.info("User created successfully")
                """{"status":"OK","description":"User deleted successfully"}"""
            } else {
                logger.error("An error occured during the process.")
                """{"status":"ERROR","description":"An error occured during the delete process."}"""
            }

        }

        override val get = { req: Request, resp: Response ->

            val id = req.params("id").toLong()

            val statementBuilder = userDAO.queryBuilder()
            statementBuilder.where().idEq(id)
            val user = userDAO.query(statementBuilder.prepare())

            if(user != null){
                logger.info("User with id $id was recoreved")
                gson.toJson(user)
            } else {
                logger.info("No users with id $id on database")
                "{}"
            }

        }

        override val getAll = { req: Request, resp: Response ->

            val users = userDAO.queryForAll()

            if(users.size > 0){
                logger.info("User list was recoreved")
                gson.toJson(users)
            } else {
                logger.info("No users on database")
                ""
            }

        }

        override val getForPostId: (req: Request, resp: Response) -> String
            get() = TODO("not implemented") //To change initializer of created properties use File | Settings | File Templates.
        override val getForUserId: (req: Request, resp: Response) -> String
            get() = TODO("not implemented") //To change initializer of created properties use File | Settings | File Templates.


    }
}