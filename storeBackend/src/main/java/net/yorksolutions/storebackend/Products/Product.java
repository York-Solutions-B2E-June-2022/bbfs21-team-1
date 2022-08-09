package net.yorksolutions.storebackend.Products;

import com.fasterxml.jackson.annotation.JsonProperty;
import netscape.javascript.JSObject;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
    public LocalDateTime available;
    @JsonProperty
    public Boolean discontinued;
    @JsonProperty
    public Float mapPrice;
    @JsonProperty
    public LocalDateTime mapDate;
    @JsonProperty
    public Float retailPrice;
    @JsonProperty
    public LocalDateTime retailDate;
    @JsonProperty
    public Float salePrice;
    @JsonProperty
    public LocalDateTime saleDate;

    public Product(){}
    public Product(String name, String description, LocalDateTime available, Float MAP, Float retail, Float sale, LocalDateTime saleDate) {
        this.imgUrl = "https://api.lorem.space/image/fashion?w=500&h=500";
        this.name = name;
        this.description = description;
        this.available = available;
        this.discontinued = false;
        this.mapPrice = MAP;
        this.mapDate = java.time.LocalDateTime.now();
        this.retailPrice = retail;
        this.retailDate = java.time.LocalDateTime.now();
        this.salePrice = sale;
        this.saleDate = saleDate;
    }
}

