package br.unifor.blog.entity;

import com.google.gson.annotations.Expose
import com.j256.ormlite.field.DatabaseField
import com.j256.ormlite.table.DatabaseTable
import java.util.*

@DatabaseTable(tableName = "comments")
class Comment:Entity {

    @Expose
    @DatabaseField(generatedId = true)
    override var id:Long = 0

    @Expose
    @DatabaseField(columnName = "userNameComment", canBeNull = false)
    var userNameComment:String = ""

    @Expose
    @DatabaseField(columnName = "dateComment", canBeNull = false)
    var dateComment:Date? = null

    @Expose
    @DatabaseField(columnName = "textComment", canBeNull = false)
    var textComment:String = ""

    @Expose
    @DatabaseField(columnName = "posts_id", canBeNull = false)
    var posts_id:Int = 0
}