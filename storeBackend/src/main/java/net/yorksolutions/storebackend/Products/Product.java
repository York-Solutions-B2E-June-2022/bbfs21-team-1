package net.yorksolutions.storebackend.Products;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.storebackend.Categories.Category;
import netscape.javascript.JSObject;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;
    @JsonProperty
    public String imgUrl;
    @JsonProperty
    public String name;
    @JsonProperty
    public String description;
    @JsonProperty
    @ManyToOne
    public Category category;
    @JsonProperty
    public LocalDate available;
    @JsonProperty
    public Boolean discontinued;
    @JsonProperty
    public Float mapPrice;
    @JsonProperty
    public LocalDate mapDate;
    @JsonProperty
    public Float retailPrice;
    @JsonProperty
    public LocalDate retailDate;
    @JsonProperty
    public Float salePrice;
    @JsonProperty
    public LocalDate saleDate;

    public Product(){}
    public Product(
            String name,
            String description,
            Category category,
            LocalDate available,
            Float MAP,
            Float retail,
            Float sale,
            LocalDate saleDate
    ){
        this.imgUrl = "https://api.lorem.space/image/fashion?w=500&h=500";
        this.name = name;
        this.description = description;
        this.category = category;
        this.available = available;
        this.discontinued = false;
        this.mapPrice = MAP;
        this.mapDate = java.time.LocalDate.now();
        this.retailPrice = retail;
        this.retailDate = java.time.LocalDate.now();
        this.salePrice = sale;
        this.saleDate = saleDate;
    }
}

