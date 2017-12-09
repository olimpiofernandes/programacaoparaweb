package br.unifor.blog.controller;

import com.google.gson.Gson
import org.slf4j.Logger
import spark.Request
import spark.Response

interface IController<T> {

    val logger: Logger
    val gson:Gson

    val insert:(req: Request, resp: Response) -> String
    val update:(req: Request, resp: Response) -> String
    val delete:(req: Request, resp: Response) -> String
    val get:(req: Request, resp: Response) -> String
    val getAll:(req: Request, resp: Response) -> String
    val getForPostId:(req: Request, resp: Response) -> String
    val getForUserId:(req: Request, resp: Response) -> String


}