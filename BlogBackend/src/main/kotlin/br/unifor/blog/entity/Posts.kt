package br.unifor.blog.entity;

import com.google.gson.annotations.Expose
import com.j256.ormlite.field.DatabaseField
import com.j256.ormlite.table.DatabaseTable
import java.util.*

@DatabaseTable(tableName = "posts")
class Posts:Entity {

    @Expose
    @DatabaseField(generatedId = true)
    override var id:Long = 0

    @Expose
    @DatabaseField(columnName = "title", canBeNull = false)
    var title:String = ""

    @Expose
    @DatabaseField(columnName = "text", canBeNull = false)
    var text:String = ""

    @Expose
    @DatabaseField(columnName = "postsDate", canBeNull = false)
    var postsDate:Date? = null

    @Expose
    @DatabaseField(columnName = "user_name", canBeNull = false)
    var user_name:String = ""

    @Expose
    @DatabaseField(columnName = "user_id", canBeNull = false)
    var user_id:Int = 0
}