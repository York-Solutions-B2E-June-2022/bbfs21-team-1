package net.yorksolutions.storebackend.Coupons;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    public Long id;
    @JsonProperty
    public String label;
    @JsonProperty
    public String couponCode;
    @JsonProperty
    public Float discount;
    @JsonProperty
    public int useLimit;
    @JsonProperty
    public LocalDateTime goodUntil;

    public Coupon(){}
    public Coupon(String label, String code, Float discount, int limit, LocalDateTime goodUntil){
        this.label = label;
        this.couponCode = code;
        this.discount = discount;
        this.useLimit = limit;
        this.goodUntil = goodUntil;
    }
}
