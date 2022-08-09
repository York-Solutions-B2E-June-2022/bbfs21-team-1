package net.yorksolutions.storebackend.Products;

import java.time.LocalDateTime;
import java.util.Date;

public class ProductRequest {
    public Long id;
    public String name;
    public String description;
    public LocalDateTime available;
    public Float mapPrice;
    public Float retailPrice;
    public Float salePrice;
    public LocalDateTime saleDate;
}
