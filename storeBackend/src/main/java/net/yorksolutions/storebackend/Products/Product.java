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
    public Date available;
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
    public Date saleDate;

    public Product() {
        this.imgUrl = "https://api.lorem.space/image/fashion?w=500&h=500";
        this.discontinued = false;
        this.mapDate = java.time.LocalDateTime.now();
        this.retailDate = java.time.LocalDateTime.now();
    }
}

