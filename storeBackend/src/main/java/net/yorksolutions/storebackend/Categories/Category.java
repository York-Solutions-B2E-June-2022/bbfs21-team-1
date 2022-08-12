package net.yorksolutions.storebackend.Categories;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long Id;
    String name;

    public Category() {}

    public Category(String name) {
        this.name = name;
    }


    public String getName() {
        return name;
    }
    public Long getId() { return Id; }
}
