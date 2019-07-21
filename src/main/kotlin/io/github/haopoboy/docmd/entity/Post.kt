package io.github.haopoboy.docmd.entity

import javax.persistence.Entity

@Entity
class Post(var documentId: String?, var content: String?) : UuidEntity() {

    override fun toString(): String {
        return "Document(content='$content') ${super.toString()}"
    }
}

