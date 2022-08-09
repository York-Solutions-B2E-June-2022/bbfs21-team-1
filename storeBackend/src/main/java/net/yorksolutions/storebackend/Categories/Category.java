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
    String category;

    public Category() {}

    public Category(Long id, String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}
