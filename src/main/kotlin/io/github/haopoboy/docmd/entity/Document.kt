package io.github.haopoboy.docmd.entity

import javax.persistence.Entity

@Entity
class Document(var content: String = "Default") : UuidEntity() {

    override fun toString(): String {
        return "Document(content='$content') ${super.toString()}"
    }
}

