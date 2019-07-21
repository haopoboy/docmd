package io.github.haopoboy.docmd.entity

import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.util.*
import javax.persistence.*

@MappedSuperclass
open class UuidEntity(@Id @GeneratedValue(generator = "uuid2") var uuid: UUID? = null) {

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    var creationTimestamp: Date? = null

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    var updateTimestamp: Date? = null

    override fun toString(): String {
        return uuid.toString()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as UuidEntity

        if (uuid != other.uuid) return false

        return true
    }

    override fun hashCode(): Int {
        return uuid?.hashCode() ?: 0
    }
}